import { ChatModel } from "../models";
import { Chat } from "../ws/types";

export async function sendMessage({
  userId,
  message,
  name,
}: {
  userId: string;
  message: string;
  name: string;
}): Promise<Chat> {
  const result = await ChatModel.create({
    userId,
    name,
    text: message,
  });

  return result;
}

export async function getMessages(): Promise<Chat[]> {
  const result = await ChatModel.find().sort({ _id: -1 }).limit(50);

  return result;
}
