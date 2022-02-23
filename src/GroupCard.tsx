import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GroupProps } from './interfaces';
import { FC } from 'react';
import { makeStyles } from "@mui/styles";
import { Avatar, Badge, CardActionArea, Chip, Divider, Link, Stack, Switch } from '@mui/material';
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
                            <Divider />
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

                            <Chip variant="outlined" size="small" label={<Typography variant="subtitle2" fontSize={15}>{group.user.name}</Typography>} />
                        </Stack>
                    </Box>

                </CardActionArea>
            </Card>
        </Link>
    );
}

export default GroupCard;