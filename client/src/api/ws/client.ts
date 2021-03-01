import { createEffect, createEvent, createStore, guard } from "effector";
import { nanoid } from "nanoid";
import { getCookie } from "../../features/session/utils";
import { DefaultResponse, wsRequest, Type, Methods } from "./types";

const wsURL = `ws://localhost:${process.env.REACT_APP_WS}`;
let socket: WebSocket;

const awaitingMap = new Map();

// function cleanSocket() {
//   socket.onopen = null;
//   socket.onclose = null;
//   socket.onerror = null;
//   socket.onmessage = null;
// }

export const subscribeEvent = ({
  method,
  event,
}: {
  method: Methods;
  event: any;
}) => {
  console.log(`Подписка ${method} прослушивается`);

  guard({
    source: subscribe,
    filter: (source) => source.method === method,
    // @ts-ignore
    target: event.prepend(({ payload }) => payload),
  });
};

export const open = createEvent<any>("open");
export const connectSocket = createEvent<boolean>();
export const closed = createEvent("closed");
// const error = createEvent("error");
export const onMessage = createEvent<MessageEvent<string>>("message");
export const subscribe = createEvent<{
  method: DefaultResponse["method"];
  payload: DefaultResponse["payload"];
}>("subscribe");

export const $connect = createStore<{
  isConnected: boolean;
  error: string | null;
}>({ isConnected: false, error: null });

$connect
  .on(connectSocket, (s, isConnected) => ({ ...s, isConnected }))
  .reset(closed);

onMessage
  .map((message) => {
    return JSON.parse(message.data) as DefaultResponse;
  })
  .watch((data) => {
    const { reqId, isSuccess, type } = data;

    const request = awaitingMap.get(reqId);

    if (request) {
      awaitingMap.delete(reqId);

      if (type === Type.default && isSuccess) {
        const { method } = data;

        request.resolve({
          method,
          payload: data.payload,
        });
        return;
      }

      if (type === Type.default && !isSuccess) {
        const { error } = data;

        request.reject(error);
      }

      return;
    }

    if (type === Type.event) {
      const { method } = data;

      subscribe({
        method,
        payload: data.payload,
      });
      return;
    }
  });

export const send = createEffect<Omit<wsRequest, "reqId">, DefaultResponse>(
  "send ws",
  {
    handler({ payload, method, roomId, unsubscribe }) {
      const reqId = nanoid();

      // @ts-ignore
      const request: wsRequest = {
        payload,
        method,
        reqId,
        roomId,
        unsubscribe,
      };

      socket.send(JSON.stringify(request));

      const promise: Promise<DefaultResponse> = new Promise(
        (resolve, reject) => {
          awaitingMap.set(reqId, { resolve, reject });
        }
      );

      return promise;
    },
  }
);

export function connect() {
  const cookie = getCookie("x-token");

  if (socket) {
    return;
  }

  socket = new WebSocket(wsURL, [cookie]);

  socket.onopen = (event) => {
    console.info(`Try to connect on ${wsURL}`);

    open(event);

    connectSocket(true);
  };

  socket.onmessage = (message) => onMessage(message);

  socket.onerror = (event) => {
    console.info(`Socket error`);
    connectSocket(false);
  };
}

send.watch((payload) => console.log("Запрос", payload));
send.done.watch((payload) => console.log("Ответ на запрос", payload));
send.fail.watch((payload) => console.log("Ошибка запроса", payload));
