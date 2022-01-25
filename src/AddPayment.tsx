import { Dialog, DialogTitle, DialogContentText, DialogContent, TextField, DialogActions, Button, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Box, Typography } from "@mui/material";
import * as yup from "yup";
import { useFormik } from 'formik';
import { useAlert } from "./hooks";
import { useEffect, useState } from "react";
import PaymentSplit from "./PaymentSplit";
import { MemberProps } from "./interfaces";

const validationSchema = yup.object({
    name: yup
        .string()
        .max(45, "Name should be 45 characters or less")
        .required('Name is required'),
    total_amount: yup
        .number()
        .required("Amount is required"),
              
});


const AddPayment: any = ({handleClose, open, addPayment, members}: {handleClose: any, open: boolean, addPayment: Function, members: MemberProps[]}) => {
  const alert = useAlert();
  const [splitEqually, setSplitEqually] = useState(true);
  const [totalMemberPayment, setTotalMemberPayment] = useState(0);
  const payInput: any = {}

  members.forEach(member => {
    payInput[member.id] = 0
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      total_amount: "",
      payInput: payInput
    },
    validationSchema: validationSchema,
    onSubmit: async ({name, total_amount, payInput}) => {

      try {
        await addPayment({name, total_amount}, payInput);
        
      } catch (error: any) {
        console.log("ERROR", error)
        alert(error, "error")
      }
      alert("Payment added", "success");
    },
  });
  const handleTotalAmountChange = (values: React.ChangeEvent<any>) => {
    formik.handleChange(values);
    console.log("VALUES", values.target.value);

    if (splitEqually) {
      const splitValue = (values.target.value / members.length);
  
      for (let memberId of Object.keys(formik.values.payInput)) {
        formik.values.payInput[memberId] = splitValue;
      }
      formik.setFieldValue("payInput", formik.values.payInput);
    } else {
      // Add current member payments together and set state
      const memberPayments: number[] = Object.values(formik.values.payInput);
      const addedPayments = memberPayments.reduce((prevPayment: number, currentPayment: number) => {
        return prevPayment + currentPayment;
      }, 0);

      setTotalMemberPayment(addedPayments);
    }
  };
  const handleInputChange = (values: React.ChangeEvent<any>, memberId: number) => {
    console.log("NEW VALUEL FREOM INPUT:", values.target.value)
    if (!values.target.value) return;
    const newValue: number = parseInt(values.target.value); // Parse to float
    
    formik.values.payInput[memberId] = newValue;
    formik.setFieldValue("payInput", formik.values.payInput) // Set state of input box to newValue
    
    console.log("TOTAL_AMOUNT:", formik.values.total_amount)
    const subtractedValue = parseFloat(formik.values.total_amount) - newValue // Get subtracted value
    
    console.log("SUBTRACTED VALUE", subtractedValue)
    formik.setFieldValue("total_amount", subtractedValue)

  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a payment</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter a name and amount 
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
                  id="total_amount"
                  name="total_amount"
                  label="Amount"
                  type="number"
                  variant="outlined"
                  value={formik.values.total_amount}
                  onChange={handleTotalAmountChange}
                  error={formik.touched.total_amount && Boolean(formik.errors.total_amount)}
                  helperText={formik.touched.total_amount && formik.errors.total_amount}
                  fullWidth
                  required
                />
                <FormControl sx={{marginTop: "2.5vh", marginBottom: "2.5vh"}}>
                  <FormLabel id="split-choice">How much is everyone paying?</FormLabel>
                  <RadioGroup
                    aria-labelledby="split-choice"
                    defaultValue="split-equally"
                    name="radio-buttons-group"
                    onChange={(value) => {
                      setSplitEqually(value.target.value === "split-equally" )
                    }}
                  >
                    <FormControlLabel value="split-equally" control={<Radio />} label="Split Equally" />
                    <FormControlLabel value="split" control={<Radio />} label="Split" />
                  </RadioGroup>
                </FormControl>
                <PaymentSplit members={members} formValues={formik.values.payInput} disabled={splitEqually} onChange={handleInputChange} />
              {!splitEqually && (
                <Box sx={{display: "inline-block"}}>
                  <Typography variant="overline">Current total: </Typography>
                  <Typography variant="caption">$ {totalMemberPayment}</Typography>

                </Box>
              )}
              <DialogActions sx={{display: "inline-block", marginLeft: "7vw", marginTop: "1vw"}}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color="primary" variant="contained" type="submit">Add Payment</Button>
              </DialogActions>


            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddPayment;