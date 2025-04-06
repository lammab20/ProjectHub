import {IUserWS} from "./IUserWS";


export type TType = "LOGIN" | "LOGOUT" | "USER_LIST";
export type TPayload = | IUserWS | string | IUserWS[];

export interface IMessage {
    type: TType;
    payload?: TPayload
}