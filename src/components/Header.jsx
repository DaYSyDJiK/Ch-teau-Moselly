import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

export default function Header() {

    const linkClass = ({ isActive }) => isActive ? "nav-link active fw-bold" : "nav-link";

    return (
        <Navbar expand="lg navbar-color text-white" variant="dark">
            <Container className="py-2">
                <Navbar.Brand as={NavLink} to="/">Château Moselly</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/">Accueil</Nav.Link>
                        <Nav.Link as={NavLink} to="/domaine" className={linkClass}>Domaine</Nav.Link>
                        <Nav.Link as={NavLink} to="/prestations">Prestations</Nav.Link>
                        <Nav.Link as={NavLink} to="/galerie">Galerie</Nav.Link>
                        <Nav.Link as={NavLink} to="/infos">Infos</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}