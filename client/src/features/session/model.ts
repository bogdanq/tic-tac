import { AxiosResponse } from "axios";
import {
  createEffect,
  createStore,
  combine,
  merge,
  createEvent,
  guard,
  forward,
} from "effector";

import { request } from "../../api/rest";
import {
  Session,
  CreateSessionParams,
  EntrySessionParams,
  GetUserResponse,
  EntrySessionResponse,
  CreateSessionResponse,
} from "./types";
import { setCookie, deleteCookie } from "./utils";

export const saveTokenToCookie = createEvent<string>();
export const reset = createEvent();

export const $session = createStore<Session | null>(null);
export const $token = createStore<string | null>(null);
export const $isAuth = $session.map((user) => user !== null);

export const fetchSessionFx = createEffect<
  void,
  AxiosResponse<GetUserResponse>
>().use(() => {
  return request.get<GetUserResponse>("session.get", true);
});

export const createUserFx = createEffect<
  CreateSessionParams,
  AxiosResponse<CreateSessionResponse>
>((params) => {
  return request.post<CreateSessionParams, CreateSessionResponse>(
    "session.create",
    params
  );
});

export const loginFx = createEffect<
  EntrySessionParams,
  AxiosResponse<EntrySessionResponse>
>((params) => {
  return request.post<EntrySessionParams, EntrySessionResponse>(
    "session.entry",
    params
  );
});

export const logOutFx = createEffect<void, null>((params) => {
  return null;
});

export const $sessionGetPending = combine(
  [$session, fetchSessionFx.pending],
  ([session, pending]) => !session && pending
);

$session
  .on(fetchSessionFx.doneData, (_, { data }) => data.payload)
  .reset(reset);

$token
  .on(
    merge([loginFx.doneData, createUserFx.doneData]),
    (_, { data }) => data.payload.token
  )
  .reset(reset);

guard({
  source: $token,
  filter: $token.map(Boolean),
  target: saveTokenToCookie,
});

forward({
  from: logOutFx.done,
  to: reset,
});

saveTokenToCookie.watch((token) => {
  setCookie("x-token", token);
  request.setToken(token);
});

logOutFx.done.watch(() => {
  deleteCookie("x-token");
});
