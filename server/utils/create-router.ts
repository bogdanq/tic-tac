import { nanoid } from "nanoid";

import { getMessages, sendMessage } from "../controllers";
import {
  WsRouter,
  Session,
  Methods,
  Routes,
  WsRequest,
  GetMessagesResponse,
  Type,
  SendMessagesResponse,
} from "../ws";

const routes: Routes[] = [
  {
    method: Methods.chatSendMessage,
    handler: sendChatMessage,
  },
  {
    method: Methods.chatMessages,
    handler: getChatMessages,
  },
];

export function createRouter(session: Session) {
  const socketId = nanoid();

  const wsRouter = new WsRouter(session, socketId);

  for (let i = 0; i < routes.length; i++) {
    const { handler, method } = routes[i];

    wsRouter.addRoute(method, handler);
  }

  return wsRouter;
}

// @TODO вынести и сделать единый ответ для всех
async function getChatMessages({
  parsedReq,
}: {
  parsedReq: WsRequest;
}): Promise<GetMessagesResponse> {
  const messages = await getMessages();

  return {
    method: Methods.chatMessages,
    type: Type.default,
    payload: {
      payload: { messages },
      params: null,
    },
    reqId: parsedReq.reqId,
    code: 200,
    isSuccess: true,
  };
}

async function sendChatMessage({
  session,
  parsedReq,
}: {
  parsedReq: WsRequest;
  session: Session;
}): Promise<SendMessagesResponse> {
  const message = await sendMessage({
    userId: session.userId,
    name: session.name,
    // @ts-ignore
    message: parsedReq.payload.message || "",
  });

  return {
    method: Methods.chatSendMessage,
    type: Type.default,
    payload: {
      payload: { message },
      params: null,
    },
    reqId: parsedReq.reqId,
    code: 200,
    isSuccess: true,
  };
}
