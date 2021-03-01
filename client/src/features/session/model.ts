import { AxiosResponse } from "axios";
import {
  createEffect,
  createStore,
  merge,
  createEvent,
  guard,
  forward,
} from "effector";

import { ApiError, request } from "../../api/rest";
import { Methods } from "../../api/ws/types";
import type { Session } from "../../common";
import {
  attachFailedNotification,
  createStoreWithPersist,
} from "../../common/model-utils";
import type {
  SignUpParams,
  SignInParams,
  GetUserResponse,
  SignInResponse,
  SignUpResponse,
} from "./types";
import { setCookie, deleteCookie } from "./utils";

export const saveTokenToCookie = createEvent<string>();
export const reset = createEvent();
export const fetchUser = createEvent<void>();

export const $session = createStore<Session | null>(null);
export const $token = createStoreWithPersist<string | null>(null, "token");

export const $isAuth = $session.map((user) => user !== null);

export const fetchUserFx = createEffect<
  void,
  AxiosResponse<GetUserResponse>,
  AxiosResponse<ApiError>
>().use(() => request.get<GetUserResponse>(Methods.fetchUser, true));

export const signUpFx = createEffect<
  SignUpParams,
  AxiosResponse<SignUpResponse>,
  AxiosResponse<ApiError>
>((params) =>
  request.post<SignUpParams, SignUpResponse>(Methods.signUp, params)
);

export const signInFx = createEffect<
  SignInParams,
  AxiosResponse<SignInResponse>,
  AxiosResponse<ApiError>
>((params) =>
  request.post<SignInParams, SignInResponse>(Methods.signIn, params)
);

export const logOutFx = createEffect<void, null>(() => {
  return null;
});

$session
  .on(fetchUserFx.doneData, (_, { data }) => data.payload)
  .on(
    merge([signInFx.doneData, signUpFx.doneData]),
    (_, { data }) => data.payload.user
  )
  .reset(reset);

$token
  .on(
    merge([signInFx.doneData, signUpFx.doneData]),
    (_, { data }) => data.payload.token
  )
  .reset(reset);

guard({
  source: fetchUser,
  filter: $token.map(Boolean),
  target: fetchUserFx,
});

guard({
  source: $token,
  filter: $token.map(Boolean),
  target: saveTokenToCookie,
});

forward({
  from: logOutFx.done,
  to: reset,
});

forward({
  from: fetchUserFx.failData,
  to: logOutFx,
});

attachFailedNotification(signInFx);
attachFailedNotification(signUpFx);

saveTokenToCookie.watch((token) => {
  setCookie("x-token", token);
  request.setToken(token);
});

logOutFx.done.watch(() => {
  deleteCookie("x-token");
});
