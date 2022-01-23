import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GroupypayApi from "./GroupypayApi";
import { GroupProps } from "./interfaces";
import MembersTable from "./MembersTable";

const Group = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState<GroupProps | undefined>();
    
    useEffect(() => {
        if (!groupId) return;
        const groupRes = async () => {
            const group = await GroupypayApi.getGroup(groupId);
            console.log("GROUP RES", group)
            setGroup(group);
        }
        groupRes()
        console.log("GROUP:", group)
    }, [groupId])

    return (
        <>
            <MembersTable members={group?.members} />
            {console.log(group?.members)}
            <p>{group?.name}</p>
            <p>{group?.description}</p>    
        </>
        
    )
}

export default Group;