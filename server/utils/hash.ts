import crypto from "crypto";

export function hash(password: string) {
  return crypto.createHash("sha1").update(password).digest("base64");
}
