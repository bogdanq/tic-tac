import dotenv from "dotenv";

import { createUser, getUserFromSession, userLogin } from "./controllers";

import { mongoConnect } from "./utils/mongo-connect";
import { prepareServerConfig } from "./utils/prepare-server";
import {
  wsParser,
  errors,
  ExtWebSocket,
  Request,
  Methods,
  subscribe,
  broadcast,
} from "./ws";

dotenv.config();

mongoConnect();

const { server, wss, app } = prepareServerConfig();

app.post(`/${Methods.createSession}`, createUser);
app.post(`/${Methods.entrySession}`, userLogin);
app.get(`/${Methods.getSession}`, getUserFromSession);

wss.on("error", (ws: ExtWebSocket) => {
  ws.send(JSON.stringify(errors["500"]));
});

wss.on("connection", (ws: ExtWebSocket, request: Request) => {
  const {
    data: { router },
  } = request;

  ws.on("message", async (message: string) => {
    console.log("[socket] message event =>", message);

    const parsedMessage = await wsParser(message);

    if (!parsedMessage) {
      ws.send(JSON.stringify(errors["404"]));

      return;
    }

    subscribe(parsedMessage, request, ws);

    const response = await router.routeHandler(parsedMessage);

    broadcast(parsedMessage, response, ws);

    ws.send(JSON.stringify(response));
  });
});

server.listen("3000", () => console.log("3000"));
