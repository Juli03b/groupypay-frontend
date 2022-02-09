import { FC, useContext } from "react";
import Form from "./Form";
import { makeStyles } from "@mui/styles";
import { Container, Typography } from "@mui/material";
import AppContext from "./AppContext";

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
    const { signIn } = useContext(AppContext);
    const classes = useStyles();
    return (
        <Container maxWidth="md" className={classes.container}>
            <Typography my={"1vh"} variant="h6">Sign in</Typography>
            <Form email password buttonText="Sign in" mode="signIn" onSubmit={signIn} />            
        </Container>
    );
}

export default SignIn;