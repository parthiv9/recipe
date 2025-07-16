import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">RecipeApp</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/saved" active={location.pathname === "/saved"}>
                        Saved
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
