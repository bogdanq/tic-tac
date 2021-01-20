import mongoose, { Schema, Document } from "mongoose";
import { Session } from "../ws/types/default";

const SessionSchema = new Schema(
  {
    userEmail: String,
    token: String,
  },
  {
    timestamps: true,
  }
);

export const SessionModel = mongoose.model<Session>("Session", SessionSchema);
