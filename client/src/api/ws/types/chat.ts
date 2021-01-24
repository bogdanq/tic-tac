import { Document } from "mongoose";
import { Methods, Type, CommonResponse } from "./ws";

export type Chat = {
  userId: string;
  text: string;
} & Document;

export type GetMessagesResponse = {
  method: Methods.chatMessages;
  type: Type.default;
  payload: { payload: { messages: Chat[] }; params: null };
} & CommonResponse;

export type GetMessagesParams = {
  method: Methods.chatMessages;
  payload: null;
  reqId: string;
};

export type SendMessagesResponse = {
  method: Methods.chatSendMessage;
  type: Type;
  payload: {
    payload: { message: Chat };
    params: { message: string; userId: string };
  };
} & CommonResponse;

export type SendMessagesParams = {
  method: Methods.chatSendMessage;
  payload: { message: string };
  reqId: string;
};
