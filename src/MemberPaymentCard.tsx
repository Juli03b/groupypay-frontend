import { Box, Button, ButtonGroup, Card, Divider, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { MemberPaymentProps } from "./interfaces";
import PaidIcon from '@mui/icons-material/Paid';

const buttons = [<Button key="one">One</Button>, <Button key="two">two</Button>]

const MemberPaymentCard: FC<{memberPayment: MemberPaymentProps, handleOpen: any, open: boolean}> = ({memberPayment, handleOpen, open}) => {
    return (
        <Card 
            sx={{my: "1vh", paddingRight: "381px", width: "fit-content"}} 

        >
            <Box sx={{ p: 2, display: 'flex'}}>
                <Stack spacing={0.5}>
                    <Typography fontWeight={500} variant="body1">{memberPayment.group_payment.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        ${memberPayment.amount}
                    </Typography>
                </Stack>
                {/* <Box
                    sx={{
                        justifyContent: "end"
                    }}
                    >
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                    >
                        {buttons}
                    </ButtonGroup>
                </Box> */}
                
                <Button 
                    {   ...( !memberPayment.paid && {
                            onClick: (event: any) => {
                            handleOpen(event, memberPayment);
                        }
                        })
                    }
                    id={`paid-button-${memberPayment.member_id}`} 
                    sx={{
                        justifySelf: "self-start"
                    }}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}

                >
                    <PaidIcon 
                        sx={{color: memberPayment.paid ? "green" : "red"}} 
                    />
                </Button>
                
            </Box>
            <Divider />
        </Card>
    );
}

export default MemberPaymentCard;