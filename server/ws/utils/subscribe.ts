import { rooms } from "../rooms";
import {
  ExtWebSocket,
  Request,
  SubscriptionMethods,
  WsRequest,
} from "../types";

export function subscribe(
  parsedReq: WsRequest,
  request: Request,
  ws: ExtWebSocket
) {
  const {
    data: { socketId },
  } = request;

  const { method } = parsedReq;

  if (SubscriptionMethods[method]) {
    console.log("[socket] subscription type message =>", method);

    rooms.add({ socketId, ws }, method);
  }
}
