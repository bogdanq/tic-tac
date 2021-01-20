import * as express from "express";
import { Paths, Session, Type } from "./default";
import { CreateUsersParams } from "./user";

export type DefaultRequest = {
  method: Paths;
  type: Type;
  payload: void;
};

export type WsRequest = CreateUsersParams | DefaultRequest;

export type Request = express.Request & { data: { session: Session } };
