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
    .max(30, "Name should be 30 characters or less")
    .required('Name is required'),
  description: yup
    .string()
    .max(200, "Description should be 200 characters or less"),
});


const MakeGroup: any = ({handleClose, open, addGroup}: {handleClose: any, open: boolean, addGroup: Function}) => {
  const { makeGroup } = useContext(AppContext);
  const alert = useAlert();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const group = await makeGroup(values);
      alert("Group created", "success");
      addGroup(group);
      console.log("GROUP", group)
      handleClose();
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new group</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please enter the name of the group and a brief description
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
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    fullWidth
                />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button color="primary" variant="contained" type="submit">Create Group</Button>
            </DialogActions>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MakeGroup;