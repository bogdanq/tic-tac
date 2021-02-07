import { Methods, Type } from "../../api/ws/types";

export type Session = {
  id: string;
  email: string;
  name: string;
  password: string;
  currentGameId: string;
  friends: string[];
  blockedUser: string[];
};

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
