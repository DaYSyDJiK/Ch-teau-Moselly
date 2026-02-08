import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

// 1) Sécurité basique
app.use(helmet());

// 2) Body parser JSON (pour lire req.body)
app.use(express.json());

// 3) CORS : autoriser ton front
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // ex: http://localhost:5173
  })
);

// 4) Rate limit anti-spam (ex: 10 requêtes / 10 minutes)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
});
app.use("/api/", limiter);

// --- Route de test ---
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend Moselly OK" });
});

// --- Route formulaire ---
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
      website, // honeypot
    } = req.body;

    // Anti-spam : si le champ caché est rempli, on stop
    if (website) {
      return res.status(200).json({ ok: true });
    }

    // Validation minimale
    if (!prenom || !nom || !email || !type_evenement || !message) {
      return res.status(400).json({ ok: false, error: "Champs requis manquants" });
    }

    // 1) Transporter email (SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true si port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 2) Contenu email
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

const safe = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[c]));

// Mise en forme HTML
const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #2B2B2B;">
    <h2 style="margin: 0 0 12px; color: #1F3A5F;">Nouvelle demande de visite — Château Moselly</h2>

    <div style="padding: 12px 14px; border: 1px solid #eee; border-radius: 12px; background: #fafafa; margin-bottom: 14px;">
      <p style="margin: 0;"><strong>Nom :</strong> ${safe(prenom)} ${safe(nom)}</p>
      <p style="margin: 0;"><strong>Email :</strong> ${safe(email)}</p>
      <p style="margin: 0;"><strong>Téléphone :</strong> ${safe(telephone || "-")}</p>
    </div>

    <div style="padding: 12px 14px; border: 1px solid #eee; border-radius: 12px; background: #ffffff; margin-bottom: 14px;">
      <p style="margin: 0 0 6px;"><strong>Type d'événement :</strong> ${safe(type_evenement)}</p>
      <p style="margin: 0 0 6px;"><strong>Date souhaitée :</strong> ${safe(date_souhaitee || "-")}</p>
      <p style="margin: 0 0 6px;"><strong>Nombre d'invités :</strong> ${safe(nb_invites || "-")}</p>
      <p style="margin: 0;"><strong>Créneau préféré :</strong> ${safe(creneau || "-")}</p>
    </div>

    <div style="padding: 12px 14px; border-left: 4px solid #1F3A5F; background: #fff; border-radius: 10px;">
      <p style="margin: 0 0 6px;"><strong>Message :</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${safe(message)}</p>
    </div>

    <p style="margin-top: 16px; color: #6b7280; font-size: 12px;">
      Répondez à cet email pour répondre directement au client (Reply-To configuré).
    </p>
  </div>
`.trim();


    // 3) Envoi
    await transporter.sendMail({
      from: process.env.MAIL_FROM, // ex: "Château Moselly <no-reply@...>"
      to: process.env.MAIL_TO,     // ton email perso / pro
      replyTo: email,             // quand tu réponds, ça répond au client
      subject,
      text,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Erreur serveur" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});