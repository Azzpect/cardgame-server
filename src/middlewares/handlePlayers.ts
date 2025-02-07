import Player from "../types/Player";
import WebSocket from "ws";

const allPlayers: Player[] = [];

function createNewPlayer(ws: WebSocket) {
  try {
    console.log("creating new player");
    const player = new Player(ws);
    allPlayers.push(player);
    ws.send(
      JSON.stringify({
        event: "create-new-player",
        data: JSON.stringify(player),
      }),
    );
  } catch (err) {
    console.log(err);
  }
}

function getAllPlayers(ws: WebSocket) {
  try {
    ws.send(
      JSON.stringify({
        event: "get-all-players",
        data: allPlayers,
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

export { createNewPlayer, getAllPlayers, removePlayer };
