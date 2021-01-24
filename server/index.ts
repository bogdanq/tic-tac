import dotenv from "dotenv";
import { nanoid } from "nanoid";

import { getMessages, sendMessage } from "./controllers";
import { createUser, userLogin } from "./controllers/user";

import { mongoConnect } from "./utils/mongo-connect";
import { prepareServerConfig } from "./utils/prepare-server";
import { rooms } from "./utils/rooms";
import {
  wsParser,
  errors,
  Type,
  ExtWebSocket,
  Request,
  Methods,
  SendMessagesResponse,
  SubscriptionMethods,
  WsRequest,
  wsResponse,
  GetMessagesResponse,
  Session,
} from "./ws";

dotenv.config();

mongoConnect();

const { server, wss, app } = prepareServerConfig();

app.post(`/${Methods.userCreate}`, createUser);
app.post(`/${Methods.userLogin}`, userLogin);

wss.on("error", (ws: ExtWebSocket) => {
  ws.send(JSON.stringify(errors["500"]));
});

wss.on("connection", (ws: ExtWebSocket, request: Request) => {
  const socketId = nanoid();
  const {
    data: { session },
  } = request;

  ws.on("message", async (message: string) => {
    console.log("[socket] message event =>", message);

    const parsedMessage = await wsParser(message);

    if (!parsedMessage) {
      ws.send(JSON.stringify(errors["404"]));
    }

    if (SubscriptionMethods[parsedMessage.method]) {
      const roomId = parsedMessage.method;
      console.log("[socket] subscription type message =>", roomId);

      rooms.add({ socketId, ws }, roomId);
    }

    const result = await completeWorkFromRoutes(
      parsedMessage,
      session,
      socketId
    );

    if (parsedMessage.roomId) {
      const clients = rooms.clients(parsedMessage.roomId);

      clients.forEach((client) => {
        if (client.ws !== ws) {
          client.ws.send(JSON.stringify({ ...result, type: Type.event }));
        }
      });
    }

    const resultByString = JSON.stringify(result);

    ws.send(resultByString);
  });
});

async function completeWorkFromRoutes(
  parsedMessage: WsRequest,
  session: Session,
  socketId: string
): Promise<wsResponse> {
  if (parsedMessage.unsubscribe) {
    console.log("socketId", socketId);
    return unsibscribe(parsedMessage, socketId);
  }

  if (parsedMessage.method === Methods.chatMessages) {
    return getChatMessages(parsedMessage);
  }

  if (parsedMessage.method === Methods.chatSendMessage) {
    return sendChatMessage(parsedMessage, session);
  }

  return {
    method: parsedMessage.method,
    reqId: parsedMessage.reqId,
    code: 404,
    isSuccess: false,
    error: "Нет такого роута",
    payload: null,
  };
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

async function getChatMessages(
  parsedMessage: WsRequest
): Promise<GetMessagesResponse> {
  const messages = await getMessages();

  return {
    method: Methods.chatMessages,
    type: Type.default,
    payload: {
      payload: { messages },
      params: null,
    },
    reqId: parsedMessage.reqId,
    code: 200,
    isSuccess: true,
  };
}

async function sendChatMessage(
  parsedMessage: WsRequest,
  session: Session
): Promise<SendMessagesResponse> {
  const message = await sendMessage({
    userId: session.id,
    // @ts-ignore
    message: parsedMessage.payload.message || "",
  });

  return {
    method: Methods.chatSendMessage,
    type: Type.default,
    payload: {
      payload: { message },
      params: null,
    },
    reqId: parsedMessage.reqId,
    code: 200,
    isSuccess: true,
  };
}

server.listen("3000", () => console.log("3000"));
