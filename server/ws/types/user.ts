import { Document } from "mongoose";
import { Methods, Type } from "./default";

export enum UserStatus {
  online = "online",
  offline = "offline",
}

export type ShortUser = {
  id: string;
  email: string;
  name: string;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  password: string;
  currentGameId: string;
  friends: string[];
  blockedUser: string[];
  status: UserStatus;
} & Document;

export type CreateUsersParams = {
  method: Methods.createSession;
  type: Type.default;
  payload: Pick<User, "email" | "name" | "password">;
};

export type CreateUsersResponse = {
  method: Methods.createSession;
  type: Type.default;
  payload: { token: string; user: User };
};

export type LoginUsersParams = {
  method: Methods.entrySession;
  type: Type.default;
  payload: Pick<User, "email" | "password">;
};

export type LoginUsersResponse = {
  method: Methods.entrySession;
  type: Type.default;
  payload: { token: string; user: User };
};

export type GetUserResponse = {
  method: Methods.getSession;
  type: Type.default;
  payload: User;
};
