import { send } from "../../api/ws/client";
import {
  Methods,
  SendMessagesParams,
  SubscriptionMethods,
} from "../../api/ws/types";

export const fetchChatMessagesWs = async (unsubscribe?: boolean | void) => {
  const result = await send({
    method: SubscriptionMethods.chatMessages,
    payload: null,
    unsubscribe: unsubscribe || false,
  });

  return result.payload;
};

export const sendChatMessagesWs = async ({
  message,
}: SendMessagesParams["payload"]) => {
  const result = await send({
    method: Methods.chatSendMessage,
    payload: { message },
    roomId: SubscriptionMethods.chatMessages,
  });

  return result.payload;
};
