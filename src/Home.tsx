import { Box, Button, Grid, Link, styled, Typography } from "@mui/material";
import { FC } from "react";
import { Link as linkRRD } from "react-router-dom";

const StyledHeader = styled(Typography)(({theme}) => ({
    padding: theme.spacing(1),
    fontWeight: theme.typography.fontWeightLight
}));

const Home: FC = () => {
    return (
        <Grid       
            container
            alignItems={"center"}
            justifyContent={"space-around"}
            minHeight={"70vh"}
            spacing={2}
            textAlign={"center"}
        >
            <Grid item xs={12} xl={6}>
                <StyledHeader variant="h1">Make your <b style={{fontSize: "40%", display:"block"}}>groupypayments</b> easier!</StyledHeader>
            </Grid>
            <Grid item xs={12} xl={4}>
                <Box textAlign={"center"}>
                    <StyledHeader variant="h3">Organize and divvy up group payments quickly</StyledHeader>
                        <Link component={linkRRD} to="/sign-up">
                            <Button color="primary" variant="text">Get started now</Button>
                        </Link>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Home;