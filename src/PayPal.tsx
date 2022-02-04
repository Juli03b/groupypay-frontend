import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { PayPalButton } from "react-paypal-button-v2";
import { useAlert } from "./hooks";
import { GroupPaymentProps, MemberPaymentProps, MemberProps } from "./interfaces";

const PayPal = ({
        open,
        handleClose,
        groupPayment,
        memberPayment,
        memberPayer,
        memberPayee,
        setIconGreen
    }: {
        open: boolean, 
        handleClose: any, 
        groupPayment: GroupPaymentProps, 
        memberPayment: MemberPaymentProps, 
        memberPayer: MemberProps[any], 
        memberPayee: MemberProps[any], 
        setIconGreen: any
    }) => {
        // info required: payee, payer, memberPayment, groupPayment
        const alert = useAlert();
        console.log("Member payment:", memberPayment)
        console.log("Member payee:", memberPayee)
        console.log("Member payer:", memberPayer)
        return (
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Pay {memberPayee.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <PayPalButton 
                        amount={memberPayment.amount}
                        currency={"USD"}
                        shippingPreference="NO_SHIPPING"
                        onSuccess={() => {
                            setIconGreen();
                            handleClose();
                        }}
                        catchError={(error: any) => {
                            alert(error, "error")
                        }}
                        options={{
                            merchantId: memberPayee.email
                        }}
                    />
                </DialogContentText>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
    
            </DialogContent>
        </Dialog>
        )
}

export default PayPal;