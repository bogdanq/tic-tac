import { SessionModel } from "../models";
import { makeAccessToken } from "../utils/makeAccessToken";
import { Session, Request, User } from "../ws/types";

export const getSessionFromBd = async (
  req: Request
): Promise<Session | null> => {
  const token =
    req.headers["sec-websocket-protocol"] || (req.headers["x-token"] as string);

  try {
    const session = await SessionModel.findOne({
      token,
    });

    return session;
  } catch (e) {
    return null;
  }
};

export async function createSession(user: User): Promise<string | null> {
  try {
    const token = await makeAccessToken(user);

    await SessionModel.create({
      userEmail: user.email,
      token,
    });

    return token;
  } catch (e) {
    throw Error("Произошла ошибка при создании токена");
  }
}
