import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GroupypayApi from "./GroupypayApi";
import { GroupPaymentProps } from "./interfaces";
import Loading from "./Loading";
import MemberPaymentsTable from "./MemberPaymentsTable";

const GroupPayment = () => {
    const { email, groupId, paymentId } = useParams();
    const [payment, setPayment] = useState<GroupPaymentProps | undefined>(undefined);

    useEffect(() => {
        if (!email) return;
        const getAndSetPayment = async () => {
            const paymentRes = await GroupypayApi.getPayment(email, groupId, paymentId)
            setPayment(paymentRes)
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
        (<Loading />)
    )
}

export default GroupPayment;