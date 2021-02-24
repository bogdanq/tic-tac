import { Methods, Type } from "../../api/ws/types";
import { Session } from "../../common";

export type CreateSessionParams = {
  email: string;
  name: string;
  password: string;
};

export type EntrySessionParams = {
  email: string;
  password: string;
};

export type GetUserResponse = {
  method: Methods.getSession;
  type: Type.default;
  payload: Session;
};

export type EntrySessionResponse = {
  method: Methods.entrySession;
  type: Type.default;
  payload: Pick<Session, "email" | "id" | "name"> & { token: string };
};

export type CreateSessionResponse = {
  method: Methods.entrySession;
  type: Type.default;
  payload: Pick<Session, "email" | "id" | "name"> & { token: string };
};
