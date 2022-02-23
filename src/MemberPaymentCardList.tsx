import { Menu, MenuItem, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import GroupypayApi from "./GroupypayApi";
import { useAlert } from "./hooks";
import { GroupPaymentProps, MemberPaymentProps } from "./interfaces";
import MemberPaymentCard from "./MemberPaymentCard";
import PayPal from "./PayPal";

const MemberPaymentCardList: FC<{email?: string , memberPaymentsProp: MemberPaymentProps[]}> = ({memberPaymentsProp, email=undefined}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuInfo, setMenuInfo] = useState<undefined | any>();
    const [memberPayments, setMemberPayments] = useState<undefined | MemberPaymentProps[]>(memberPaymentsProp);
    const alert = useAlert();
    const [payPal, setPaypal] = useState<undefined | {payment: any, memberPayee: any, memberPayment: any, setIconGreen: any}>(undefined);
    const open = Boolean(anchorEl);

    const payPayment = async (groupId: number, groupPaymentId: number, memberId: number, setMemberPayments: any) => {
        if (!email) return;
        const message = await GroupypayApi.payPayment(email, groupId, groupPaymentId, memberId);
        alert(message + " " +memberId, "success");
        setMemberPayments();
    }
    const openPayPal = (payment: GroupPaymentProps, memberPayment: MemberPaymentProps, memberPayee: any, setIconGreen: any) => {
        setPaypal({payment, memberPayee, memberPayment, setIconGreen});
    }
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>, memberPayment: MemberPaymentProps) => {
        setAnchorEl(event.currentTarget);
        setMenuInfo({memberPayment});
    };
    const setIconGreen = (memberPayment: MemberPaymentProps) => {
        payPayment(memberPayment.group_payment.group_id, memberPayment.group_payment.id, memberPayment.member_id, () => {
            setMemberPayments((payments: any) => {
                payments.forEach((payment: MemberPaymentProps) => {
                    if (payment.member_id == memberPayment.member_id) {
                        payment.paid = true;
                    }
                });
                return [...payments];
            });
        });
    }

    useEffect(() => {
        setMemberPayments(memberPaymentsProp);
    }, [memberPaymentsProp])

    return (
        <>
            {   !!payPal && (
                    <PayPal 
                        open={!!payPal} 
                        handleClose={() => setPaypal(undefined)}
                        groupPayment={payPal.payment}
                        memberPayment={payPal.memberPayment}
                        memberPayee={payPal.memberPayee} 
                        setIconGreen={payPal.setIconGreen}
                    />
            )}
            {   menuInfo && (
                    <Menu
                        id={`menu-${menuInfo.memberId}`}
                        anchorEl={anchorEl}
                        open={open} 
                        onClose={handleCloseMenu}
                        MenuListProps={{
                            'aria-labelledby': `paid-button-${menuInfo.memberId}`,
                        }}
                    >
                        <MenuItem 
                            onClick={() => {
                                handleCloseMenu();
                                setIconGreen(menuInfo.memberPayment);
                            }}
                        >
                            <Typography variant="subtitle2">
                                Mark paid
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleCloseMenu();
                                openPayPal(menuInfo.memberPayment.group_payment, menuInfo.memberPayment, menuInfo.group_payment.member, payPayment)
                                // openPayPal(payment, menuInfo.memberPayment, members.memberId, menuInfo.member, () => {
                                //     setIconGreen(payment.id, menuInfo.memberId);
                                // });
                            }}        
                        >
                            <Typography variant="subtitle2">
                                Pay with
                            </Typography>
                            <span className="material-icons">paypal</span>
                        </MenuItem>
                    </Menu>
                )
            }   
            {   !!memberPaymentsProp && (
                    memberPaymentsProp.map((memberPayment) => {
                        return <MemberPaymentCard memberPayment={memberPayment} handleOpen={handleOpen} open={open} />
                    })
                )
            }
        </>

    )
}

export default MemberPaymentCardList;