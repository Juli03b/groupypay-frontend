import { Add, ConstructionOutlined } from "@mui/icons-material";
import { Backdrop, CircularProgress, Container, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddMember from "./AddMember";
import AddPayment from "./AddPayment";
import GroupypayApi from "./GroupypayApi";
import { GroupPaymentProps, GroupProps, MemberPaymentProps, MemberProps } from "./interfaces";
import MembersTable from "./MembersTable";
import PaymentsTable from "./PaymentsTable";
import { useAlert } from "./hooks";
import PaymentPopup from "./PaymentPopup";

const Group = () => {
    const alert = useAlert();
    const { groupId } = useParams();
    const [group, setGroup] = useState<GroupProps | undefined>();
    const [members, setMembers] = useState<MemberProps>({});
    const [payments, setPayments] = useState<GroupPaymentProps[]>([]);
    const [addMember, setAddMember] = useState<boolean>(false);
    const [addPayment, setAddPayment] = useState<boolean>(false);
    const [paymentOpen, setPaymentOpen] = useState<GroupPaymentProps | undefined>(undefined);

    const handleMemberSubmit = async (memberFromForm: MemberProps) => {
        if (!groupId) return;
        const {member} = await GroupypayApi.addMember(groupId, memberFromForm);

        setMembers((members) => ({...members, [member.id]: member}));
    }

    const handlePaymentSubmit = async (paymentFromForm: GroupPaymentProps, memberPayments: MemberPaymentProps[], memberPaid: number) => {
        if (!groupId) return;
        try {
            const payment = await GroupypayApi.addPayment(groupId, paymentFromForm, memberPayments, memberPaid);
            setPayments(payments => [...payments, payment])
            
          } catch (error: any) {
            alert(error, "error")
          }
    }

    const payPayment = async (groupPaymentId: number, memberId: number, setMemberPayments: any) => {
        const message = await GroupypayApi.payPayment(groupId, groupPaymentId, memberId);
        alert(message, "success");
        setMemberPayments();
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
                <Container sx={{marginY: "10vh"}}>
                    <Box sx={{marginBottom: "10vh"}}>
                        <Typography variant="h1">{group?.name}</Typography>
                        <Typography variant="caption" sx={{color: (theme) => theme.palette.grey[700] , fontSize: "1.5em"}}>
                            {group.description}
                        </Typography> 
                    </Box>
                    
                    <Box>
                        <Typography variant="h6" textAlign="left">
                            The group has spent a total of 
                        </Typography>
                        <Typography variant="overline" sx={{fontSize: "1em"}}>
                                <b>$</b>{payments.reduce((prevPayment: number, currentPayment: GroupPaymentProps) => {
                                return prevPayment + parseInt(currentPayment.total_amount);
                            }, 0)}
                        </Typography>
                    </Box>

                    <hr />

                    {/* Payments */}
                    {
                        (members && !!(Object.keys(members).length)) && (
                            <Box sx={{marginY: "2.5vh"}}>
                                <Typography variant="h3" sx={{display: "inline"}} gutterBottom>Add expense</Typography>
                                <IconButton aria-label="add-member" onClick={() => setAddPayment(true)} ><Add sx={{marginBottom: "16px"}}/></IconButton>
                                {addPayment && <AddPayment handleClose={() => setAddPayment(false)} open={addPayment} addPayment={handlePaymentSubmit} members={members} />}
                                {paymentOpen && <PaymentPopup handleClose={() => setPaymentOpen(undefined)} payPayment={payPayment} payment={paymentOpen} members={members} />}

                                <PaymentsTable payments={payments} onClick={(groupPayment: GroupPaymentProps) => {
                                    setPaymentOpen(groupPayment)
                                }
                                }/>
                            </Box>)
                    }

                    {/* Members */}
                    <Box>
                        <Typography variant="h3" sx={{display: "inline"}} gutterBottom>Members</Typography>
                        <IconButton aria-label="add-member" onClick={() => setAddMember(true)}><Add sx={{marginBottom: "16px"}}/></IconButton>
                        {addMember && <AddMember handleClose={() => setAddMember(false)} open={addMember} addMember={handleMemberSubmit} />}
                        {(members && !!Object.keys(members).length) && <MembersTable members={members} />  }
                    </Box>
                </Container>
            ) :
            (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={!!group}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )
    )
}

export default Group;