export interface UserCreateProps {
    name: string,
    email: string,
    phoneNumber: string,
    password: string
}
export interface UserSignInProps {
    email: string,
    password: string
}
export interface UserPatchProps {
    name: string,
    email: string,
    phoneNumber: string,
    password: string
}