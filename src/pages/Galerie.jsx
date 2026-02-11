import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import g1 from "../images/g1.jpg";
import g2 from "../images/g2.jpg";
import g3 from "../images/g3.jpg";
import g4 from "../images/g4.jpg";
import g5 from "../images/chateau1.jpg";
import g6 from "../images/chateaucoinchill.jpg";
import g7 from "../images/chateaucouchedesoleilportrait1.jpg";
import g8 from "../images/chateaudevant1.jpg";
import g9 from "../images/chateauentree2.jpg";
import g10 from "../images/chateauentretien1.jpg";
import g11 from "../images/chateauentretien2.jpg";
import g12 from "../images/chateauentretien3.jpg";
import g13 from "../images/chateauetang2.jpg";
import g14 from "../images/chateauetanghiver.jpg";
import g15 from "../images/chateaupotager.jpg";
import g16 from "../images/hero.jpg";







export default function Galerie() {

  const images = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16];
  const [selectedImg, setSelectedImg] = useState(null);

  // Fermer la photo avec ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImg(null);
      }
    };
    if (selectedImg) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImg]);

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
      { threshold: 0.10 }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (

    <>
      <Helmet>
        <title>Galerie photos - Mariages et événements au Château Moselly</title>
        <meta name="description" content="Parcourez la galerie photo du Château Moselly et plongez dans l'ambiance de nos mariages, réceptions et événements inoubliables." />
      </Helmet>

      <section className="section reveal">
        <div className="container">
          <h1 className="titre-principal mb-3">Galerie</h1>
          <p className="text-secondary mb-4">
            Quelques apercus du domaine et de ses evenements.
          </p>

          <div className="row g-3 gallery-grid">
            {images.map((img, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <button
                  type="button"
                  className="gallery-title gallery-button"
                  onClick={() => setSelectedImg(img)}
                  aria-label={`Agrandir la photo ${index + 1}`}
                >
                  <img src={img} alt={`Galerie ${index + 1}`} loading="lazy" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Lightbox */}
      {selectedImg && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelectedImg(null)}>

          <button
            type="button"
            className="lightbox-close"
            aria-label="Fermer"
            onClick={() => setSelectedImg(null)}
          >
            ×
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImg} alt="Photo agrandie" />
          </div>
        </div>
      )}


      <div className="container pb-5">
        <div className="text-center text-secondary">
          <p>Et pleins d'autres photos à venir grâce à vous !</p>
        </div>
      </div>

    </>
  )
}