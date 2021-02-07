import * as WebSocket from "ws";
import { Document } from "mongoose";
import { GetMessagesResponse, SendMessagesResponse } from "./chat";

export type Session = {
  token: string;
  userEmail: string;
} & Document;

export enum Methods {
  getSession = "session.get",
  createSession = "session.create",
  entrySession = "session.entry",

  chatMessages = "chat.messages",
  chatSendMessage = "chat.send.message",
}

export enum SubscriptionMethods {
  "chat.messages" = Methods.chatMessages,
}

export enum Type {
  default = "default",
  event = "event",
  unsubscribe = "unsubscribe",
}

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

export type WsResponse =
  | ErrorResponse
  | GetMessagesResponse
  | SendMessagesResponse
  | DefaultEventResponse;

export type ErrorResponse = {
  payload: null;
  error: string;
} & Omit<Response, "payload" | "type">;

export type ExtWebSocket = WebSocket & { isAlive: boolean };
