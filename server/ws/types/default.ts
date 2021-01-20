import * as WebSocket from "ws";
import { Document } from "mongoose";

export type Session = {
  _id: string;
  token: string;
  userEmail: string;
} & Document;

export enum Paths {
  getUsers = "get.users",
  userCreate = "user.create",
  userLogin = "user.login",
}

export enum Type {
  default = "",
  broadcast = "broadcast",
}

export type ErrorResponse = { method: Paths; payload: null; error: string[] };

export type ExtWebSocket = WebSocket & { isAlive: boolean };
