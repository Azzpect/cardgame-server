import Player from "../types/Player";
import WebSocket from "ws";

const allPlayers: Player[] = [];

function createNewPlayer(ws: WebSocket) {
  try {
    console.log("creating new player");
    let p = findPlayer(ws);
    if (p) throw new Error("Player already exists");
    const player = new Player(ws);
    allPlayers.push(player);
    ws.send(
      JSON.stringify({
        event: "create-new-player",
        payload: player.id,
      }),
    );
  } catch (err) {
    console.log(err);
    ws.send(
      JSON.stringify({ event: "error", payload: (err as Error).message }),
    );
  }
}

function getAllPlayers(ws: WebSocket) {
  try {
    ws.send(
      JSON.stringify({
        event: "get-all-players",
        payload: allPlayers,
      }),
    );
  } catch (err) {
    console.log(err);
  }
}

function removePlayer(ws: WebSocket) {
  try {
    const playerIndex = allPlayers.findIndex((player) => player.conn === ws);
    if (playerIndex !== -1) {
      allPlayers.splice(playerIndex, 1);
    }
  } catch (err) {
    console.log(err);
  }
}

function findPlayer(ws: WebSocket) {
  return allPlayers.find((player) => player.conn === ws);
}

export { createNewPlayer, getAllPlayers, removePlayer, findPlayer };
