import { WebSocket } from "ws";
import Room from "../types/Room";
import { findPlayer } from "./handlePlayers";
import { SocketData } from "../types/SocketData";

const allRooms: Room[] = [];

function createRoom(ws: WebSocket) {
  try {
    console.log("creating new room");
    let player = findPlayer(ws);
    if (!player) throw new Error("Player not found");
    const room = new Room(ws, player);
    allRooms.push(room);
    ws.send(JSON.stringify({ event: "create-new-room", payload: room }));
  } catch (err) {
    console.log(err);
    ws.send(
      JSON.stringify({ event: "error", payload: (err as Error).message }),
    );
  }
}

function findPlayerInRoom(room: Room, ws: WebSocket) {
  return room.players.find((player) => player.conn === ws);
}

function joinRoom(data: SocketData, ws: WebSocket) {
  try {
    if (typeof data.payload !== "string") throw new Error("Invalid room id");
    let roomId = data.payload;
    let player = findPlayer(ws);
    if (!player) throw new Error("Player not found");
    let room = allRooms.find((room) => room.id === roomId);
    if (!room) throw new Error("Room not found");
    if (findPlayerInRoom(room, ws))
      throw new Error("Player already in the room");
    room.players.push(player);

    room.players.forEach((player) => {
      if (player.conn !== ws) {
        player.conn.send(
          JSON.stringify({ event: "player-joined", payload: room.players }),
        );
      }
    });

    ws.send(JSON.stringify({ event: "join-room", payload: room }));
  } catch (err) {
    console.log(err);
    ws.send(
      JSON.stringify({ event: "error", payload: (err as Error).message }),
    );
  }
}

export { createRoom, joinRoom };
