import * as http from "http";
import { GetUsersParams, Session } from "./default";

export type WsRequest = GetUsersParams;

export type Request = http.IncomingMessage & { data: { session: Session } };
