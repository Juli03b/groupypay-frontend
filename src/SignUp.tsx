import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FC, useContext } from "react";
import AppContext from "./AppContext";
import Form from "./Form";

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
const SignUp: FC = () => {
    const { signUp } = useContext(AppContext);
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.container}>
            <Typography my={"1vh"} variant="h6">Sign up</Typography>
            <Form password name phoneNumber email signUp buttonText="Sign up" mode="signUp" onSubmit={(signUp)} />
        </Container>);
}

export default SignUp;