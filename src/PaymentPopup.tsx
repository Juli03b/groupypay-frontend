import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { GroupPaymentProps, MemberPaymentProps, MemberProps } from './interfaces';
import { Box, Card, Chip, Divider, Stack, Switch } from '@mui/material';
import dateFormat, { masks } from "dateformat";
import PaidIcon from '@mui/icons-material/Paid';
import GroupypayApi from './GroupypayApi';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
};

const PaymentPopup = ({handleClose, payment, members, payPayment}: {handleClose: any, payment: GroupPaymentProps, members: any, payPayment: any}) => {
    console.log("PAYMENT",payment)
    console.log("MEMBERS",members)
    const [memberPayments, setMemberPayments] = React.useState<MemberPaymentProps[]>([]);

    React.useEffect(() => {
        setMemberPayments(payment.member_payments || [])
    }, [])

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="payment-popup"
            open={!!payment}
        >
            <BootstrapDialogTitle id="payment-popup" onClose={handleClose}>
                <Typography variant="caption" sx={{color: (theme) => theme.palette.grey[700] , fontSize: ".75em"}}>Payment</Typography>
                <Typography variant="subtitle2" sx={{fontSize: "1.5em"}}>{payment.name}</Typography>
            </BootstrapDialogTitle>

            <DialogContent dividers>
                {/* Payment Info */}
                <Box my={2}>
                    <Typography variant="caption" sx={{color: (theme) => theme.palette.grey[700] , fontSize: "1em"}}>
                        Total amount
                    </Typography>

                    <Typography variant="subtitle2" sx={{fontSize: "1.5em"}}>
                        ${payment.total_amount}
                        
                    </Typography>
                </Box>
                <Box my={2}>
                    <Typography variant="caption" sx={{color: (theme) => theme.palette.grey[700] , fontSize: "1em"}}>
                        Created on
                    </Typography>

                    <Typography variant="subtitle2" sx={{fontSize: "1.5em"}}>
                        {dateFormat(payment.created_on, masks.fullDate)}
                        
                    </Typography>
                </Box>
                <Box my={2}>
                    <Typography variant="caption" sx={{color: (theme) => theme.palette.grey[700] , fontSize: "1em"}}>
                        Who paid?
                    </Typography>
                    <Typography variant="subtitle2" sx={{fontSize: "1.5em"}}>
                        {members[payment.member_id].name}      
                    </Typography>
                </Box>

                {/* Member Payments */}
                <Box>
                    {memberPayments.map((memberPayment, idx) => {
                        const member = members[memberPayment.member_id]
                        return (
                            <Card key={memberPayment.member_id} sx={{my: "1vh"}} >
                                {console.log("PAYMENT", memberPayment)}
                                <Box sx={{ p: 2, display: 'flex' }}>
                                    <Stack spacing={0.5}>
                                        <Typography fontWeight={700}>{member.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ${memberPayment.amount}
                                        </Typography>
                                    </Stack>
                                    <IconButton onClick={() => payPayment(payment.id, memberPayment.member_id, () => setMemberPayments(payments => {
                                        payments[idx].paid = true
                                        return [...payments]
                                    }))}>
                                        <PaidIcon sx={{color: memberPayment.paid ? "green" : "red" }} />
                                    </IconButton>
                                </Box>
                                <Divider />
                            </Card>
                        );
                    })}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Exit
                </Button>
            </DialogActions>
        </BootstrapDialog>)
}

export default PaymentPopup;