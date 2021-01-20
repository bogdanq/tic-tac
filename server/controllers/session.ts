import { SessionModel } from "../models";
import { Session, Request } from "../ws/types";

export const getSessionFromBd = async (
  req: Request
): Promise<Session | null> => {
  // const token = req.headers.authorization;

  try {
    const session = await SessionModel.findOne({
      token: "test",
    });

    return session;
  } catch (e) {
    return null;
  }
};
