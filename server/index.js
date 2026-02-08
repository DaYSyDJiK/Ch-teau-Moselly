import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

/* ================================
   ⚠️ OBLIGATOIRE SUR RENDER
================================ */
app.set("trust proxy", true);

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

        /* ================================
           Transport SMTP (avec timeouts)
        ================================ */
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },

            // ✅ FORCER IPv4 (corrige ENETUNREACH sur Render)
            family: 4,

            connectionTimeout: 10_000,
            greetingTimeout: 10_000,
            socketTimeout: 10_000,
        });

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
        <p>${safe(message)}</p>
      </div>
    `;

        /* ================================
           Envoi email
        ================================ */
        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            replyTo: email,
            subject,
            text,
            html,
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