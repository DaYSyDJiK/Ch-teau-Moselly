import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Infos() {
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


  return (
    <>
      <Helmet>
        <title>Informations pratiques - Accès, horaires & capacités | Château Moselly</title>
        <meta name="description" content="Accès, localisation, capacités d'accueil, horaires et informations utiles pour organiser votre visite au Château Moselly." />
      </Helmet>

      <section className="section section--tight pt-4 reveal">
        <div className="container pt-5">
          <h1 className="titre-principal mb-2">Informations pratiques</h1>
          <p className="text-secondary mb-0">
            Tout ce qu'il faut savoir pour organiser votre évènement sereinement.
          </p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="row g-5 align-items-start">
            {/* Texte */}
            <div className="col-12 col-md-6">
              <h2 className="h4 mb-3 titre-principal">Accès au domaine</h2>

              <div className="mb-3">
                <p className="mb-1 fw-semibold">Adresse</p>
                <p className="mb-0 text-secondary">
                  126B Rue du Cap Paturaud, 54200 Chaudeney-sur-Moselle
                </p>
              </div>

              <div className="mb-3">
                <p className="mb-1 fw-semibold">Entrée</p>
                <p className="mb-0 text-secondary">
                  L'accès se fait par une allée privée et un portail, situés à quelques mètres de l'adresse principale.
                </p>
              </div>

              <div className="mb-3">
                <p className="mb-1 fw-semibold">Accès routier</p>
                <ul className="text-secondary mb-0">
                  <li>Toul: environ 10 minutes</li>
                  <li>Nancy: environ 30 minutes</li>
                  <li>Accès rapide depuis l'A31</li>
                </ul>
              </div>

              <div className="mb-3">
                <p className="mb-1 fw-semibold">Stationnement</p>
                <p className="mb-0 text-secondary">
                  Parking sur place (environ 10 vehicules). Stationnement facile dans les rues du village à proximité.
                </p>
              </div>

              <div>
                <p className="mb-1 fw-semibold">Accessibilité</p>
                <p className="mb-0 text-secondary">
                  Domaine en extérieur, accès PMR facile.
                </p>
              </div>
            </div>

            {/* Carte */}
            <div className="col-12 col-md-6">
              <div className="map-card shadow-sm rounded overflow-hidden">
                <div className="ratio ratio-16x9">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3201.9815961022764!2d5.9029525888689784!3d48.65357182204551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4794aecc2d83fb4b%3A0x8de07ebd226fa071!2sCentre%20Avicole%20du%20Ch%C3%A2teau!5e1!3m2!1sfr!2sfr!4v1769199143064!5m2!1sfr!2sfr" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>

              <p className="text-secondary small mt-2 mb-0">
                Astuce : l'entrée se fait par l'allée et le portail au croisement de la "Rue de Toul" et de la "Rue des Coquillottes" (voir carte).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container reveal">
          <h2 className="h4 mb-4 titre-principal">En bref</h2>

          <div className="info-chips">
            <span className="chip">Jusqu'à 100 personnes</span>
            <span className="chip">Printemps - été</span>
            <span className="chip">Extérieur uniquement</span>
            <span className="chip">Électricité disponible</span>
            <span className="chip">Eau à prévoir selon affluence</span>
            <span className="chip">Musique autorisée (volume modéré)</span>
            <span className="chip">Accès PMR</span>
            <span className="chip">Stationnement village</span>
          </div>
        </div>
      </section>


      <section className="section reveal">
        <div className="container">
          <div className="row g-4 align-items-start">
            {/* Colonne principale */}
            <div className="col-12 col-md-7">
              <h2 className="h4 mb-4 titre-principal">Organisation</h2>

              <p className="text-secondary mb-4">
                Le domaine est loué en exterieur. Vous gardez une grande liberté d'organisation,
                tout en respectant le lieu et son environnement.
              </p>

              <ul className="text-secondary mb-0">
                <li><strong>Traiteur libre</strong> (recommandations possibles si besoin)</li>
                <li><strong>DJ libre</strong></li>
                <li><strong>Décorateur libre</strong>, dans le respect des fleurs et de la pelouse</li>
                <li><strong>Tente ou chapiteau</strong> autorisé sur demande (à anticiper si risque de pluie)</li>
              </ul>
            </div>

            {/* Card encadree */}
            <div className="col-12 col-md-5 mt-4 mt-md-0">
              <div className="info-box shadow-sm">
                <h3 className="h6 mb-2 titre-secondaire">A retenir</h3>
                <ul className="mb-0">
                  <li>Extérieur uniquement (intérieur sur accompagnement famille)</li>
                  <li>Eau : prevoir de l'eau si grand nombre de personnes</li>
                  <li>Electricité disponible (détails lors de la visite)</li>
                  <li>Musique possible, volume réduit en fin de soirée si demande des voisins</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>






    </>
  )
}