import { useMemo, useState } from "react";
import { useEffect } from "react";
import useSEO from "../hooks/useSEO";


import { API_BASE_URL } from "../config/api";

export default function Contact() {
  const API_URL = `${API_BASE_URL}/api/visite`;

  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  // Champ “piège” anti-bot (doit rester vide)
  const honeypotName = useMemo(() => "website", []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Construire l'objet JSON envoyé au backend
      const payload = Object.fromEntries(formData.entries());

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Erreur lors de l'envoi.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg("Impossible de contacter le serveur. Vérifie qu'il est bien lancé.");
    }
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }

        });
      },
      { threshold: 0.30 }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);


  useSEO({
    title: "Contact & demande de visite | Château Moselly",
    description:
      "Contactez le Château Moselly à Chaudeney pour organiser votre mariage ou événement privé dans un cadre d'exception.",
  });


  return (
    <>

      <section className="section section--tight pt-4 reveal">
        <div className="container pt-5">
          <h1 className="titre-principal mb-2 titre-principal">Demande de visite</h1>
          <p className="text-secondary mb-0">
            Indiquez votre projet : nous revenons vers vous rapidement avec un créneau.
          </p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="row g-4 align-items-start">
            {/* FORM */}
            <div className="col-12 col-lg-7">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  {status === "success" && (
                    <div className="alert alert-success" role="alert">
                      Merci ! Votre demande a bien été envoyée ✅
                    </div>
                  )}

                  {status === "error" && (
                    <div className="alert alert-danger" role="alert">
                      Oups… {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* Honeypot */}
                    <div className="visually-hidden" aria-hidden="true">
                      <label htmlFor={honeypotName}>Ne pas remplir</label>
                      <input
                        id={honeypotName}
                        name={honeypotName}
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="prenom">Prénom</label>
                        <input className="form-control" id="prenom" name="prenom" required />
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="nom">Nom</label>
                        <input className="form-control" id="nom" name="nom" required />
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="email">Email</label>
                        <input className="form-control" id="email" name="email" type="email" required />
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="telephone">Téléphone</label>
                        <input className="form-control" id="telephone" name="telephone" type="tel" placeholder="Optionnel" />
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="type_evenement">Type d'événement</label>
                        <select className="form-select" id="type_evenement" name="type_evenement" required defaultValue="">
                          <option value="" disabled>Choisir…</option>
                          <option value="Mariage">Mariage</option>
                          <option value="Réception privée">Réception privée</option>
                          <option value="Événement d'entreprise">Événement d'entreprise</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="date_souhaitee">Date souhaitée</label>
                        <input className="form-control" id="date_souhaitee" name="date_souhaitee" type="date" />
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="nb_invites">Nombre d'invités</label>
                        <input className="form-control" id="nb_invites" name="nb_invites" type="number" min="1" placeholder="Ex : 80" />
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="creneau">Créneau préféré</label>
                        <select className="form-select" id="creneau" name="creneau" defaultValue="">
                          <option value="">Peu importe</option>
                          <option value="Semaine (journée)">Semaine (journée)</option>
                          <option value="Semaine (fin d'après-midi)">Semaine (fin d'après-midi)</option>
                          <option value="Week-end">Week-end</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold" htmlFor="message">Message</label>
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          rows={5}
                          required
                          placeholder="Votre projet, vos questions, vos contraintes…"
                        />
                      </div>

                      <div className="col-12 d-flex flex-column flex-sm-row gap-2 align-items-sm-center justify-content-between mt-2">
                        <small className="text-secondary">
                          En envoyant ce formulaire, vous acceptez d'être recontacté au sujet de votre demande.
                        </small>

                        <button type="submit" className="btn btn-principal" disabled={status === "sending"}>
                          {status === "sending" ? "Envoi…" : "Envoyer la demande"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* INFOS */}
            <div className="col-12 col-lg-5">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <h2 className="h5 titre-principal mb-3">Infos pratiques</h2>
                  <p className="mb-2"><span className="fw-semibold">Lieu :</span> <span className="text-secondary">Chaudeney (près de Toul)</span></p>
                  <p className="mb-2"><span className="fw-semibold">Capacité :</span> <span className="text-secondary">jusqu'à ~100 personnes</span></p>
                  <p className="mb-0"><span className="fw-semibold">Saison :</span> <span className="text-secondary">printemps - été</span></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}