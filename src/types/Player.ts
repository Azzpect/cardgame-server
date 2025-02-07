import { WebSocket } from "ws";
import { randomUUID } from "node:crypto";

export default class Player {
  conn: WebSocket;
  id: string;
  constructor(conn: WebSocket) {
    this.conn = conn;
    this.id = randomUUID();
  }

  toJSON() {
    const { conn, ...data } = this;
    return data;
  }
}
