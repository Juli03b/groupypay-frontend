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
        .min(10, "Number should be at least 10 characters")
        .max(11, "Number should be at most 11 characters")                  
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
      try {
        await addMember(values);
        
        alert("Member created", "success");
        handleClose();
      } catch (errors: any) {
        for (const error of errors) {
          alert(error, "error")
        }
      }      
    },
  });

  return (
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
              />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button color="primary" variant="contained" type="submit">Add member</Button>
          </DialogActions>
          </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddMember;