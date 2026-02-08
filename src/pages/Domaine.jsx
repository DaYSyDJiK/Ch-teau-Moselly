import chateau1 from "../images/chateau1.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Domaine() {

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

      <section className="section">
        <div className="container shadow rounded p-4 reveal">
          <div className="row align-items-center gx-5 gy-4 gy-md-0">
            <div className="col-12 col-md-6 order-2 order-md-1">
              <h2 className="titre-principal">L'histoire du Château Moselly</h2>
              <h3 className="titre-principal">Un lieu façonné par le temps et la vie de famille</h3>
              <br />
              <p>Implanté à Chaudenay, à proximité de Toul, le Château Moselly est avant tout une demeure familiale, transmise et habitée au fil des générations. Longtemps, le domaine a vécu au rythme de la vie rurale : une propriété entretenue avec soin, entourée de terres, d'une ancienne écurie et de poulaillers qui permettaient à la famille de compléter ses revenus et de faire vivre le lieu.
                <br /><br />
                Au fil des années, les usages ont évolué. Certaines dépendances ont disparu, mais l'essentiel est resté : <strong>le château, son parc et cette atmosphère paisible</strong>, préservée de l'agitation urbaine. Aujourd'hui encore, la famille qui y réside consacre une grande partie de son temps à l'entretien du domaine et de ses extérieurs, afin de conserver l'authenticité et l'élégance du lieu.
                <br /><br />
                C'est presque par hasard que <strong>le Château Moselly a commencé à accueillir des événements.</strong> Séduits par le cadre naturel et le charme du parc, des visiteurs ont un jour demandé s'il était possible d'y organiser un vin d'honneur. <strong>L'expérience fut une évidence.</strong> Les mariés, comme leurs invités, ont été conquis par la simplicité du lieu, son caractère intime et la liberté qu'offrent ses espaces extérieurs.
                <br /><br />
                Depuis, le domaine s'ouvre ponctuellement à celles et ceux qui souhaitent <strong>célébrer un moment important</strong> dans un cadre authentique. <u> Mariages, cérémonies, réceptions privées ou événements professionnels</u> trouvent ici un écrin naturel, où l'histoire familiale se mêle discrètement aux souvenirs que chacun vient y créer.
                <br /><br />
                Le Château Moselly n'est pas un lieu figé : c'est un domaine vivant, pensé pour accueillir, partager et transmettre, tout en respectant son histoire et son environnement.</p>
            </div>

            <div className="col-12 col-md-6 order-1 order-md-2">
              <img src={chateau1} alt="Extérieur du Château Moselly" className="img-fluid rounded shadow object-fit-cover" />
            </div>
          </div>

        </div>
      </section>


      <section>
        <div className="container">
          <div className="row g-4 reveal">

            <div className="col-12 col-md-4">
              <div className="card h-100 shadow feature-card">
                <div className="card-body">
                  <i className="bi bi-tree fs-1 titre-secondaire mb-3"></i>
                  <h4 className="card-title h5 mb-3">Un parc propice aux receptions</h4>
                  <p className="card-text">
                    Un cadre naturel et verdoyant pour vos receptions et ceremonies.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 shadow feature-card">
                <div className="card-body">
                  <i className="bi bi-cup-straw fs-1 titre-secondaire mb-3"></i>
                  <h4 className="card-title h5 mb-3">Des espaces adaptables</h4>
                  <p className="card-text">
                    Des exterieurs adaptes pour un vin d'honneur ou une ceremonie laique.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 shadow feature-card">
                <div className="card-body">
                  <i className="bi bi-cake fs-1 titre-secondaire mb-3"></i>
                  <h4 className="card-title h5 mb-3">Une grande liberte d'organisation</h4>
                  <p className="card-text">
                    Une liberte totale pour imaginer votre evenement en exterieur.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      <section className="section">
        <div className="container py-5">
          <h2 className="mb-4 text-center titre-principal">Informations pratiques</h2>

          <div className="row g-3 justify-content-center">
            <div className="col-12 col-sm-6 col-lg-4 reveal">
              <div className="info-pill">
                <i className="bi bi-signpost-2 fs-4"></i>
                <span>Accès facile</span>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 reveal">
              <div className="info-pill">
                <i className="bi bi-car-front fs-4"></i>
                <span>Stationnement</span>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 reveal">
              <div className="info-pill">
                <i className="bi bi-eye fs-4"></i>
                <span>Visite possible</span>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 reveal">
              <div className="info-pill">
                <i className="bi bi-tree fs-4"></i>
                <span>En exterieur</span>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 reveal">
              <div className="info-pill">
                <i className="bi bi-heart fs-4"></i>
                <span>Environnement calme</span>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 reveal">
              <div className="info-pill">
                <i className="bi bi-sun fs-4"></i>
                <span>Saison printemps-ete</span>
              </div>
            </div>
          </div>

          <p className="text-center mt-4 mb-0">
            Pour plus de details, consultez la page <Link to="/infos" className="text-secondary">Infos pratiques</Link>
          </p>
        </div>
      </section>








    </>
  );
}