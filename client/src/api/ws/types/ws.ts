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
  getSession = "session.get",
  createSession = "session.create",
  entrySession = "session.entry",

  chatMessages = "chat.messages",
  chatSendMessage = "chat.send.message",
}

export enum SubscriptionMethods {
  chatMessages = "chat.messages",
}

export type DefaultResponse = {
  method: Methods | SubscriptionMethods;
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

export type wsRequest = SendMessagesParams | GetMessagesParams;

export type ErrorResponse = {
  payload: null;
  error: string;
} & Omit<Response, "payload" | "type">;

export type wsResponse =
  | ErrorResponse
  | GetMessagesResponse
  | SendMessagesResponse
  | DefaultEventResponse;
