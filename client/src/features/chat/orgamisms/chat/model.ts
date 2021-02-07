import { createEffect, createStore, createEvent, merge } from "effector";
import { subscribeEvent } from "../../../../api/ws/client";
import {
  Chat,
  GetMessagesResponse,
  Methods,
  SendMessagesParams,
  SendMessagesResponse,
  SubscriptionMethods,
} from "../../../../api/ws/types";
import { fetchChatMessagesWs, sendChatMessagesWs } from "../../api";

export const sendChatMessage = createEvent<SendMessagesResponse["payload"]>(
  Methods.chatSendMessage
);

export const fetchChatMessagesFx = createEffect<
  void,
  GetMessagesResponse["payload"]
>(SubscriptionMethods.chatMessages).use(fetchChatMessagesWs);

export const unsubscribeChatMessagesFx = createEffect<
  boolean,
  GetMessagesResponse["payload"]
>(SubscriptionMethods.chatMessages).use(fetchChatMessagesWs);

export const sendChatMessagesFx = createEffect<
  SendMessagesParams["payload"],
  SendMessagesResponse["payload"]
>(Methods.chatSendMessage).use(sendChatMessagesWs);

export const $messages = createStore<Chat[]>([]);

$messages
  .on(fetchChatMessagesFx.doneData, (state, { payload }) => [
    ...payload.messages,
    ...state,
  ])
  .on(
    merge([sendChatMessagesFx.doneData, sendChatMessage]),
    (state, { payload }) => [payload.message, ...state]
  );

export const fetchMessages = () => {
  fetchChatMessagesFx();

  subscribeEvent({
    method: Methods.chatSendMessage,
    event: sendChatMessage,
  });

  return () => {
    unsubscribeChatMessagesFx(true);
  };
};
