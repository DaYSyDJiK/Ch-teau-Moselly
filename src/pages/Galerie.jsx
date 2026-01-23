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

  return (
    <section className="section">
      <div className="container">
        <h1 className="titre-principal mb-3">Galerie</h1>
        <p className="text-secondary mb-4">
          Quelques apercus du domaine et de ses evenements.
        </p>

        <div className="row g-3 gallery-grid">
          {images.map((img, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div className="gallery-title">
                <img src={img} alt={`Galerie ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}