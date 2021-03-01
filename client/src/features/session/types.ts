import { Methods, Type } from "../../api/ws/types";
import { Session } from "../../common";

export type SignUpParams = {
  email: string;
  name: string;
  password: string;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type GetUserResponse = {
  method: Methods.fetchUser;
  type: Type.default;
  payload: Session;
};

export type SignInResponse = {
  method: Methods.signIn;
  type: Type.default;
  payload: { user: Session; token: string };
};

export type SignUpResponse = {
  method: Methods.signUp;
  type: Type.default;
  payload: { user: Session; token: string };
};
