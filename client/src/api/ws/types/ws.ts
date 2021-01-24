import {
  GetMessagesResponse,
  SendMessagesResponse,
  SendMessagesParams,
  GetMessagesParams,
} from "./chat";

export enum Type {
  default = "default",
  event = "event",
}

export enum Methods {
  getUsers = "get.users",
  userCreate = "user.create",
  userLogin = "user.login",

  chatMessages = "chat.messages",
  chatSendMessage = "chat.send.message",
}

export enum SubscriptionMethods {
  "chat.send.message" = Methods.chatSendMessage,
}

export type DefaultResponse = {
  method: Methods;
  type: Type;
  payload: {
    payload: any;
    params: any;
  };
  isSuccess: boolean;
  reqId: string;
  code: number;
  error?: string;
};

export type CommonResponse = {
  isSuccess: boolean;
  reqId: string;
  code: number;
};

export type Response = {
  method: Methods;
  type: Type;
  payload: {
    payload: object;
    params: object | null;
  } | null;
  isSuccess: boolean;
  reqId: string;
  code: number;
};

export type DefaultEventResponse = Omit<Response, "reqId">;

export type wsRequest =
  | SendMessagesParams
  | GetMessagesParams
  | {
      method: Methods;
      payload: null;
      reqId: string;
    };

export type ErrorResponse = {
  payload: null;
  error: string;
} & Omit<Response, "payload" | "type">;

export type wsResponse =
  | ErrorResponse
  | GetMessagesResponse
  | SendMessagesResponse
  | DefaultEventResponse;
