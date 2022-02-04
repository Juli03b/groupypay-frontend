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
        memberPayer: MemberProps, 
        memberPayee: MemberProps, 
        setIconGreen: any
    }) => {
        // info required: payee, payer, memberPayment, groupPayment
        const alert = useAlert();

        return (
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Pay {memberPayee.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <PayPalButton 
                    amount={2}
                    currency={"USD"}
                    shippingPreference="NO_SHIPPING"
                    onSuccess={() => {
                        setIconGreen();
                    }}
                    catchError={(error: any) => {
                        alert(error, "error")
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