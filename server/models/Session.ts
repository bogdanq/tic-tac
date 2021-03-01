import mongoose, { Schema } from "mongoose";
import { Session } from "../ws/types/default";

const SessionSchema = new Schema(
  {
    userEmail: String,
    name: String,
    userId: String,
    token: String,
  },
  {
    timestamps: true,
  }
);

export const SessionModel = mongoose.model<Session>("Session", SessionSchema);
