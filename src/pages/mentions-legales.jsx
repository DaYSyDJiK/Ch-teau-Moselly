import { Helmet } from "react-helmet-async";

<Helmet>
    <meta name="robots" content="noindex, nofollow" />
</Helmet>

export default function MentionsLegales() {
    return (

        <>

            <Helmet>
                <title>Mentions légales - Château Moselly</title>
                <meta name="description" content="Consultez les mentions légales du site du Château Moselly, domaine de réception pour événements privés et professionnels." />
            </Helmet>

            <main className="container py-5">
                {/* Header */}
                <header className="mb-4">
                    <h1 className="display-6 fw-bold mb-2">Mentions légales</h1>
                    <p className="text-muted mb-0">
                        <span className="fw-semibold">En vigueur au</span> 09/02/2026
                    </p>
                </header>

                {/* Intro */}
                <section className="card shadow-sm border-0 mb-4">
                    <div className="card-body p-4">
                        <p className="mb-3">
                            Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la
                            Confiance en l&apos;économie numérique, il est porté à la connaissance des
                            utilisateurs et visiteurs (ci-après l&apos;« Utilisateur ») du site{" "}
                            <a
                                href="https://chateau-moselly.vercel.app"
                                className="link-primary fw-semibold"
                                target="_blank"
                                rel="noreferrer"
                            >
                                https://chateau-moselly.vercel.app
                            </a>{" "}
                            (ci-après le « Site ») les présentes mentions légales.
                        </p>

                        <p className="mb-2">
                            La connexion et la navigation sur le Site par l&apos;Utilisateur implique
                            acceptation intégrale et sans réserve des présentes mentions légales.
                        </p>

                        <p className="mb-0">
                            Ces dernières sont accessibles sur le Site à la rubrique « Mentions légales ».
                        </p>
                    </div>
                </section>

                {/* Blocks */}
                <div className="row g-4">
                    {/* Édition */}
                    <div className="col-12 col-lg-6">
                        <section className="card h-100 shadow-sm border-0">
                            <div className="card-body p-4">
                                <h2 className="h5 fw-bold mb-3">Édition du site</h2>

                                <dl className="mb-0">
                                    <dt className="text-muted fw-semibold">Éditeur / Directeur de publication</dt>
                                    <dd className="mb-3">Monsieur Maxime Gauthier</dd>

                                    <dt className="text-muted fw-semibold">Adresse</dt>
                                    <dd className="mb-3">4 rue de Ruat</dd>

                                    <dt className="text-muted fw-semibold">Téléphone</dt>
                                    <dd className="mb-3">
                                        <a href="tel:+33651042966" className="link-secondary">
                                            06 51 04 29 66
                                        </a>
                                    </dd>

                                    <dt className="text-muted fw-semibold">Email</dt>
                                    <dd className="mb-0">
                                        <a href="mailto:maxi.gauthier112@gmail.com" className="link-secondary">
                                            maxi.gauthier112@gmail.com
                                        </a>
                                    </dd>
                                </dl>

                                <p className="text-muted small mt-3 mb-0">Ci-après l’« Éditeur ».</p>
                            </div>
                        </section>
                    </div>

                    {/* Hébergeur */}
                    <div className="col-12 col-lg-6">
                        <section className="card h-100 shadow-sm border-0">
                            <div className="card-body p-4">
                                <h2 className="h5 fw-bold mb-3">Hébergeur</h2>

                                <p className="mb-2">
                                    L&apos;hébergeur du Site est la société <span className="fw-semibold">Vercel Inc.</span>
                                </p>

                                <div className="border rounded p-3 bg-light">
                                    <p className="mb-0">
                                        340 S Lemon Ave #4133<br />
                                        91789 Walnut, Californie<br />
                                        États-Unis
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Accès au site */}
                    <div className="col-12">
                        <section className="card shadow-sm border-0">
                            <div className="card-body p-4">
                                <h2 className="h5 fw-bold mb-3">Accès au site</h2>

                                <p className="mb-2">
                                    Le Site est normalement accessible, à tout moment, à l&apos;Utilisateur.
                                    Toutefois, l&apos;Éditeur pourra, à tout moment, suspendre, limiter ou
                                    interrompre le Site afin de procéder notamment à des mises à jour ou des
                                    modifications de son contenu.
                                </p>

                                <p className="mb-0">
                                    L&apos;Éditeur ne pourra en aucun cas être tenu responsable des conséquences
                                    éventuelles de cette indisponibilité sur les activités de l&apos;Utilisateur.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Données */}
                    <div className="col-12">
                        <section className="card shadow-sm border-0">
                            <div className="card-body p-4">
                                <h2 className="h5 fw-bold mb-3">Collecte des données</h2>

                                <p className="mb-2">
                                    Le Site assure à l&apos;Utilisateur une collecte et un traitement des données
                                    personnelles dans le respect de la vie privée conformément à la loi n°78-17
                                    du 6 janvier 1978 et au règlement (UE) 2016/679 (RGPD).
                                </p>

                                <p className="mb-2">
                                    L&apos;Utilisateur dispose d&apos;un droit d&apos;accès, de rectification, de suppression
                                    et d&apos;opposition de ses données personnelles.
                                </p>

                                <p className="fw-semibold mb-2">Exercice des droits :</p>
                                <ul className="mb-0">
                                    <li>
                                        Par mail :{" "}
                                        <a href="mailto:chateaumoselly1760@gmail.com" className="link-secondary">
                                            chateaumoselly1760@gmail.com
                                        </a>
                                    </li>
                                    <li>Via le formulaire de contact du Site</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Propriété */}
                    <div className="col-12">
                        <section className="alert alert-warning mb-0">
                            <p className="mb-0">
                                Toute utilisation, reproduction, diffusion, commercialisation ou modification
                                de toute ou partie du Site, sans autorisation expresse de l&apos;Éditeur est prohibée
                                et pourra entraîner des actions et poursuites judiciaires telles que prévues par la réglementation en vigueur.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}