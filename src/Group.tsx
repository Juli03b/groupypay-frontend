import { Add } from "@mui/icons-material";
import { Container, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddMember from "./AddMember";
import AddPayment from "./AddPayment";
import GroupypayApi from "./GroupypayApi";
import { GroupPaymentProps, GroupProps, MemberPaymentProps, MemberProps } from "./interfaces";
import MembersTable from "./MembersTable";
import PaymentsTable from "./PaymentsTable";

const Group = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState<GroupProps | undefined>();
    const [members, setMembers] = useState<MemberProps[]>([]);
    const [payments, setPayments] = useState<GroupPaymentProps[]>([]);
    const [addMember, setAddMember] = useState<boolean>(false);
    const [addPayment, setAddPayment] = useState<boolean>(false);

    const handleMemberSubmit = async (memberFromForm: MemberProps) => {
        if (!groupId) return;
        const {member} = await GroupypayApi.addMember(groupId, memberFromForm);
        setMembers(members => [...members, member])
    }

    const handlePaymentSubmit = async (paymentFromForm: GroupPaymentProps, memberPayments: MemberPaymentProps[]) => {
        if (!groupId) return;
        const groupPayment = await GroupypayApi.addPayment(groupId, paymentFromForm, memberPayments);
        setPayments(payments => [...payments, groupPayment])
    }

    useEffect(() => {
        if (!groupId) return;
        const groupRes = async () => {
            const group: GroupProps = await GroupypayApi.getGroup(groupId);
            setMembers(group.members)
            setPayments(group.payments)
            setGroup(group);
        }
        groupRes()

    }, [groupId])

    return (
            group ? (
                <Container sx={{marginTop: "15vh"}}>
                    <Box sx={{marginBottom: "10vh"}}>
                        <Typography variant="h1">{group?.name}</Typography>
                        <Typography variant="caption">{group?.description}</Typography>    
                    </Box>
                    {
                        members && (
                            <>
                                <h1><b>Add expense</b></h1><IconButton aria-label="add-member" onClick={() => setAddPayment(true)} ><Add/></IconButton>
                                {addPayment && <AddPayment handleClose={() => setAddPayment(false)} open={addPayment} addPayment={handlePaymentSubmit} members={members} />}
                            </>)
                    }
                    <PaymentsTable payments={payments} groupId={groupId} />
                    <h1><b>Members</b></h1><IconButton aria-label="add-member" onClick={() => setAddMember(true)} ><Add/></IconButton>
                    {addMember && <AddMember handleClose={() => setAddMember(false)} open={addMember} addMember={handleMemberSubmit} />}
                    <MembersTable members={members} />
                </Container>
            ) :
            (
                <p>Hellow</p>
            )
    )
}

export default Group;