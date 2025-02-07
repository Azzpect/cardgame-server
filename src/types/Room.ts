import Player from "./Player";
import { WebSocket } from "ws";

export default class Room {
  players: Player[];
  id: string;
  constructor(ws: WebSocket, player: Player) {
    this.players = [];
    this.id = Math.random().toString(36).substring(2, 10);
    this.players.push(player);
  }
}
