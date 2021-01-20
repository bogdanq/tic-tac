import dotenv from "dotenv";

import { mongoConnect } from "./utils/mongo-connect";
import { prepareServerConfig } from "./utils/prepare-server";
import { wsParser, errors, Type, ExtWebSocket, Request } from "./ws";

dotenv.config();

mongoConnect();

const { server, wss } = prepareServerConfig();

wss.on("error", (ws: ExtWebSocket) => {
  ws.send(JSON.stringify(errors["500"]));
});

wss.on("connection", (ws: ExtWebSocket, request: Request) => {
  ws.on("message", async (message: string) => {
    const parsedMessage = await wsParser(message);

    if (!parsedMessage) {
      ws.send(JSON.stringify(errors["404"]));
    }

    if (parsedMessage.type === Type.broadcast) {
      wss.clients.forEach((client) => {
        if (client !== ws) {
          client.send(`Hello, broadcast message -> ${message}`);
        }
      });

      return;
    }

    ws.send(message);
  });
});

server.listen("3000", () => console.log("3000"));
