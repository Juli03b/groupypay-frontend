import { Box, Button, Grid, styled, Typography } from "@mui/material";
import { FC } from "react";

const StyledHeader = styled(Typography)(({theme}) => ({
    padding: theme.spacing(2.5),
    fontWeight: theme.typography.fontWeightLight
}));

const Home: FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <StyledHeader variant="h1">Make your <b>groupypayments</b> easier!</StyledHeader>
            </Grid>
            <Grid item xs={12} md={12}>
                <Box>

                    <StyledHeader variant="h4"><b>Organize and divvy up group payments quickly</b></StyledHeader>
                    <Button color="primary" variant="contained">Get started now</Button>

                </Box>
            </Grid>
        </Grid>
    )
}

export default Home;