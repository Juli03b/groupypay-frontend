import axios, { AxiosRequestHeaders, AxiosResponse, Method } from "axios";
import jwtDecode from "jwt-decode";
import { GroupCreateProps, GroupPaymentProps, GroupProps, MemberPaymentProps, MemberProps, UserCreateProps, UserPatchProps, UserSignInProps, UserTokenProps } from "./interfaces";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

const errorByPGCode: any =  {
  "23505": "User under that email or phone number already exists",
}

export default class GroupypayApi {
  static token: string | null;
  static user: UserTokenProps | null;
  

  static async request(endpoint: string, data = {}, method: Method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}${endpoint}`;
    const headers: AxiosRequestHeaders | undefined = this.token ? { Authorization: `Bearer ${this.token}`} : undefined;
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message: string = err.response.data.error.pgcode ? errorByPGCode[err.response.data.error.pgcode] : err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  
  // User Routes
  static async signUp({ name, email, password, phoneNumber=undefined }: UserCreateProps) {
    const response = await this.request("/auth/sign-up", {name, email, password, phoneNumber}, "POST");
    return response
  }
  static async signIn({ email, password }: UserSignInProps) {
    const response: any = await this.request("/auth/token", {email, password}, "POST");
    return response
  }
  static async patchUser(email: string, user: UserPatchProps) {

    const response: any = await this.request(`/users/${email}`, user, "POST");
    return response.data
  }
  static async getUser(email: string) {
    // Get a user using their email
    const response = await this.request(`/users/${email}`);
    return response
  }
  static async searchUsers(name: string) {
    // Search for users
    const response = await this.request(`/users/`, {name});
    return response
  }

  static async getUserGroups(email: string) {
    // Get a user's groups
    const response = await this.request(`/users/${email}/groups`);
    return response
  }

  // Group Routes

  static async makeGroup(email: string, group: GroupCreateProps) {
    // Make a group for a user
    const response = await this.request(`/users/${email}/groups`, group, "POST");
    return response
  }
  static async getGroup(email: string, id: string, secretCode: string | null) {
    // Get a group using an id
    const response = await this.request(`/users/${email}/groups/${id}`, {secret_code: secretCode});
    return response
  }
  static async addMember(userEmail: string, groupId: string, {name, email, phone_number}: MemberProps) {
    const response = await this.request(`/users/${userEmail}/groups/${groupId}/members`, {name, email, ...{phone_number: phone_number || ""} }, "POST");
    return response
  }
  static async addPayment(email: string, groupId: string, {name, total_amount}: GroupPaymentProps, memberPayments: MemberPaymentProps[], memberPaid: number) {
    const response = await this.request(`/users/${email}/groups/${groupId}/payments`, {name, total_amount, member_payments: memberPayments, member_id: memberPaid}, "POST");

    return response
  }
  static async getPayment(email: string, groupId: any, groupPaymentId: any) {
    const response = await this.request(`/users/${email}/groups/${groupId}/payments/${groupPaymentId}`);
    return response
  }

  static async payPayment(userEmail: string, groupId: any, groupPaymentId: any, memberId: any) {
    const response = await this.request(`/users/${userEmail}/groups/${groupId}/payments/${groupPaymentId}/member-payments/${memberId}/pay`, undefined, "POST")
    return response
  }
  
}

GroupypayApi.token = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token") || "");
GroupypayApi.user = GroupypayApi.token ? jwtDecode<any>(GroupypayApi.token).sub : null;