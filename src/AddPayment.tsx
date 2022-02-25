import { Dialog, DialogTitle, DialogContentText, DialogContent, TextField, DialogActions, Button, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Box, Typography, Autocomplete, useAutocomplete, Input } from "@mui/material";
import * as yup from "yup";
import { useFormik } from 'formik';
import { useAlert } from "./hooks";
import { useEffect, useState } from "react";
import PaymentSplit from "./PaymentSplit";
import { MemberProps } from "./interfaces";

const AddPayment: any = ({handleClose, open, addPayment, members}: {handleClose: any, open: boolean, addPayment: Function, members: MemberProps}) => {
  const alert = useAlert();
  const [splitEqually, setSplitEqually] = useState(true);
  const [totalMemberPayment, setTotalMemberPayment] = useState(0);
  const payInput: any = {}
  const validationSchema = yup.object({
    name: yup
        .string()
        .max(45, "Name should be 45 characters or less")
        .required('Name is required'),
    total_amount: yup
        .number()
        .min(totalMemberPayment, `Amount should be greater than or equal to ${totalMemberPayment}`)
        .required("Amount is required"),
  });
  Object.keys(members).forEach(memberId => {
    // Populate inputs
    payInput[memberId] = 0
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      total_amount: "",
      memberPaid: Object.keys(members)[0],
      memberPaidInput: "",
      payInput: payInput
    },
    validationSchema: validationSchema,
    onSubmit: async ({name, total_amount, payInput, memberPaid}) => {
      if (parseFloat(`${totalMemberPayment}`) < parseFloat(formik.values.total_amount)) {
        return;
      }
      try {
        await addPayment({name, total_amount}, payInput, memberPaid);
        alert("Payment added", "success");
        handleClose();
      } catch (error: any) {
        alert(error, "error")
      }
    },
  });

  const handleTotalAmountChange = (values: React.ChangeEvent<any>) => {
    // Handle changing total amount

    formik.handleChange(values); // Change total amount input value

    if (splitEqually) {
      getAndSetEqualSplit(values.target.value || 0); // Change input values to split value
    }
    getAndSetTotalMemberPayment();
  };

  const handleInputChange = (values: React.ChangeEvent<any>, memberId: number) => {
    // Handle changing an input
    if (!values.target.value) return;
    const newValue: number = parseFloat(values.target.value); // Parse to float
    
    formik.values.payInput[memberId] = newValue;
    formik.setFieldValue("payInput", formik.values.payInput); // Set state of input box to newValue
 
    getAndSetTotalMemberPayment();
  }

  const getAndSetEqualSplit = (totalAmount: number) => {
    // Get total amount / number of members to get the new value and set for each input

    const splitValue = (totalAmount / Object.keys(members).length);

    for (let memberId of Object.keys(formik.values.payInput)) {
      formik.values.payInput[memberId] = splitValue;
    }
    formik.setFieldValue("payInput", formik.values.payInput);
  }

  const getAndSetTotalMemberPayment = () => {
    // Sums all member payments and sets totalMemberPayment to the sum
    const memberPayments: number[] = Object.values(formik.values.payInput);
    const addedPayments = memberPayments.reduce((prevPayment: number, currentPayment: number) => {
      return prevPayment + currentPayment;
    }, 0);

    setTotalMemberPayment(addedPayments);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a payment</DialogTitle>
        <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{marginY: "2.5vh"}}>
                <DialogContentText>
                  Enter a name and amount 
                </DialogContentText>
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
              </Box>

              <Box sx={{ width: 300, marginTop: "2.5vh"}}>
                  <Autocomplete
                    value={formik.values.memberPaid}
                    onChange={(event: any, newValue: string | null| any) => {
                      formik.setFieldValue("memberPaid", newValue);
                    }}
                    inputValue={formik.values.memberPaidInput}
                    onInputChange={(event, newInputValue) => {
                      formik.setFieldValue("memberPaidInput", newInputValue);
                    }}
                    getOptionLabel={(option) => {
                      return members[option].name
                    }}  
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option}>
                          {members[option].name}
                        </li>
                      );
                    }}
                    id="member-pay-choice"
                    options={Object.keys(members)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Who's paying" />}
                  />
              </Box>
              
              <Box>
                <FormControl sx={{marginY: "2.5vh"}}>
                  <FormLabel id="split-choice">How much is everyone paying?</FormLabel>
                  <RadioGroup
                    aria-labelledby="split-choice"
                    defaultValue="split-equally"
                    name="radio-buttons-group"
                    onChange={(value) => {
                      if (value.target.value === "split-equally"){
                        // If split equally, set split equally to true and split payments and set inputs
                        
                        setSplitEqually(true);

                        const totalAmountFloat = parseFloat(formik.values.total_amount);

                        getAndSetEqualSplit(totalAmountFloat);
                        setTotalMemberPayment(totalAmountFloat || 0);

                        validationSchema.fields.total_amount.min(totalMemberPayment);
                      }else{
                        setSplitEqually(false);
                      }
                    }}
                  >
                    <FormControlLabel value="split-equally" control={<Radio />} label="Split Equally" />
                    <FormControlLabel value="split" control={<Radio />} label="Split" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <PaymentSplit members={members} formValues={formik.values.payInput} disabled={splitEqually} onChange={handleInputChange} />
              
              {!splitEqually && (
                <Box sx={{display: "inline-block"}}>
                  <Typography variant="overline">Current total: </Typography>
                  <Typography variant="caption">${totalMemberPayment}</Typography>
                  
                  {
                    totalMemberPayment < parseFloat(formik.values.total_amount) && (
                      <Typography variant="caption" sx={{color: "#d32f2f"}}> will not cover ${formik.values.total_amount}</Typography>
                    )
                  }

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