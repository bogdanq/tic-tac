import { SessionModel } from "../models";
import { makeAccessToken } from "../utils/makeAccessToken";
import { Session, Request, User } from "../ws/types";

export const getSessionFromBd = async (
  req: Request
): Promise<Session | null> => {
  const token =
    // "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJUT0tFTl9UWVBFX0FDQ0VTUyIsInVzZXJuYW1lIjoidGVzdDEiLCJlbWFpbCI6InRlc3QxQHRlc3QxLmNvbSIsImlhdCI6MTYxNDU0NzM0Miwic3ViIjoiNjAzN2Y5YzJmNWM3MDg0YzJjYTY3MmZlIn0.K-_vDbIV0j2EjWpfW4tA7JE2I4J5Hby3orr4wACO-Xe2j9XjT7-Azw5Y0k8-PTS7HV3H-h1fUbs5y32yPdJmyg";
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
      userId: user._id,
      name: user.name,
      token,
    });

    return token;
  } catch (e) {
    throw Error("Произошла ошибка при создании токена");
  }
}
