import * as WebSocket from "ws";
import { Document } from "mongoose";

export type Session = {
  _id: string;
  token: string;
  userEmail: string;
} & Document;

export enum Paths {
  getUsers = "get.users",
}

export enum Type {
  broadcast = "broadcast",
}

export type ExtWebSocket = WebSocket & { isAlive: boolean };

export type GetUsersParams = {
  method: Paths.getUsers;
  type: Type.broadcast;
  payload: {};
};
