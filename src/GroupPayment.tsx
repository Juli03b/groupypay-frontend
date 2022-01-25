import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GroupypayApi from "./GroupypayApi";
import { GroupPaymentProps } from "./interfaces";
import MemberPaymentsTable from "./MemberPaymentsTable";

const GroupPayment = () => {
    const { groupId, paymentId } = useParams();
    const [payment, setPayment] = useState<GroupPaymentProps | undefined>(undefined);

    useEffect(() => {
        const getAndSetPayment = async () => {
            const paymentRes = await GroupypayApi.getPayment(groupId, paymentId)
            setPayment(paymentRes)
            console.log("PAYMENT", paymentRes)
        }
        getAndSetPayment();
    }, [groupId, paymentId]);

    return (
        payment ? (
        <>
            <h1>{payment.name}</h1>
            <MemberPaymentsTable payments={payment.member_payments} />
        </>
        )
        :
        (<p>HEllo</p>)
    )
}

export default GroupPayment;