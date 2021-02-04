import { createEffect, createEvent, guard } from "effector";
import { nanoid } from "nanoid";
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

const open = createEvent<any>("open");
// const closed = createEvent("closed");
// const error = createEvent("error");
const onMessage = createEvent<MessageEvent<string>>("message");
export const subscribe = createEvent<{
  method: DefaultResponse["method"];
  payload: DefaultResponse["payload"];
}>("subscribe");

onMessage
  .map((message) => {
    return JSON.parse(message.data) as DefaultResponse;
  })
  .watch((data) => {
    const { reqId, isSuccess, type } = data;

    console.log("type", data);

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

export function connect(cb: any) {
  try {
    console.info(`Try to connect on ${wsURL}`);
    socket = new WebSocket(wsURL);
  } catch (e) {
    throw new Error(e.message);
  } finally {
    socket.onopen = (event) => open(event);
    socket.onmessage = (message) => onMessage(message);

    setTimeout(() => {
      cb();
    }, 500);
  }
}

send.watch((payload) => console.log("Запрос", payload));
send.done.watch((payload) => console.log("Ответ на запрос", payload));
send.fail.watch((payload) => console.log("Ошибка запроса", payload));
