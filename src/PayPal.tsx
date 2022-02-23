import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButton } from "react-paypal-button-v2";
import { useAlert } from "./hooks";
import { GroupPaymentProps, MemberPaymentProps, MemberProps } from "./interfaces";
const initialOptions = {
    "client-id": "AVI4P2a1Gh8e-8GaOPsCtZB2u7h5NGKeZSUQuK3IYoHEfcQwBgvTDyZ2o-yLbAp38rOc3APJuclhQ9uS",
    currency: "USD",
    intent: "capture",
};

const PayPal = ({
        open,
        handleClose,
        groupPayment,
        memberPayment,
        memberPayee,
        setIconGreen
    }: {
        open: boolean, 
        handleClose: any, 
        groupPayment: GroupPaymentProps, 
        memberPayment: MemberPaymentProps, 
        memberPayee: MemberProps[any], 
        setIconGreen: any
    }) => {
        // info required: payee, payer, memberPayment, groupPayment
        const alert = useAlert();

        return (
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Pay {memberPayee.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            createOrder={(data: any, actions: any) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: memberPayment.amount,
                                            },
                                            payee: {
                                                email_address: memberPayee.email
                                            },
                                            description: groupPayment.name,
                                        },
                                    ],
                                    application_context: {
                                        shipping_preference: "NO_SHIPPING"
                                    }
                                });
                            }}
                            onError={(error: any) => {
                                alert(`${memberPayee.name}'s account is restricted or email is invalid`, "error")
                                
                            }}
                            onApprove={(data: any, actions: any) => {
                                return actions.order.capture().then((details: any) => {
                                    const name = details.payer.name.given_name;
                                    alert(`Transaction completed by ${name}`, "success");
                                    setIconGreen();
                                    handleClose();
                                }).catch((error: any) => {
                                    alert("Sorry, something went wrong", "error")
                                });
                            }}
                        />
                    </PayPalScriptProvider>

                </DialogContentText>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
    
            </DialogContent>
        </Dialog>
        )
}

export default PayPal;