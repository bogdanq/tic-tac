import jwt from "jsonwebtoken";
import { User } from "../ws";

export function makeAccessToken(userEntity: User): Promise<string> {
  return new Promise((rs, rj) => {
    return jwt.sign(
      {
        tokenType: "TOKEN_TYPE_ACCESS",
        username: userEntity.name,
        email: userEntity.email,
      },
      "TOKEN_ACCESS_SECRET",
      {
        algorithm: "HS512",
        subject: String(userEntity.id),
      },
      (error, token) => {
        if (error) {
          return rj(error);
        }

        return rs(token);
      }
    );
  });
}
