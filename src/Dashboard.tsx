import { Add } from "@mui/icons-material";
import { Box, Container, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import GroupsTable from "./GroupsTable";
import GroupypayApi from "./GroupypayApi";
import { GroupProps } from "./interfaces";
import MakeGroup from "./MakeGroup";

const Dashboard: FC = () => {
    const { user } = useContext(AppContext);
    const [makeGroup, setMakeGroup] = useState<boolean>(false);
    const [groups, setGroups] = useState<GroupProps[]>([]);
    const closeMakeGroup = () => {
        setMakeGroup(false);
    }

    useEffect(() => {
        if (user?.email) {
            const getGroups = async () => {
                const groupsRes: GroupProps[] = await GroupypayApi.getUserGroups(user.email);
                setGroups(groupsRes);
            }
            getGroups();
        }
    }, [user])

    return (
        user ? (
            <Container sx={{marginY: "10vh"}}>
                <Box>
                    <Typography variant="h3" sx={{display: "inline", fontSize: "3em"}} gutterBottom>Groups</Typography>
                    <IconButton aria-label="add-group"  onClick={() => setMakeGroup(true)} sx={{display: "inline"}}><Add sx={{marginBottom: "16px"}}/></IconButton>
                    {makeGroup && <MakeGroup handleClose={closeMakeGroup} open={makeGroup} addGroup={(group: GroupProps) => setGroups(groups => [...groups, group])} />}
                    <GroupsTable groups={groups} email={user?.email} />
                </Box>
            </Container>
        ) :
        <p>Hello</p>
    )

}

export default Dashboard;

function createData(name: string, arg1: any, description: string, id: number): any {
    throw new Error("Function not implemented.");
}
