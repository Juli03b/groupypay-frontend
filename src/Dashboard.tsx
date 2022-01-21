import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { FC } from "react";
import GroupsTable from "./GroupsTable";

const Dashboard: FC = () => {
    return (
        <Container sx={{marginTop: "20vh"}}>
            <h1><b>Groups</b></h1>
            <GroupsTable />
        </Container>
    )

}

export default Dashboard;