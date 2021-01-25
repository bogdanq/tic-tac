import { rooms } from "./rooms";
import { Methods, WsRequest, Session, WsResponse, Type } from "./types";

type Handler = (params: {
  parsedReq: WsRequest;
  session: Session;
}) => Promise<WsResponse>;

export type Routes = { handler: Handler; method: Methods };
export class WsRouter {
  public routers: Map<Methods, Handler>;
  public session: Session;
  public socketId: string;

  constructor(session: Session, socketId: string) {
    this.routers = new Map<Methods, Handler>();
    this.session = session;
    this.socketId = socketId;
    this.routeHandler = this.routeHandler.bind(this);
  }

  public addRoute(method: Methods, handler: Handler) {
    this.routers.set(method, handler);

    return this;
  }

  public routeHandler(parsedReq: WsRequest): Promise<WsResponse> | WsResponse {
    if (this.routers.has(parsedReq.method)) {
      if (parsedReq.unsubscribe) {
        return unsibscribe(parsedReq, this.socketId);
      }

      const handler = this.routers.get(parsedReq.method);

      return handler({ parsedReq, session: this.session });
    }

    return null;
  }
}

function unsibscribe(parsedMessage: WsRequest, socketId: string) {
  const method = parsedMessage.method;

  rooms.remove(method, socketId);

  return {
    method,
    type: Type.default,
    payload: null,
    reqId: parsedMessage.reqId,
    code: 200,
    isSuccess: true,
  };
}
