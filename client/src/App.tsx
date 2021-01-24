import React from "react";
import Modal from "react-modal";
// import { TicTacBoard } from "./pages/tic-tac-board/tic-tac-board";
import { send, subscribeEvent, fetchingWatch } from "./api/ws/client";
import {
  Methods,
  GetMessagesResponse,
  Chat,
  SendMessagesParams,
  SendMessagesResponse,
} from "./api/ws/types";
import { createEffect, createEvent } from "effector";
import { useStore } from "effector-react";

Modal.setAppElement("#root");

const fetchChatMessagesWs = async () => {
  const result = await send({
    method: Methods.chatMessages,
    payload: null,
  });

  return result.payload;
};

const sendChatMessagesWs = async ({
  message,
}: SendMessagesParams["payload"]) => {
  const result = await send({
    method: Methods.chatSendMessage,
    payload: { message },
  });

  return result.payload;
};

export const fetchChatMessagesFx = createEffect<
  null,
  GetMessagesResponse["payload"]
>(Methods.chatMessages).use(fetchChatMessagesWs);

export const sendChatMessagesFx = createEffect<
  SendMessagesParams["payload"],
  SendMessagesResponse["payload"]
>(Methods.chatMessages).use(sendChatMessagesWs);

const sendMessageSubscribe = createEvent<SendMessagesResponse["payload"]>();

export function App() {
  const [messages, setMessages] = React.useState<Chat[]>([]);
  const [value, setValue] = React.useState("");

  const pending = useStore(sendChatMessagesFx.pending);

  React.useEffect(() => {
    fetchChatMessagesFx(null);
    const unbind = fetchChatMessagesFx.done.watch(({ result: { payload } }) =>
      setMessages((prev) => [...payload.messages, ...prev])
    );

    return () => {
      unbind();
    };
  }, []);

  React.useEffect(() => {
    subscribeEvent({
      event: sendMessageSubscribe,
      method: Methods.chatSendMessage,
    });
  }, []);

  React.useEffect(() => {
    const unbind = fetchingWatch<
      SendMessagesParams["payload"],
      SendMessagesResponse["payload"]
    >(
      ({ payload }) => {
        setMessages((prev) => [payload.message, ...prev]);
      },
      {
        fx: sendChatMessagesFx,
        subscribe: sendMessageSubscribe,
      }
    );

    return () => {
      unbind();
    };
  }, []);

  return (
    <>
      <h1>Сообщения</h1>

      <input
        placeholder="введите сообщение"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        disabled={pending}
        onClick={() => {
          sendChatMessagesFx({ message: value });
        }}
      >
        Отправить
      </button>

      {messages.map((item, index) => (
        <div key={index}>
          <h2>{item.userId}</h2>
          <h2>{item.text}</h2>
          <hr />
        </div>
      ))}

      {/* <TicTacBoard /> */}
    </>
  );
}
