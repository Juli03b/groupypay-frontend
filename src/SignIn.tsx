import { FC } from "react";
import Form from "./Form";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";

const useStyles = makeStyles({
    formLabel: {
        marginBottom: "1rem",
        fontSize: "1.5rem"
    },
    container: {
        marginTop: "12.5rem"
    },
    formTitle: {
        marginBottom: "1rem",
        fontSize: "1.5rem"
    }
});

const SignIn: FC = () => {
    const classes = useStyles()
    return (
        <Container maxWidth="md" className={classes.container}>
            <p>Sign Up</p>
            <Form email password buttonText="Sign in" mode="signIn" onSubmit={() => "signIn"} />            
        </Container>);}

export default SignIn;