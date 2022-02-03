import { Dialog, DialogTitle, IconButton, styled } from "@mui/material";
import { FC, useState } from "react";
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { GroupPaymentProps, MemberPaymentProps, MemberProps } from './interfaces';
import { Box, Card, Chip, Divider, Icon, Menu, MenuItem, Stack, Switch } from '@mui/material';
import dateFormat, { masks } from "dateformat";
import PaidIcon from '@mui/icons-material/Paid';

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
    payPayment,
    openPayPal,
    member
}) => {
    const [memberPayments, setMemberPayments] = useState<MemberPaymentProps[]>(member.payments);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const setIconGreen = (paymentId: number, memberId: number, idx: number) => {
        payPayment(paymentId, memberId, () => {
            setMemberPayments((payments: any) => {
                payments[idx].paid = true
                return [...payments]
            })
        })
    }
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
                    {memberPayments.map((memberPayment: any, idx: number) => {
                        // const member = members[memberPayment.member_id]
                        console.log("MEMMMMPAY", memberPayment)
                        return (
                            <Card 
                                key={memberPayment.member_id} 
                                sx={{my: "1vh"}} 
                            >
                                <Box sx={{ p: 2, display: 'flex' }}>
                                    <Stack spacing={0.5}>
                                        <Typography fontWeight={500} variant="body1">{member.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ${memberPayment.amount}
                                        </Typography>
                                    </Stack>
                                    <IconButton 
                                        onClick={!memberPayment.paid ? handleClick : () => ""} 
                                        id={`paid-button-${memberPayment.member_id}`} 
                                        sx={{
                                            right: "2vw",
                                            position: "absolute",
                                            bottom: "9.5vh"
                                        }}
                                    >
                                        <PaidIcon 
                                            sx={{color: (memberPayment.paid || memberPayment.member_id == member.id) ? "green" : "red"}} 
                                        />
                                    </IconButton>
                                    <Menu
                                        id={`menu-${memberPayment.member_id}`}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleCloseMenu}
                                        MenuListProps={{
                                            'aria-labelledby': `paid-button-${memberPayment.member_id}`,
                                        }}
                                        // sx={{marginRight: "-35vw"}}
                                    >
                                        <MenuItem onClick={() => (handleCloseMenu(), setIconGreen(0, memberPayment.member_id, idx))}>
                                            <Typography variant="subtitle2">
                                                Mark paid
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => (handleCloseMenu(), openPayPal(memberPayment.member_id, memberPayment, member, () => setIconGreen(memberPayment.id, memberPayment.member_id, idx)))}>
                                            <Typography variant="subtitle2">
                                                Pay with
                                            </Typography>
                                            <span className="material-icons">paypal</span>
                                        </MenuItem>
                                    </Menu>
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

export default MemberPopup;