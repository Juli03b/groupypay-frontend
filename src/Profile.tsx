import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import GroupypayApi from "./GroupypayApi";
import { useParams } from "react-router";
import Loading from "./Loading";
import { UserTokenProps } from "./interfaces";
import NotFound from "./NotFound";

const Profile = ({userContext}: {userContext: UserTokenProps | undefined}) => {
    const [user, setUser] = useState<UserTokenProps | undefined | false>(undefined);
    const { email } = useParams();

    useEffect(() => {
        if (userContext?.email == email) {
            setUser(userContext);
        }else if ((!user) && email) {

            const getUser = async () => {
                try {
                    const user = await GroupypayApi.getUser(email);
                    setUser(user);
                } catch (error: any) {
                    setUser(false);

                }
            }
            
            getUser();
        }else {
            setUser(false);
        }
    }, [user]);



    if (user){
        return (
            <Grid      
                container
                alignItems={"center"}
                justifyContent={"space-around"}
                minHeight={"70vh"}
                spacing={2}
            >
                <Grid item xs={12} xl={6}>
                    <Typography variant="h3">{user.name}</Typography>
                </Grid>
                <Grid item xs={12} xl={4}>
                    <Box textAlign={"center"}>
                        <Typography variant="h3">Organize and divvy up group payments quickly</Typography>
                    </Box>
                </Grid>
            </Grid>
        )
    }else if(user == undefined){
        return (<Loading />)
    }else{
        return (<NotFound extra="User not found" />)
    }
    
};

export default Profile;