import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { PayPalButton } from "react-paypal-button-v2";
import { GroupPaymentProps, MemberPaymentProps } from "./interfaces";

const PayPal = ({
        open,
        handleClose,
        groupPayment,
        memberPayment,
        member
    }: {open: boolean, handleClose: any, groupPayment: GroupPaymentProps, memberPayment: MemberPaymentProps, member: any}) => {
    
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