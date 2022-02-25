import { Dialog, DialogTitle, IconButton, styled } from "@mui/material";
import { FC, useContext, useState } from "react";
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { GroupPaymentProps, MemberPaymentProps, MemberProps } from './interfaces';
import { Box, Card, Chip, Divider, Icon, Menu, MenuItem, Stack, Switch } from '@mui/material';
import dateFormat, { masks } from "dateformat";
import PaidIcon from '@mui/icons-material/Paid';
import MemberPaymentCard from "./MemberPaymentCard";
import MemberPaymentCardList from "./MemberPaymentCardList";
import AppContext from "./AppContext";

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

const MemberPopup: FC<{
    handleClose: any,
    payPayment: any,
    openPayPal: any,
    member: MemberProps[any]
}> = ({
    handleClose,
    member
}) => {
    const [memberPayments ] = useState<MemberPaymentProps[]>(member.payments);
    const { user } = useContext(AppContext);

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="member-popup"
            open={!!member}
        >
            <BootstrapDialogTitle id="member-popup" onClose={handleClose}>
                <Typography variant="caption" sx={{color: (theme) => theme.palette.grey[700] , fontSize: ".75em"}}>{member.name}</Typography>
            </BootstrapDialogTitle>

            <DialogContent dividers>
                {/* Member Info */}
                <Box my={2}>
                    <Typography variant="caption" sx={{color: (theme) => theme.palette.grey[700] , fontSize: "1em"}}>
                        Email
                    </Typography>
                    <Typography variant="subtitle2" sx={{fontSize: "1.5em"}}>
                        {member.email}
                    </Typography>
                </Box>
                <Box my={2}>
                    <Typography variant="caption" sx={{color: (theme) => theme.palette.grey[700] , fontSize: "1em"}}>
                        Added on
                    </Typography>
                    <Typography variant="subtitle2" sx={{fontSize: "1.5em"}}>
                        {dateFormat(member.added_on, masks.fullDate)}    
                    </Typography>
                </Box>
                <Box my={2}>
                    <Typography variant="caption" sx={{color: (theme) => theme.palette.grey[700] , fontSize: "1em"}}>
                        Phone number
                    </Typography>
                    <Typography variant="subtitle2" sx={{fontSize: "1.5em"}}>
                        {member.phone_number || "Not provided"}  
                    </Typography>
                </Box>

                {/* Member Payments */}
                <Box>
                    <MemberPaymentCardList email={user && user.email} memberPaymentsProp={memberPayments} />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Exit
                </Button>
            </DialogActions>
        </BootstrapDialog>)
}

export default MemberPopup;