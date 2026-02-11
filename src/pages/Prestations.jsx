import { useEffect } from "react";
import { Link } from "react-router-dom";


export default function Prestations() {
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
            title: "Prestations & services - Mariages et réceptions au Château Moselly",
            description:
              "Découvrez les prestations du Château Moselly : mariages, réceptions privées, événements sur mesure dans un cadre d'exception.",
          });


  return (
    <>
      <div className="section">
        <div className="container reveal">
          <h1 className="titre-principal">Prestations</h1>

          <div className="row my-4">
            <div className="col-12 col-md-4 my-3">
              <div className="card h-100 shadow feature-card d-flex">
                <div className="card-body d-flex flex-column">
                  <i className="bi bi-stars fs-2 titre-secondaire"></i>
                  <h2 className="titre-principal h3 py-3">Mariage & cérémonies</h2>
                  <p>Organisez votre mariage dans un cadre naturel et elegant, loin de l'agitation urbaine. Le Château Moselly vous accueille pour celebrer ce moment unique dans une atmosphere intime et authentique.</p>
                  <ul className="py-3">
                    <li>Un écrin de verdure pour partager un moment inoubliable</li>
                    <li>Espaces adaptables selon votre projet et vos envies</li>
                    <li>Un lieu simple, humain et chargé d'histoire</li>
                  </ul>
                  <Link to="/contact" className="btn btn-principal mt-auto">
                    Demander une visite
                  </Link>
                </div>
              </div>
            </div>


            <div className="col-12 col-md-4 my-3 reveal">
              <div className="card h-100 shadow feature-card d-flex">
                <div className="card-body d-flex flex-column">
                  <i className="bi bi-people fs-2 titre-secondaire"></i>
                  <h2 className="titre-principal h3 py-3">Réceptions privées</h2>
                  <p>Anniversaire, fete de famille ou reception entre proches : profitez d'un cadre naturel pour partager un moment convivial en toute liberte.</p>
                  <ul className="py-3">
                    <li>Un environnement calme, propice aux retrouvailles</li>
                    <li>Une grande liberté d'organisation sans contraintes rigides</li>
                    <li>Un lieu different pour marquer le coup simplement</li>
                  </ul>
                  <Link to="/contact" className="btn btn-principal mt-auto">
                    Demander une visite
                  </Link>
                </div>
              </div>
            </div>


            <div className="col-12 col-md-4 my-3 reveal">
              <div className="card h-100 shadow feature-card d-flex">
                <div className="card-body d-flex flex-column">
                  <i className="bi bi-briefcase fs-2 titre-secondaire"></i>
                  <h2 className="titre-principal h3 py-3">Événements d'entreprise</h2>
                  <p>Offrez a vos equipes un cadre different pour vos reunions, évènements ou moments de cohesion. Un lieu propice aux échanges et a la deconnexion.</p>
                  <ul className="py-3">
                    <li>Une alternative aux lieux professionnels classiques</li>
                    <li>Cadre naturel propice a la déconnexion</li>
                    <li>Une experience qui sort du quotidien</li>
                  </ul>
                  <Link to="/contact" className="btn btn-principal mt-auto">
                    Demander une visite
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-secondary text-center">Chaque evenement est different. Une visite permet d'imaginer ensemble la configuration la plus adaptee.</p>
          </div>

        </div>
      </div>













    </>

  )
}