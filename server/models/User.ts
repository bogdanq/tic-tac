import mongoose, { Schema, Document } from "mongoose";
import { User } from "../ws/types";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: "Поле email должно быть уникальным",
      required: "Поле email обязательно для заполнения",
    },
    password: {
      type: String,
      required: "Поле password обязательно для заполнения",
    },
    name: {
      type: String,
      required: "Поле name обязательно для заполнения",
    },
    friends: {
      type: [String],
      lowercase: true,
      trim: true,
    },
    blockedUser: {
      type: [String],
      lowercase: true,
      trim: true,
    },
    status: String,
    currentGameId: String,
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<User>("User", UserSchema);
