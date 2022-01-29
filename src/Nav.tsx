import { FC, useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "./AppContext";
import { Typography } from "@mui/material";

const Navigation: FC = () => {
    const { user, signOut } = useContext(AppContext);
    return (
        <Navbar bg="transparent" expand="lg" variant={undefined}>
            <Container>
            <Navbar.Brand href="/">
                <Typography>
                    groupypay
                </Typography>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                {!user && (
                    <Typography component={Nav.Link} href="/sign-up" variant="body1">
                        Sign up
                    </Typography>
                )}
                {!user && (
                    <Typography component={Nav.Link} href="/sign-in" variant="body1">
                        Sign in
                    </Typography>
                )}
                {user && (
                    <Typography component={Nav.Link} href="/dashboard" variant="body1">
                        Dashboard
                    </Typography>
                )}
                {user && (
                    <Typography component={Nav.Link} href="/" variant="body1" onClick={() => signOut()}>
                        Sign out
                    </Typography>
                )} 
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>    
    )
}

export default Navigation;