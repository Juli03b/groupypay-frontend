import { Grid, styled, Typography } from "@mui/material";
import { FC } from "react";

const StyledHeader = styled(Typography)(({theme}) => ({
    padding: theme.spacing(5),
    margin: "10%",
    fontWeight: theme.typography.fontWeightLight
}));

const Home: FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <StyledHeader variant="h1">Make your <b>groupypayments</b> easier!</StyledHeader>
            </Grid>
            <Grid item xs={2}>
            </Grid>
        </Grid>
    )
}

export default Home;