import Player, { RoomLeader } from "./Player";
import { WebSocket } from "ws";
import Deck from "./Deck";
import { Card } from "./Card";

export default class Room {
  players: Player[];
  id: string;
  leader: RoomLeader;
  deck: Deck;
  constructor(ws: WebSocket, player: Player) {
    this.players = [];
    this.id = Math.random().toString(36).substring(2, 10);
    this.players.push(player);
    this.leader = new RoomLeader(player);
    this.deck = new Deck();
  }

  serveHand() {
    for (let i = 0; i < 8; i++) {
      this.players.forEach((player) => {
        player.hand.push(this.deck.drawCard() as Card);
      });
    }
  }

  toJSON() {
    const { deck, ...data } = this;
    return data;
  }
}
