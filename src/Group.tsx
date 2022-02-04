import { Add, ConstructionOutlined } from "@mui/icons-material";
import { Backdrop, CircularProgress, Container, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import AddMember from "./AddMember";
import AddPayment from "./AddPayment";
import GroupypayApi from "./GroupypayApi";
import { GroupPaymentProps, GroupProps, MemberPaymentProps, MemberProps } from "./interfaces";
import MembersTable from "./MembersTable";
import PaymentsTable from "./PaymentsTable";
import { useAlert } from "./hooks";
import PaymentPopup from "./PaymentPopup";
import PayPal from "./PayPal";
import Loading from "./Loading";
import MemberPopup from "./MemberPopup";
import AppContext from "./AppContext";
import NotFound from "./NotFound";

const Group = () => {
    const alert = useAlert();
    const { email, groupId } = useParams();
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState<GroupProps | undefined>();
    const [members, setMembers] = useState<MemberProps>({});
    const [payments, setPayments] = useState<GroupPaymentProps[]>([]);
    const [addMember, setAddMember] = useState<boolean>(false);
    const [addPayment, setAddPayment] = useState<boolean>(false);
    const [paymentOpen, setPaymentOpen] = useState<GroupPaymentProps | undefined>(undefined);
    const [memberOpen, setMemberOpen] = useState<any | undefined>(undefined);
    const [payPal, setPaypal] = useState<undefined | {payment: any, memberPayee: any, memberPaying: any, memberPayment: any, setIconGreen: any}>(undefined);

    const handleMemberSubmit = async (memberFromForm: MemberProps) => {
        if (!groupId || !email) return;
        const {member} = await GroupypayApi.addMember(email, groupId, memberFromForm);

        setMembers((members) => ({...members, [member.id]: member}));
    }

    const handlePaymentSubmit = async (paymentFromForm: GroupPaymentProps, memberPayments: MemberPaymentProps[], memberPaid: number) => {
        if (!groupId || !email) return;
        try {
            const payment = await GroupypayApi.addPayment(email, groupId, paymentFromForm, memberPayments, memberPaid);
            setPayments(payments => [...payments, payment])
            
          } catch (error: any) {
            alert(error, "error")
          }
    }

    const payPayment = async (groupPaymentId: number, memberId: number, setMemberPayments: any) => {
        if (!email) return;
        const message = await GroupypayApi.payPayment(email, groupId, groupPaymentId, memberId);
        alert(message, "success");
        setMemberPayments();
    }

    useEffect(() => {
        if (!groupId || !email) return;
        const groupRes = async () => {
            setLoading(true);
            try {
                const group: GroupProps = await GroupypayApi.getGroup(email, groupId);

                setMembers(group.members)
                setPayments(group.payments)
                setGroup(group);
            } catch (error) {
                
            } finally {
                setLoading(false);
            }
            
        }
        groupRes()

    }, [groupId])

    return (
        <>
        {loading ? <Loading /> : (
            group ? (
                <>
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
                                return prevPayment + parseFloat(currentPayment.total_amount);
                            }, 0)}
                        </Typography>
                    </Box>

                    <hr />

                    {/* Payments */}
                    {
                        (members && !!(Object.keys(members).length)) && (
                            <Box sx={{marginY: "2.5vh"}}>
                                <Typography variant="h3" sx={{display: "inline"}} gutterBottom>Add expense</Typography>
                                <IconButton aria-label="add-member" onClick={() => setAddPayment(true)}><Add sx={{marginBottom: "16px"}}/></IconButton>
                                {!!payPal && (
                                    <PayPal 
                                        open={!!payPal} 
                                        handleClose={() => setPaypal(undefined)}
                                        groupPayment={payPal.payment}
                                        memberPayment={payPal.memberPayment}
                                        memberPayer={payPal.memberPaying}
                                        memberPayee={payPal.memberPayee} 
                                        setIconGreen={payPal.setIconGreen}
                                    />
                                )}
                                {addPayment && (
                                    <AddPayment 
                                        handleClose={() => setAddPayment(false)} 
                                        open={addPayment} 
                                        addPayment={handlePaymentSubmit} 
                                        members={members} 
                                    />
                                )}
                                {paymentOpen && (
                                    <PaymentPopup 
                                        handleClose={() => setPaymentOpen(undefined)} 
                                        payPayment={payPayment}
                                        payment={paymentOpen}
                                        members={members}
                                        openPayPal={(payment: GroupPaymentProps, memberPayment: MemberPaymentProps, memberPayee: any, memberPaying: any, setIconGreen: any) => {
                                            setPaypal({payment, memberPayee, memberPaying, memberPayment , setIconGreen});
                                        }}
                                    />
                                )}
                                <PaymentsTable payments={payments} onClick={(groupPayment: GroupPaymentProps) => {
                                    setPaymentOpen(groupPayment)
                                }
                                }/>
                            </Box>
                    )}
                    {/* Members */}
                    <Box>
                        <Typography variant="h3" sx={{display: "inline"}} gutterBottom>Members</Typography>
                        <IconButton aria-label="add-member" onClick={() => setAddMember(true)}><Add sx={{marginBottom: "16px"}}/></IconButton>
                        {memberOpen && (
                            <MemberPopup 
                                handleClose={() => setMemberOpen(undefined)}
                                payPayment={payPayment}
                                member={memberOpen}
                                openPayPal={(payment: GroupPaymentProps, memberPayment: MemberPaymentProps, memberPayee: any, memberPaying: any, setIconGreen: any) => {
                                    setPaypal({payment, memberPayee, memberPaying, memberPayment , setIconGreen});
                                }}
                            />
                        )}
                        {addMember && <AddMember handleClose={() => setAddMember(false)} open={addMember} addMember={handleMemberSubmit} />}
                        {(members && !!Object.keys(members).length) && (
                            <MembersTable members={members} onClick={(member: MemberProps) => {
                                console.log("MEMMMEMMEBRRR!!!!", member)
                                setMemberOpen(member)
                            }} /> 
                        )}
                    </Box>
                </Container>
                </>
            ) :
            (
                <NotFound />
        ))}
        </>
    )
}

export default Group;