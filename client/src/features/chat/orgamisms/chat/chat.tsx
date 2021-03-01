import { combine } from "effector";
import styled, { css } from "styled-components";
import { useStore } from "effector-react";
import React, { useCallback, useEffect } from "react";
import { Input, SubTitle, Text } from "../../../../ui";

import {
  $messages,
  fetchChatMessagesFx,
  fetchMessages,
  sendChatMessagesFx,
  changeMessage,
  $message,
} from "./model";
import { $session } from "../../../session";
import { MessagesLoader } from "../../molecules";

const $store = combine({
  messages: $messages,
  message: $message,
  session: $session,
  sendMessagePending: sendChatMessagesFx.pending,
  fetchMessagePending: fetchChatMessagesFx.pending,
});

export const Chat = () => {
  const {
    fetchMessagePending,
    sendMessagePending,
    messages,
    message,
    session,
  } = useStore($store);

  const handleSendMessage = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !sendMessagePending) {
        sendChatMessagesFx({ message });
      }
    },
    [message, sendMessagePending]
  );

  useEffect(() => {
    const unsubscribe = fetchMessages();

    return () => {
      unsubscribe();
    };
  }, []);

  if (fetchMessagePending) {
    return <MessagesLoader />;
  }

  return (
    <Wrapper>
      <MessageInput
        autoComplete="off"
        sizeInput="large"
        placeholder="Введите сообщение..."
        value={message}
        onKeyDown={handleSendMessage}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          changeMessage(e.target.value);
        }}
      />

      <Messages>
        {messages.map((item, index) => {
          const isCurrentUser = item.userId === session?._id;

          return (
            <MessageItem currentMessage={isCurrentUser} key={index}>
              <SubTitle>{isCurrentUser ? "Вы" : item.name}</SubTitle>
              <Text>{item.text}</Text>
            </MessageItem>
          );
        })}
      </Messages>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Messages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const MessageItem = styled.div<{ currentMessage?: boolean }>`
  margin-bottom: 5px;
  border-bottom: 1px solid var(--color-default-message);
  padding: 5px 15px;

  ${({ currentMessage }) => {
    if (currentMessage) {
      return css`
        & h2 {
          text-align: right;
          text-decoration: underline;
        }
      `;
    }
  }}
`;

const MessageInput = styled(Input)`
  background: #fff;
  border-color: var(--gray_300);
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
