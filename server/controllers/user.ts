import * as express from "express";
import { UserModel } from "../models";
import { hash } from "../utils/hash";
import {
  User,
  UserStatus,
  Request,
  LoginUsersResponse,
  Paths,
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
      method: Paths.userCreate,
      type: Type.default,
      payload: { email, name, _id: user._id, token },
    };

    response.status(200).send(JSON.stringify(result));
  } catch ({ message }) {
    const error: ErrorResponse = {
      method: Paths.userCreate,
      payload: null,
      error: "Произошла ошибка при создании пользователя",
    };

    response.status(404).send(JSON.stringify(error));
  }
}

export async function userLogin(
  request: Request & User,
  response: express.Response
) {
  const { email, password } = request.body;

  const error: ErrorResponse = {
    method: Paths.userLogin,
    payload: null,
    error: "Не правильный логин или пароль",
  };

  try {
    const user = await UserModel.findOne({ email });

    if (user.password === hash(password)) {
      const token = await createSession(user);

      const result: LoginUsersResponse = {
        method: Paths.userLogin,
        type: Type.default,
        payload: {
          email: user.email,
          name: user.name,
          _id: user.id,
          token,
        },
      };

      response.status(200).send(JSON.stringify(result));

      return;
    }

    response.status(404).send(JSON.stringify(error));
  } catch ({ message }) {
    response.status(404).send(
      JSON.stringify({
        ...error,
        error: "Произошла ошибка при проверке пользователя",
      })
    );
  }
}
