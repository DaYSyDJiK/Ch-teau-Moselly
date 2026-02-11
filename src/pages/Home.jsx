import { useEffect } from "react"
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";

import g1 from "../images/g1.jpg";
import g2 from "../images/g2.jpg";
import g3 from "../images/g3.jpg";
import g4 from "../images/g4.jpg";

export default function Home() {

  const miniGallery = [
    { src: g1, alt: "Anniversaire" },
    { src: g2, alt: "Allée et verdure" },
    { src: g3, alt: "Château en Automne" },
    { src: g4, alt: "Château sous la neige" },
  ];

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
        title: "Château Moselly | Domaine de réception pour mariages & événements",
        description:
          "Découvrez le Château Moselly, un domaine de caractère pour mariages, réceptions et événements privés dans un cadre naturel et élégant.",
      });


  return (
    <>
      <section className="hero">
        <div className="hero-content reveal section">
          <div className="container">
            <div className="py-5">
              <h1>Château Moselly</h1>
              <h2>Un lieu d'exception pour vos mariages et événements en plein air</h2>

              <p className="pt-2">Au cœur de la nature, à l'écart de l'agitation urbaine, à Chaudenay près de Toul, le Château Moselly vous ouvre ses extérieurs pour célébrer les moments qui comptent.
                Mariage, vin d'honneur, cérémonie, réception privée ou événement d'entreprise : profitez d'un cadre authentique, élégant et préservé, propice aux souvenirs inoubliables.</p>
            </div>

            <div className="pb-5">
              <Link to="/contact" className="btn btn-principal">Demander une visite</Link>
            </div>

          </div>
        </div>
      </section>

      <section className="features section">
        <div className="container reveal py-5">
          <h2 className="text-center mb-5 titre-principal">Pourquoi choisir le Château Moselly</h2>

          <div className="row g-4 section">
            <div className="col-12 col-md-4">
              <div className="feature-card">
                <h3>Un cadre naturel unique</h3>
                <p>
                  Profitez d'un environnement calme et verdoyant, idéal pour des moments
                  inoubliables loin de l'agitation urbaine.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4 ">
              <div className="feature-card">
                <h3>Un lieu pensé pour vos événements</h3>
                <p>
                  Mariages, cérémonies, vins d'honneur ou événements professionnels :
                  le domaine s'adapte à vos projets et à vos envies.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="feature-card">
                <h3>Une expérience simple et humaine</h3>
                <p>
                  Une relation directe avec les propriétaires, un accompagnement
                  personnalisé et une grande liberté d'organisation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="events reveal section">
        <div className="container py-5 text-center">
          <h2 className="py-5 titre-secondaire">Un lieu pour tous vos événements</h2>

          <div className="row g-4 py-3">
            <div className="col-12 col-md-4 fw-semibold fs-5">Mariages & cérémonies</div>
            <div className="col-12 col-md-4 fw-semibold fs-5">Réceptions privées</div>
            <div className="col-12 col-md-4 fw-semibold fs-5">Événements d'entreprise</div>
          </div>
          <div className="pt-5">
            <Link to="/Prestations" className="btn btn-secondaire">Découvrir les prestations</Link>
          </div>
        </div>
      </section>

      <div className="gallery-marquee reveal" aria-label="Galerie photos défilante">
        <div className="gallery-track">
          <div className="gallery-set">
            {miniGallery.map((img, i) => (
              <div className="gallery-card" key={`a-${i}`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>

          <div className="gallery-set" aria-hidden="true">
            {miniGallery.map((img, i) => (
              <div className="gallery-card" key={`b-${i}`}>
                <img src={img.src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center mt-3 mb-0">Découvrez plus de photos dans la page Galerie</p>

      <div className="reveal section">
        <div className="container">
          <p className="mt-4">
            Une question ? <Link to="/contact" className="btn-secondary text-secondary">Contactez-nous</Link>
          </p>
        </div>
      </div>
    </>

  )
}