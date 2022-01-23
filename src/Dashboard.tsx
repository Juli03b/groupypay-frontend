import { Add } from "@mui/icons-material";
import { Box, Container, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React, { FC, useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import GroupsTable from "./GroupsTable";
import GroupypayApi from "./GroupypayApi";
import { GroupProps } from "./interfaces";
import MakeGroup from "./MakeGroup";

const Dashboard: FC = () => {
    const { user } = useContext(AppContext);
    const [makeGroup, setMakeGroup] = useState<boolean>(false);
    const [groups, setGroups] = useState<GroupProps[]>([])
    const closeMakeGroup = () => {
        setMakeGroup(false)
    }

    useEffect(() => {
        if (user?.email) {
            const getGroups = async () => {
                const groupsRes: GroupProps[] = await GroupypayApi.getUserGroups(user.email);
                setGroups(groupsRes)
            }
            getGroups()
        }
    }, [user])

    return (
        user ? (
            <Container sx={{marginTop: "20vh"}}>
                {makeGroup && <MakeGroup handleClose={closeMakeGroup} open={makeGroup} addGroup={(group: GroupProps) => setGroups(groups => [...groups, group])} />}
                <h1><b>Groups</b></h1><IconButton aria-label="add-group"  onClick={() => setMakeGroup(true)} ><Add/></IconButton>
                <GroupsTable groups={groups} email={user?.email} />
            </Container>
        ) :
        <p>Hello</p>
    )

}

export default Dashboard;

function createData(name: string, arg1: any, description: string, id: number): any {
    throw new Error("Function not implemented.");
}
