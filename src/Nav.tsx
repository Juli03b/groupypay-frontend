import { FC, useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "./AppContext";

const Navigation: FC = () => {
    const { user, signOut } = useContext(AppContext);
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
            <Navbar.Brand href="/">groupypay</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                {!user && <Nav.Link href="/">Home</Nav.Link>}
                {!user && <Nav.Link href="/sign-up">Sign Up</Nav.Link>}
                {!user && <Nav.Link href="/sign-in">Sign In</Nav.Link>}
                {user && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
                {user && <Nav.Link href="/" onClick={() => signOut()} >Sign Out</Nav.Link>}
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>    
    )
}

export default Navigation;