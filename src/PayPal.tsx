import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { PayPalButton } from "react-paypal-button-v2";
import { useAlert } from "./hooks";
import { GroupPaymentProps, MemberPaymentProps } from "./interfaces";

const PayPal = ({
        open,
        handleClose,
        groupPayment,
        memberPayment,
        member,
        setIconGreen
    }: {open: boolean, handleClose: any, groupPayment: GroupPaymentProps, memberPayment: MemberPaymentProps, member: any, setIconGreen: any}) => {
        const alert = useAlert();
        console.log(member, "MEMMEMEMME")
        return (
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Pay {member.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <PayPalButton 
                    amount={2}
                    currency={"USD"}
                    shippingPreference="NO_SHIPPING"
                    onSuccess={() => {
                        console.log("SUCCESS")
                        setIconGreen();
                    }}
                    catchError={(error: any) => {
                        console.error("Paypal error:", error);
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