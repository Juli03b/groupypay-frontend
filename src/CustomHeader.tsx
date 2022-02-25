import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

const CustomHeader: FC<{text: string}> = ({text}) => {
    return (
        <Box>
            <Typography variant="h6" sx={{display: "inline", fontSize: "2em"}} gutterBottom>{text}</Typography>
            <Divider 
                sx={{
                    marginBottom:"1.5vh",
                    height: "5px !important",
                    width: `${35 * text.length}px`
                }} 
            
            />
        </Box>
    )
}

export default CustomHeader;