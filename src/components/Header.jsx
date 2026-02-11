import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

export default function Header() {
    const [expanded, setExpanded] = useState(false);

    const linkClass = ({ isActive }) =>
        isActive ? "nav-link active fw-bold" : "nav-link";

    const closeMenu = () => setExpanded(false);

    return (
        <Navbar
            expand="lg"
            className="navbar-color text-white"
            variant="dark"
            expanded={expanded}
            onToggle={(val) => setExpanded(val)}
        >
            <Container className="py-2">
                <Navbar.Brand as={NavLink} to="/" onClick={closeMenu}>
                    Château Moselly
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />

                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" onClick={closeMenu}>
                            Accueil
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/domaine" className={linkClass} onClick={closeMenu}>
                            Domaine
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/prestations" onClick={closeMenu}>
                            Prestations
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/galerie" onClick={closeMenu}>
                            Galerie
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/infos" onClick={closeMenu}>
                            Infos
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/contact" onClick={closeMenu}>
                            Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}