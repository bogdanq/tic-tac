import mongoose, { Schema } from "mongoose";
import { Chat } from "../ws/types";

const ChatSchema = new Schema(
  {
    userId: String,
    name: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

export const ChatModel = mongoose.model<Chat>("Chat", ChatSchema);
