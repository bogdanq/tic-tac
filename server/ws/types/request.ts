import * as express from "express";
import { Methods, Session } from "./default";
// import { GetMessagesParams, SendMessagesParams } from "./chat";

export type DefaultRequest = {
  method: Methods;
  roomId?: Methods;
  payload: object | null;
  reqId: string;
  unsubscribe?: boolean;
};

export type WsRequest = DefaultRequest;
// export type WsRequest = (GetMessagesParams | SendMessagesParams) &

export type Request = express.Request & { data: { session: Session } };
