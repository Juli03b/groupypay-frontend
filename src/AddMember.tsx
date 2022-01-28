import { Dialog, DialogTitle, DialogContentText, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { useFormik } from 'formik';
import { useAlert } from "./hooks";
import { useContext } from "react";
import AppContext from "./AppContext";

const validationSchema = yup.object({
    name: yup
        .string()
        .max(55, "Name should be 55 characters or less")
        .required('Name is required'),
    email: yup
        .string()
        .max(127, "Email should be 127 characters or less")
        .required("Email is required"),
    phone_number: yup
        .string()
        .max(10)                  
});


const AddMember: any = ({handleClose, open, addMember}: {handleClose: any, open: boolean, addMember: Function}) => {
  const alert = useAlert();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("valiues:", values)
      const member = await addMember(values);
      alert("Member created", "success");
      console.log("NEW member", member)
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a member</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter name, email, and phone number
            </DialogContentText>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    id="name"
                    label="Name"
                    type="text"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    fullWidth
                    required
                />
                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    type="text"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                    required
                />
                <TextField
                    margin="dense"
                    id="phone_number"
                    name="phone_number"
                    label="Phone"
                    type="text"
                    variant="outlined"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                    helperText={formik.touched.phone_number && formik.errors.phone_number}
                    fullWidth
                    required
                />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button color="primary" variant="contained" type="submit">Add member</Button>
            </DialogActions>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddMember;