import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { MemberProps } from './interfaces';
import { FC } from 'react';
import { makeStyles } from "@mui/styles";
import { Avatar, Badge, CardActionArea, Chip, Divider, Link, Stack, Switch } from '@mui/material';

// Group card
const MemberCard: FC<{member: MemberProps[any], onClick: any}> = ({member, onClick}) => {
    return (
            <Card sx={{minWidth: 150, display: "inline-block", marginX: ".5vw"}}>
                <CardActionArea onClick={() => onClick(member)}>

                    <Box sx={{ p: 2, display: 'flex' }}>
                        <Stack spacing={0.5}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: 15}}>
                                Member
                            </Typography>
                            <Divider />
                            <Typography fontWeight={700} sx={{fontSize: 30}}>{member.name}</Typography>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: 10}}>
                                    Phone number
                                </Typography>
                                <Typography variant="subtitle2">{member.phone_number || "Not provided"}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: 10}}>
                                    Email
                                </Typography>
                                <Typography variant="subtitle2">{member.email}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: 10}}>
                                    Payments
                                </Typography>
                                <Typography variant="subtitle2">{member.payments.length}</Typography>
                            </Box>
                            {/* <Chip variant="outlined" label={} /> */}
                        </Stack>
                    </Box>

                </CardActionArea>
            </Card>
    );
}

export default MemberCard;