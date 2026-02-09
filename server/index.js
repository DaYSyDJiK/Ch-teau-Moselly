import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// ❌ on n'utilise plus nodemailer
// import nodemailer from "nodemailer";

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

// Sécurité headers
app.use(helmet());

// Parser JSON
app.use(express.json());

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Rate limit (APRÈS trust proxy)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
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
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #2B2B2B;">
        <h2 style="color:#1F3A5F">Nouvelle demande de visite — Château Moselly</h2>

        <p><strong>Nom :</strong> ${safe(prenom)} ${safe(nom)}</p>
        <p><strong>Email :</strong> ${safe(email)}</p>
        <p><strong>Téléphone :</strong> ${safe(telephone || "-")}</p>

        <p><strong>Type d'événement :</strong> ${safe(type_evenement)}</p>
        <p><strong>Date souhaitée :</strong> ${safe(date_souhaitee || "-")}</p>
        <p><strong>Invités :</strong> ${safe(nb_invites || "-")}</p>
        <p><strong>Créneau :</strong> ${safe(creneau || "-")}</p>

        <hr />
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap;">${safe(message)}</p>
      </div>
    `;

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