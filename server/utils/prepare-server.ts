import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import * as http from "http";
import * as WebSocket from "ws";
import { getSessionFromBd } from "../controllers";

export function prepareServerConfig() {
  const app = express();

  const server = http.createServer(app);

  const wss = new WebSocket.Server({
    server,
    verifyClient: async (
      info: {
        origin: string;
        secure: boolean;
        req: http.IncomingMessage & { data: any };
      },
      callback: (
        res: boolean,
        code?: number,
        message?: string,
        headers?: http.OutgoingHttpHeaders
      ) => void
    ) => {
      const session = await getSessionFromBd(info.req);

      if (session) {
        info.req.data = { session };

        return callback(true);
      }

      return callback(false);
    },
  });

  app.use(cors());
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  return { app, wss, server };
}
