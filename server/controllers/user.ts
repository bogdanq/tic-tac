import * as express from "express";
import { UserModel } from "../models";
import { hash } from "../utils/hash";
import {
  User,
  UserStatus,
  Request,
  LoginUsersResponse,
  Methods,
  Type,
  ErrorResponse,
  CreateUsersResponse,
} from "../ws/types";
import { createSession } from "./session";

export async function createUser(
  request: Request & User,
  response: express.Response
) {
  const { name, email, password } = request.body;

  try {
    const user = new UserModel({
      email,
      name,
      password: hash(password),
      currentGameId: "",
      friends: [],
      blockedUser: [],
      status: UserStatus.offline,
    });

    const token = await createSession(user);

    user.save();

    const result: CreateUsersResponse = {
      method: Methods.userCreate,
      type: Type.default,
      payload: { email, name, id: user._id, token },
    };

    response.status(200).send(result);
  } catch ({ message }) {
    const error: Omit<ErrorResponse, "reqId"> = {
      method: Methods.userCreate,
      payload: null,
      error: "Произошла ошибка при создании пользователя",
      code: 404,
      isSuccess: false,
    };

    response.status(404).send(error);
  }
}

export async function userLogin(
  request: Request & User,
  response: express.Response
) {
  const { email, password } = request.body;

  const error: Omit<ErrorResponse, "reqId"> = {
    method: Methods.userLogin,
    payload: null,
    error: "Не правильный логин или пароль",
    code: 404,
    isSuccess: false,
  };

  try {
    const user = await UserModel.findOne({ email });

    if (user.password === hash(password)) {
      const token = await createSession(user);

      const result: LoginUsersResponse = {
        method: Methods.userLogin,
        type: Type.default,
        payload: {
          email: user.email,
          name: user.name,
          id: user._id,
          token,
        },
      };

      response.status(200).send(result);

      return;
    }

    response.status(404).send(error);
  } catch ({ message }) {
    response.status(404).send({
      ...error,
      error: "Произошла ошибка при проверке пользователя",
    });
  }
}
