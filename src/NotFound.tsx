import { Typography } from "@mui/material";

const NotFound = ({extra=""}: {extra?: string}) => {
    return (
        <>
            <Typography variant="h1" sx={{color: "gray", fontWeight: 600, marginTop: "25vh"}} textAlign={"center"}>404</Typography>
            <Typography variant="subtitle2" textAlign={"center"}>{extra}</Typography>
        </>
    );
}

export default NotFound;