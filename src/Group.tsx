import { Add } from "@mui/icons-material";
import { Card, CardActionArea, Container, Divider, IconButton, Input, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import AddMember from "./AddMember";
import AddPayment from "./AddPayment";
import GroupypayApi from "./GroupypayApi";
import { GroupPaymentProps, GroupProps, MemberPaymentProps, MemberProps } from "./interfaces";
import { useAlert } from "./hooks";
import PaymentPopup from "./PaymentPopup";
import PayPal from "./PayPal";
import Loading from "./Loading";
import MemberPopup from "./MemberPopup";
import AppContext from "./AppContext";
import NotFound from "./NotFound";
import * as yup from "yup";
import { useFormik } from "formik";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MemberCard from "./MemberCard";
import GroupPaymentCard from "./GroupPaymentCard";
import CustomHeader from "./CustomHeader";

const secretCode = yup.string().max(100, "Secret code can be no longer than 100 characters");
const secretCodeValidationSchema = yup.object({ secretCode });

const Group = () => {
    const alert = useAlert();
    const { email, groupId } = useParams();
    const { user } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState<GroupProps | undefined>();
    const [members, setMembers] = useState<MemberProps>({});
    const [payments, setPayments] = useState<GroupPaymentProps[]>([]);
    const [addMember, setAddMember] = useState<boolean>(false);
    const [addPayment, setAddPayment] = useState<boolean>(false);
    const [paymentOpen, setPaymentOpen] = useState<GroupPaymentProps | undefined>(undefined);
    const [memberOpen, setMemberOpen] = useState<any | undefined>(undefined);
    const [payPal, setPaypal] = useState<undefined | {payment: any, memberPayee: any, memberPaying: any, memberPayment: any, setIconGreen: any}>(undefined);
    const [secretCode, setSecretCode] = useState<undefined | null | string>(); // undefined = not set yet | null = no password | string = password 

    const handleMemberSubmit = async (memberFromForm: MemberProps) => {
        if (!groupId || !email) return;
        console.log("MEMMEBR", memberFromForm)
        const {member, warning} = await GroupypayApi.addMember(email, groupId, memberFromForm);
        if (warning && warning.length){
            alert(warning, "warning")
        }
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
        alert(message + " " + memberId, "success");
        setMemberPayments();
    }
    const formik = useFormik({
        initialValues: {secretCode: ""},
        validationSchema: secretCodeValidationSchema,
        onSubmit: async ({secretCode}: {secretCode: string}) => {
            setSecretCode(!secretCode || !secretCode.length ? null : secretCode);
        }
    });

    useEffect(() => {
        setSecretCode(user?.email === email ? null : undefined)
        if (!groupId || !email || secretCode === undefined) return;

        const groupRes = async () => {
            setLoading(true);
            try {
                const group: GroupProps = await GroupypayApi.getGroup(email, groupId, secretCode);

                setMembers(group.members);
                setPayments(group.payments)
                setGroup(group);
            } catch (error: any) {
                if (Array.isArray(error)){
                    [error] = error;
                    alert(error, "error");
                    setSecretCode(undefined)
                }
            } finally {
                setLoading(false);
            }
            
        }
        groupRes()

    }, [groupId, secretCode, user, email]);

    if (secretCode === undefined) {
        return (
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    error={formik.touched.secretCode && !!formik.errors.secretCode}
                    value={formik.values.secretCode}
                    helperText={formik.touched.secretCode && formik.errors.secretCode}
                    onChange={formik.handleChange}
                    id="secretCode"
                    name="secretCode"
                    label="Secret code"
                    type="text"
                    variant="filled"
                    InputProps={{endAdornment: <ArrowForwardIosIcon />}}
                    sx={{
                        marginTop: "35vh"
                    }}
                    fullWidth
                    autoFocus
                />
            </form>
        );
    }
    if (loading) return <Loading /> ;
    return (
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
                {/* Payments */}
                {
                    (members && !!(Object.keys(members).length)) && (
                        <Box sx={{marginY: "2.5vh"}}>
                            <CustomHeader text={"Payments"} />
                            {!!payPal && (
                                <PayPal 
                                    open={!!payPal} 
                                    handleClose={() => setPaypal(undefined)}
                                    groupPayment={payPal.payment}
                                    memberPayment={payPal.memberPayment}
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
                                    openPayPal={(payment: GroupPaymentProps, memberPayment: MemberPaymentProps, memberPaying: any, setIconGreen: any) => {
                                        setPaypal({payment, memberPayee: payment.member, memberPaying, memberPayment , setIconGreen});
                                    }}
                                />
                            )}
                            {
                                payments.map(payment => (
                                    <GroupPaymentCard
                                        payment={payment}
                                        onClick={(groupPayment: GroupPaymentProps) => setPaymentOpen(groupPayment)}
                                        key={payment.id} 
                                    />
                                )
                                ).concat([(
                                    <Card sx={{height: 168, minWidth: 150, display: "inline-block", marginX: ".5vw"}} key="add-payment-card">
                                        <CardActionArea sx={{height: "100%"}} onClick={() => setAddPayment(true)}>
                                            <Add sx={{
                                                position: "absolute",
                                                left: "55px",
                                                bottom: "65px"
                                            }} />
        
                                        </CardActionArea>
                                    </Card>
                                )])
                            }
                            
                        </Box>
                )}
                {/* Members */}
                <Box>
                    <CustomHeader text={"Members"} />
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
                    {
                        Object.values(members).map((member) => {
                            console.log("MEMBER:", member)
                            return <MemberCard member={member} key={member.id} onClick={(member: MemberProps) => {
                                setMemberOpen(member)
                            }}  />
                        }).concat([(
                            <Card sx={{height: 286, minWidth: 150, display: "inline-block", marginX: ".5vw"}} key="add-member-card">
                                <CardActionArea sx={{height: "100%"}} onClick={() => setAddMember(true)}>
                                    <Add sx={{
                                        position: "absolute",
                                        left: "55px",
                                        bottom: "120px"
                                    }} />

                                </CardActionArea>
                            </Card>
                        )])
                    }
                </Box>
            </Container>
            </>
        ) :
        (
            <NotFound />
        ));
}

export default Group;