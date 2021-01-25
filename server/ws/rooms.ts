import { Session, ExtWebSocket } from "./types";

type Room = { [key: string]: Array<{ id: Session["id"]; ws: ExtWebSocket }> };

class Rooms {
  public rooms: Room;

  constructor() {
    this.rooms = {};
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.clients = this.clients.bind(this);
  }

  public add(
    { socketId, ws }: { socketId: string; ws: ExtWebSocket },
    roomId: string
  ) {
    if (!this.hasRoom(roomId)) {
      this.rooms[roomId] = [{ id: socketId, ws }];

      return this;
    }

    const canAddRoom = this.hasSocketInRoom(roomId, socketId);

    if (canAddRoom) {
      this.rooms[roomId].push({ id: socketId, ws });
    }

    return this;
  }

  public remove(roomId: string, socketId: string) {
    this.rooms[roomId] = (this.rooms[roomId] || []).filter(
      (item) => item.id !== socketId
    );

    return this;
  }

  public clients(roomId: string) {
    return this.rooms[roomId] || [];
  }

  private hasRoom(roomId: string) {
    return Boolean(this.rooms[roomId]);
  }

  private hasSocketInRoom(roomId: string, socketId: string) {
    return !Boolean(
      (this.rooms[roomId] || []).find((item) => item.id === socketId)
    );
  }
}

export const rooms = new Rooms();
