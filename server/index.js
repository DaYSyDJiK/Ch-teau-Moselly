import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";


// ✅ Brevo API (HTTPS)


import Brevo from "@getbrevo/brevo";

dotenv.config();

const app = express();

/* ================================
   ⚠️ OBLIGATOIRE SUR RENDER
================================ */
app.set("trust proxy", 1);

/* ================================
   Middlewares globaux
================================ */

// Parser JSON
app.use(express.json());

// CORS
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // autorise les appels sans origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
  })
);

// Rate limit (APRÈS trust proxy)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

/* ================================
   Route test
================================ */
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend Moselly OK" });
});

/* ================================
   Route formulaire
================================ */
app.post("/api/visite", async (req, res) => {
  try {
    const {
      prenom,
      nom,
      email,
      telephone,
      type_evenement,
      date_souhaitee,
      nb_invites,
      creneau,
      message,
      website,
    } = req.body;

    // Honeypot anti-bot
    if (website) {
      return res.status(200).json({ ok: true });
    }

    // Validation minimale
    if (!prenom || !nom || !email || !type_evenement || !message) {
      return res
        .status(400)
        .json({ ok: false, error: "Champs requis manquants" });
    }

    const subject = `Demande de visite - ${prenom} ${nom} (${type_evenement})`;

    const text = `
Nouvelle demande de visite - Château Moselly

Prénom: ${prenom}
Nom: ${nom}
Email: ${email}
Téléphone: ${telephone || "-"}
Type d'événement: ${type_evenement}
Date souhaitée: ${date_souhaitee || "-"}
Nombre d'invités: ${nb_invites || "-"}
Créneau préféré: ${creneau || "-"}

Message:
${message}
`.trim();

    const safe = (v) =>
      String(v ?? "").replace(/[&<>"']/g, (c) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c]));

    const html = `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f1eb; padding:24px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
        
        <tr>
          <td style="background:#1F3A5F; padding:18px 22px;">
            <div style="font-family:Arial,sans-serif; color:#ffffff; font-size:18px; font-weight:700;">
              Nouvelle demande de visite — Château Moselly
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 22px; font-family:Arial,sans-serif; color:#2B2B2B; font-size:14px; line-height:1.6;">
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:14px;">
              <tr>
                <td style="padding:10px 12px; background:#fafafa; border:1px solid #eee; border-radius:12px;">
                  <div><strong>Nom :</strong> ${safe(prenom)} ${safe(nom)}</div>
                  <div><strong>Email :</strong> <a href="mailto:${safe(email)}" style="color:#1F3A5F;">${safe(email)}</a></div>
                  <div><strong>Téléphone :</strong> ${safe(telephone || "-")}</div>
                </td>
              </tr>
            </table>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:14px;">
              <tr>
                <td style="padding:10px 12px; background:#ffffff; border:1px solid #eee; border-radius:12px;">
                  <div><strong>Type d'événement :</strong> ${safe(type_evenement)}</div>
                  <div><strong>Date souhaitée :</strong> ${safe(date_souhaitee || "-")}</div>
                  <div><strong>Invités :</strong> ${safe(nb_invites || "-")}</div>
                  <div><strong>Créneau :</strong> ${safe(creneau || "-")}</div>
                </td>
              </tr>
            </table>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding:12px; background:#fff; border-left:4px solid #1F3A5F; border-radius:10px; border:1px solid #eee;">
                  <div style="margin:0 0 6px;"><strong>Message :</strong></div>
                  <div style="white-space:pre-wrap;">${safe(message)}</div>
                </td>
              </tr>
            </table>

            <div style="margin-top:16px; color:#6b7280; font-size:12px;">
              Répondez à cet email pour répondre directement au client.
            </div>

          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim();

    

    /* ================================
       ✅ Envoi email via Brevo API (HTTPS)
       -> fonctionne sur Render (pas besoin SMTP)
    ================================ */

    // 1) Créer l'instance API Brevo et injecter la clé
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // ⚠️ MAIL_FROM doit être un email SEUL (pas "Nom <email>")
    // Exemple conseillé sur Render:
    // MAIL_FROM = maxime.gauthier112@gmail.com
    const senderEmail = process.env.MAIL_FROM;

    // 2) Envoyer l'email transactionnel
    await apiInstance.sendTransacEmail({
      subject,
      sender: {
        name: "Château Moselly",
        email: senderEmail,
      },
      to: [{ email: process.env.MAIL_TO }],
      replyTo: { email }, // répondre au client
      textContent: text,
      htmlContent: html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    /* ================================
       🔥 LOGS CRITIQUES
    ================================ */
    console.error("❌ ERREUR /api/visite");
    console.error(err);
    console.error("message:", err?.message);
    console.error("code:", err?.code);
    console.error("response:", err?.response);

    return res.status(500).json({
      ok: false,
      error: err?.message || "Erreur serveur",
    });
  }
});

/* ================================
   Server
================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});