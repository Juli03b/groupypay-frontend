import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GroupPaymentProps, GroupProps } from './interfaces';
import { FC } from 'react';
import { makeStyles } from "@mui/styles";
import { Avatar, Badge, CardActionArea, Chip, Divider, Link, Stack, Switch } from '@mui/material';
import { Link as rrdLink } from 'react-router-dom';

// Group card
const GroupPaymentCard: FC<{payment: GroupPaymentProps, onClick: any}> = ({payment, onClick}) => {
    return (
            <Card sx={{minWidth: 150, display: "inline-block", marginX: ".5vw"}}>
                <CardActionArea onClick={() => onClick(payment)}>

                    <Box sx={{ p: 2, display: 'flex' }}>
                        <Stack spacing={0.5}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: 15}}>
                                Group payment
                            </Typography>
                            <Divider />
                            <Typography fontWeight={700} sx={{fontSize: 30}}>{payment.name}</Typography>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: 10}}>
                                        Total amount
                                </Typography>
                                <Typography variant="subtitle2">${payment.total_amount}</Typography>
                            </Box>
                        </Stack>
                    </Box>

                </CardActionArea>
            </Card>
    );
}

export default GroupPaymentCard;