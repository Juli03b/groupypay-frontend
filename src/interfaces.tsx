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
    phoneNumber?: string,
}
export interface GroupProps {
    name: string,
    description: string,
}