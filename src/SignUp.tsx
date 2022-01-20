import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FC } from "react";
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
    // const { signUp } = useContext(AppContext);
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.container}>
            <p>Sign in</p>
            <Form password name phoneNumber email signUp buttonText="Sign up" mode="signUp" onSubmit={() => console.log("signed")} />
        </Container>);
}

export default SignUp;