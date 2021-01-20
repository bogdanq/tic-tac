import { Document } from "mongoose";
import { Paths, Type } from "./default";

export enum UserStatus {
  online = "online",
  offline = "offline",
}

export type ShortUser = {
  _id: string;
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
  method: Paths.userCreate;
  type: Type.default;
  payload: Pick<User, "email" | "name" | "password">;
};

export type CreateUsersResponse = {
  method: Paths.userCreate;
  type: Type.default;
  payload: ShortUser & { token: string };
};

export type LoginUsersParams = {
  method: Paths.userLogin;
  type: Type.default;
  payload: Pick<User, "email" | "password">;
};

export type LoginUsersResponse = {
  method: Paths.userLogin;
  type: Type.default;
  payload: ShortUser & { token: string };
};
