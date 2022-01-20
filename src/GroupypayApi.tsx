import axios, { AxiosRequestHeaders, AxiosResponse, Method } from "axios";
import { GroupProps, UserCreateProps, UserPatchProps, UserSignInProps } from "./interfaces";

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

  static async request(endpoint: string, data = {}, method: Method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}${endpoint}`;
    const headers: AxiosRequestHeaders = { Authorization: `Bearer ${this.token}`, "Access-Control-Allow-Origin": BASE_URL};
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message: string = errorByPGCode[err.response.data.error.pgcode];
      throw Array.isArray(message) ? message : [message];
    }
  }
  
  // User Routes
  static async signUp({ name, email, password, phoneNumber=undefined }: UserCreateProps) {
    const response: AxiosResponse = await this.request("/auth/sign-up", {name, email, password, phoneNumber}, "POST");
    console.log("data from signUp", response)
    return response.data
  }
  static async signIn({ email, password }: UserSignInProps) {
    const response: any = await this.request("/auth/token", {email, password}, "POST");
    console.log("data from signIn", response)
    return response
  }
  static async patchUser(email: string, user: UserPatchProps) {
    const response: AxiosResponse = await this.request(`/users/${email}`, user, "POST");
    console.log("data from patchUser", response.data)
    return response.data
  }
  static async getUser({ email }: {email: string}) {
    const response: AxiosResponse = await this.request("/auth/token", {email}, "POST");
    console.log("data from getUser", response.data)
    return response.data
  }
  static async makeGroup({ name, description }: GroupProps) {
    const response: AxiosResponse = await this.request("/auth/token", {name, description}, "POST");
    console.log("data from makeGroup", response.data)
    return response.data
  }
}

GroupypayApi.token = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token") || "") ;