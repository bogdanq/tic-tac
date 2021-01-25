import { rooms } from "../rooms";
import { ExtWebSocket, Type, WsRequest, WsResponse } from "../types";

export function broadcast(
  { roomId }: WsRequest,
  response: WsResponse,
  ws: ExtWebSocket
) {
  if (roomId) {
    console.log("[socket] broadcast to =>", roomId);
    const clients = rooms.clients(roomId);

    clients.forEach((client) => {
      if (client.ws !== ws) {
        client.ws.send(JSON.stringify({ ...response, type: Type.event }));
      }
    });
  }
}
