import { Box, Button, Grid, styled, Typography } from "@mui/material";
import { FC } from "react";

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
        >
            <Grid item xs={12} xl={6}>
                <StyledHeader variant="h1">Make your <b style={{fontSize: "70%", display:"block"}}>groupypayments</b> easier!</StyledHeader>
            </Grid>
            <Grid item xs={12} xl={4}>
            <Box textAlign={"center"}>
                <StyledHeader variant="h3">Organize and divvy up group payments quickly</StyledHeader>
                    <Button color="primary" variant="outlined" href="/sign-up">Get started now</Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Home;