import { NavLink } from "react-router-dom";

export default function Footer() {

    const footerLinkClass = ({ isActive }) =>
        "footer-link text-decoration-none py-1 " +
        (isActive ? "text-white fw-semibold" : "");

    return (
        <footer className="site-footer text-white py-4 mt-auto">
            <div className="container">
                <div className="row gy-4 align-items-start">
                    {/* Colonne 1 */}
                    <div className="col-12 col-md-6">
                        <h3 className="fw-semibold h5 mb-2">Château Moselly</h3>
                        <p className="mb-1 text-secondary">Chaudenay (près de Toul)</p>
                        <p className="mb-3 text-secondary">
                            Location du lieu pour mariages & événements.
                        </p>

                        <div className="d-flex gap-3">
                            <a
                                className="text-secondary"
                                href="#"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <i className="bi bi-instagram fs-4"></i>
                            </a>
                            <a
                                className="text-secondary"
                                href="#"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <i className="bi bi-facebook fs-4"></i>
                            </a>
                        </div>
                    </div>

                    {/* Colonne 2 */}
                    <div className="col-12 col-md-6">
                        <h3 className="fw-semibold h5 mb-2">Navigation</h3>
                        <ul className="list-unstyled mb-0">
                            <li><NavLink to="/" className={footerLinkClass}>Accueil</NavLink></li>
                            <li><NavLink to="/domaine" className={footerLinkClass}>Le domaine</NavLink></li>
                            <li><NavLink to="/prestations" className={footerLinkClass}>Prestations</NavLink></li>
                            <li><NavLink to="/galerie" className={footerLinkClass}>Galerie</NavLink></li>
                            <li><NavLink to="/infos" className={footerLinkClass}>Infos pratiques</NavLink></li>
                            <li><NavLink to="/contact" className={footerLinkClass}>Contact</NavLink></li>
                        </ul>
                    </div>
                </div>

                <div className="border-top border-secondary mt-4 pt-3 d-flex flex-column flex-md-row justify-content-between gap-2">
                    <small className="text-secondary">
                        © {new Date().getFullYear()} Château Moselly
                    </small>
                    <small className="text-secondary">Site vitrine — tous droits réservés</small>
                </div>
            </div>
        </footer>
    );
}
