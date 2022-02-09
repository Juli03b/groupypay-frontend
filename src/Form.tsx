import { TextField, InputLabel, Grid, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import { FC, useState } from "react";
import { useAlert } from "./hooks";
import { useFormik } from "formik";
import * as yup from 'yup';
import { SIGN_IN_INITIAL_STATE, PATCH_INITIAL_STATE, SIGN_UP_INITIAL_STATE } from "./constants";
import Loading from "./Loading";

interface FormProps {
    [index: string]: boolean | undefined | string | Function,
    mode: "signUp" | "signIn" | "patch",
    email?: boolean,
    password?: boolean,
    name?: boolean,
    phoneNumber?: boolean,
    buttonText: string,
    onSubmit: Function
}
const email = yup.string().max(60, "Email should be 60 characters or less").email("Invalid email").required("Email is required");
const password = yup.string().min(5, "Password should be at least 5 characters").max(20, "Pasword should be 20 characters or less").required("Password is required");
const name = yup.string().max(30, "Name should be 20 characters or less").min(1, "Name should be at least 1 character").required("Name is required");
const phoneNumber = yup.string();
const namePatch = yup.string().max(30, "First name should be 20 characters or less");
const signInValidationSchema = yup.object({ email, password });
const signUpValidationSchema = yup.object({ name, password, email, phoneNumber });
const patchValidationSchema = yup.object({ name, password, email, phoneNumber });

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red'
  },
  formLabel: {
    marginBottom: "1rem",
    fontSize: "1.5rem"
    },
    container: {
        marginTop: "20%"
    },
    formTitle: {
        marginBottom: "1rem",
        fontSize: "1.5rem"
    }
});

// Component to centralize forms
const Form: FC<FormProps> = (props: FormProps) => {
    let INITIAL_STATE: any = {}
    let validationSchema = {}
    const { password, name, phoneNumber, email, mode, buttonText, onSubmit }: FormProps = props;
    const alert = useAlert();
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);

    if (mode === "signIn") {
        INITIAL_STATE = SIGN_IN_INITIAL_STATE;
        validationSchema = signInValidationSchema;
    } else if (mode === "signUp") {
        INITIAL_STATE = SIGN_UP_INITIAL_STATE;
        validationSchema = signUpValidationSchema;
    } else {
        INITIAL_STATE = PATCH_INITIAL_STATE;
        validationSchema = patchValidationSchema;
    }

    const formik = useFormik({
        initialValues: INITIAL_STATE,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                await onSubmit(values, (msg: any, type: any) => {
                    alert(msg, type);
                });
            } catch (error: any) {
                // alert
            } finally {
                setIsLoading(false);

            }
        }
    });

    return (
        <>
            {isLoading && <Loading />}
            <form onSubmit={formik.handleSubmit}>
                <div className="mx-auto">
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        {email &&
                            <Grid item xs={12}>
                                <InputLabel htmlFor="email-input" className={classes.formLabel}>Enter email</InputLabel>
                                <TextField
                                    error={formik.touched.email && !!formik.errors.email}
                                    value={formik.values.email}
                                    helperText={formik.touched.email && formik.errors.email}
                                    onChange={formik.handleChange}
                                    id="email-input"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    autoFocus
                                    fullWidth
                                    required
                                />
                            </Grid>
                        }
                        {name &&
                            <Grid item xs={12}>
                                <InputLabel htmlFor="name-input" className={classes.formLabel}>Enter your name</InputLabel>
                                <TextField
                                    error={formik.touched.name && !!formik.errors.name}
                                    value={formik.values.name}
                                    helperText={formik.touched.name && formik.errors.name}
                                    onChange={formik.handleChange}
                                    id="name-input"
                                    label="Name"
                                    name="name"
                                    type="name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                        }
                        {phoneNumber &&
                            <Grid item xs={12}>
                                <InputLabel htmlFor="phone-number-input" className={classes.formLabel}>Enter phone number</InputLabel>
                                <TextField
                                    error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                                    value={formik.values.phoneNumber}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    onChange={formik.handleChange}
                                    id="phone-number-input"
                                    label="Phone number"
                                    name="phoneNumber"
                                    type="phoneNumber"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        }
                        {password &&
                            <Grid item xs={12}>
                                <InputLabel htmlFor="password-input" className={classes.formLabel}>Enter {mode === "patch" && "new"} password</InputLabel>
                                <TextField
                                    error={formik.touched.password && !!formik.errors.password}
                                    value={formik.values.password}
                                    helperText={formik.touched.password && formik.errors.password}
                                    onChange={formik.handleChange}
                                    id="password-input"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                                {(mode == "signIn" || mode == "signUp") &&
                                    <Typography variant="caption" className="fs-5">
                                        Or {mode == "signUp" ? "sign in " : "sign up "} 
                                        <Link to={mode == "signUp" ? "/sign-in" : "/sign-up"}>
                                            here
                                        </Link>
                                    </Typography>
                                }
                            </Grid>

                        }
                        <Grid item xs={12}>
                            <button type="submit" className="btn btn-md btn-outline-dark mb-3 mx-auto d-block">{buttonText}</button>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </>
    );
}

export default Form;