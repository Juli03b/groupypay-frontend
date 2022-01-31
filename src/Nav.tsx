import { FC, useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "./AppContext";
import { IconButton, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

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
                    <IconButton sx={{mx:"1vh"}} LinkComponent={Nav.Link} href={`/profile/${user.email}`}>
                        <PersonIcon />
                    </IconButton>
                )} 
                {user && (
                    <IconButton sx={{mx:"1vh"}} onClick={() => signOut()}>
                        <LogoutIcon />
                    </IconButton>
                )} 
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>    
    )
}

export default Navigation;