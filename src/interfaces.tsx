export interface UserCreateProps {
    name: string,
    email: string,
    phoneNumber?: string,
    password: string
}
export interface UserSignInProps {
    email: string,
    password: string
}
export interface UserPatchProps {
    name: string,
    email: string,
    phoneNumber?: string,
    password: string
}
export interface UserTokenProps {
    name: string,
    email: string,
    groups?: GroupProps[],
    phoneNumber?: string,
}
export interface MemberProps {
    [id: number | string] : {
        id: number,
        name: string,
        email: string,
        phone_number: string,
        payments: MemberPaymentProps[],
        added_on: string
    }
}
export interface GroupPaymentProps {
    id: number,
    name: string,
    total_amount: string,
    member_payments?: MemberPaymentProps[],
    member_id: number,
    created_on: string

}
// member_id -> member payment amount
export interface MemberPaymentProps {
    member_id: number,
    amount: number,
    paid: boolean,
    group_payment: GroupPaymentProps,
    
}

export interface GroupProps {
    id: number,
    name: string,
    description: string,
    members: MemberProps,
    payments: GroupPaymentProps[]
}
export interface GroupCreateProps {
    name: string,
    description: string,
}