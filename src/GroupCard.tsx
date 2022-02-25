import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { GroupProps } from './interfaces';
import { FC } from 'react';
import { CardActionArea, Chip, Divider, Link, Stack, Switch } from '@mui/material';
import { Link as rrdLink } from 'react-router-dom';

// Group card
const GroupCard: FC<{group: GroupProps, email: string}> = ({group, email}) => {
    return (
        <Link component={rrdLink} to={`/users/${email}/groups/${group.id}`}>
            <Card sx={{minWidth: 150, display: "inline-block", marginX: ".5vw"}}>
                <CardActionArea >

                    <Box sx={{ p: 2, display: 'flex' }}>
                        <Stack spacing={0.5}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: 15}}>
                                Group
                            </Typography>
                            <Divider variant="fullWidth" sx={{ marginLeft: "-30px", marginRight: "-16px"}} />
                            <Typography fontWeight={700} sx={{fontSize: 30}}>{group.name}</Typography>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: 10}}>
                                    Members
                                </Typography>
                                <Typography variant="subtitle2">{Object.keys(group.members).length}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" sx={{fontSize: 10}}>
                                    Payments
                                </Typography>
                                <Typography variant="subtitle2">{group.payments.length}</Typography>                            
                            </Box>

                            <Chip
                                label={<Typography variant="subtitle2" fontSize={15}>{group.user.name}</Typography>}
                                component="a"
                                href={`/profile/${group.user.email}`}
                                variant="outlined"
                                clickable
                            />
                        </Stack>
                    </Box>

                </CardActionArea>
            </Card>
        </Link>
    );
}

export default GroupCard;