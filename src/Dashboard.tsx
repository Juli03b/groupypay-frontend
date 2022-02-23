import { Add } from "@mui/icons-material";
import { Box, Card, CardActionArea, Container, Divider, IconButton, Paper, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import GroupCard from "./GroupCard";
import GroupsTable from "./GroupsTable";
import GroupypayApi from "./GroupypayApi";
import { useAlert } from "./hooks";
import { GroupProps } from "./interfaces";
import Loading from "./Loading";
import MakeGroup from "./MakeGroup";
import MemberPaymentCard from "./MemberPaymentCard";
import MemberPaymentCardList from "./MemberPaymentCardList";

const Dashboard: FC = () => {
    const { user, signOut } = useContext(AppContext);
    const [makeGroup, setMakeGroup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [groups, setGroups] = useState<GroupProps[]>([]);
    const alert = useAlert();
    const closeMakeGroup = () => {
        setMakeGroup(false);
    }

    useEffect(() => {
        if (user?.email) {
            const getGroups = async () => {
                setLoading(true)
                try {
                    const groupsRes: GroupProps[] = await GroupypayApi.getUserGroups(user.email);
                    setGroups(groupsRes);
                        
                } catch (error: any) {
                    signOut();
                    alert(error, "error")
                }
                setLoading(false)
            }
            getGroups();
        }
    }, [user])
    
    if (loading) return <Loading />;
    return (
        user ? (
            <Container sx={{marginY: "10vh"}}>
                <Box mb="2.5vh">
                    {makeGroup && <MakeGroup handleClose={closeMakeGroup} open={makeGroup} addGroup={(group: GroupProps) => setGroups(groups => [...groups, group])} />}
                    <Typography variant="h6" sx={{display: "inline", fontSize: "2em"}} gutterBottom>Groups</Typography>
                    {/* <Paper style={{maxHeight: 500, overflow: "auto"}}> */}
                        <Box sx={{marginY: "1vh"}}>
                            {
                                groups.map((group: GroupProps) => {
                                    return <GroupCard email={user.email} group={group} key={group.id} />
                                }).concat([(
                                    <Card sx={{height: 255, minWidth: 150, display: "inline-block"}}>
                                        <CardActionArea sx={{height: "100%"}} onClick={() => setMakeGroup(true)}>
                                            <Add sx={{
                                                position: "absolute",
                                                left: "55px",
                                                bottom: "100px"
                                            }} />

                                        </CardActionArea>
                                    </Card>
                                )])
                            }
                        </Box>
                    {/* </Paper> */}
                </Box>
                {   
                    (user.owed_payments && user.owed_payments.length >= 1) && (
                        <Box>
                            <Typography variant="h6" sx={{display: "inline", fontSize: "2em"}} gutterBottom>Payments you owe</Typography>
                            <Box marginY={"1vh"}>
                                <MemberPaymentCardList email={user.email} memberPaymentsProp={user.owed_payments} />
                            </Box>
                        </Box>
                    )
                }
            </Container>
        ) :
        <p>Hello</p>
    );

}

export default Dashboard;