import { UserCreateProps, UserPatchProps, UserSignInProps } from "./interfaces"

export const SIGN_IN_INITIAL_STATE: UserSignInProps = {
    email: "",
    password: ""
}
export const SIGN_UP_INITIAL_STATE: UserCreateProps = {
    name: "",
    email: "",
    password: "",
    phoneNumber: ""
}
export const PATCH_INITIAL_STATE: UserPatchProps = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
}