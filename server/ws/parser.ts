import { WsRequest } from "./types";

export async function wsParser(message: string): Promise<WsRequest | null> {
  try {
    const result: WsRequest = await JSON.parse(message);

    return result;
  } catch (e) {
    return null;
  }
}
