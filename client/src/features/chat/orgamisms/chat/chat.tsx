import { combine } from "effector";
import { useStore } from "effector-react";
import React from "react";

import {
  $messages,
  fetchChatMessagesFx,
  fetchMessages,
  sendChatMessagesFx,
} from "./model";

const $store = combine({
  messages: $messages,
  sendMessagePending: sendChatMessagesFx.pending,
  fetchMessagePending: fetchChatMessagesFx.pending,
});

export const Chat = () => {
  const [value, setValue] = React.useState("");

  const { fetchMessagePending, sendMessagePending, messages } = useStore(
    $store
  );

  React.useEffect(() => {
    const unsubscribe = fetchMessages();

    return () => {
      unsubscribe();
    };
  }, []);

  if (fetchMessagePending) {
    return <h1>loading...</h1>;
  }

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
        disabled={sendMessagePending}
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
    </>
  );
};
