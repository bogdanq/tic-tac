import {
  createEffect,
  createStore,
  createEvent,
  merge,
  restore,
  forward,
} from "effector";
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

export const changeMessage = createEvent<string>();

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
export const $message = restore(changeMessage, "");

$messages
  .on(fetchChatMessagesFx.doneData, (state, { payload }) => [
    ...payload.messages,
    ...state,
  ])
  .on(
    merge([sendChatMessagesFx.doneData, sendChatMessage]),
    (messages, { payload }) => {
      if (messages.length >= 50) {
        const nextMessages = messages.slice(0, messages.length - 1);

        return [payload.message, ...nextMessages];
      }

      return [payload.message, ...messages];
    }
  );

forward({
  from: sendChatMessagesFx.doneData,
  to: changeMessage.prepend(() => ""),
});

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
