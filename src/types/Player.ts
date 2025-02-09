import { WebSocket } from "ws";
import { randomUUID } from "node:crypto";
import { Card } from "./Card";

export default class Player {
  conn: WebSocket;
  id: string;
  hand: Card[];
  constructor(conn: WebSocket) {
    this.conn = conn;
    this.id = randomUUID();
    this.hand = [];
  }

  toJSON() {
    const { conn, ...data } = this;
    return data;
  }
}

export class RoomLeader {
  id: string;
  conn: WebSocket;
  constructor(player: Player) {
    this.id = player.id;
    this.conn = player.conn;
  }

  toJSON() {
    const { conn, ...data } = this;
    return data;
  }
}
