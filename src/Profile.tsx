import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import GroupypayApi from "./GroupypayApi";
import { useParams } from "react-router";
import Loading from "./Loading";
import { GroupProps, UserTokenProps } from "./interfaces";
import NotFound from "./NotFound";
import GroupsTable from "./GroupsTable";

const Profile = () => {
    const [user, setUser] = useState<UserTokenProps | undefined | false>(undefined);
    const [groups, setGroups] = useState<GroupProps[] | undefined>();
    const { email } = useParams();

    useEffect(() => {
        if (email) {
            const getUser = async () => {
                try {
                    const user = await GroupypayApi.getUser(email);
                    if (user && user?.groups) {
                        setGroups(user.groups);
                    }
                    setUser(user);
                } catch (error: any) {
                    setUser(false);
                }
            }
            
            getUser();
        }
        
    }, []);


    if (user){
        return (
            <Grid      
                container
                alignItems={"center"}
                justifyContent={"space-around"}
                minHeight={"70vh"}
                marginY={"5vh"}
                spacing={2}
            >
                <Grid item xs={6} xl={4}>
                    <Typography variant="h3" textAlign={"center"}>{user.name}</Typography>
                </Grid>

                <Grid item xs={12} xl={4} textAlign={"center"}>
                        <Typography variant="h4">{user.email}</Typography>
                        <Typography variant="h4">3233232</Typography>
                </Grid>
                {!!groups && (
                    <Grid item xs={12} textAlign={"center"}>
                        <GroupsTable groups={groups} email={user.email} />
                    </Grid>
                )}
            </Grid>
        )
    }else if(user == undefined){
        return (<Loading />)
    }else{
        return (<NotFound extra="User not found" />)
    }
    
};

export default Profile;