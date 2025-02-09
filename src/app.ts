import express, { Request, Response } from "express";
import {
  createNewPlayer,
  getAllPlayers,
  removePlayer,
} from "./middlewares/handlePlayers";
import { createRoom, joinRoom, serveHand } from "./middlewares/handleRooms";
import { SocketData } from "./types/SocketData";
import { Server } from "ws";
import { Stats } from "node:fs";

const app = express();
const port = process.env.PORT || 3000;
const wsPort = parseInt(process.env.WSPORT as string) || 5000;
const wss = new Server({ port: wsPort });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// websocket connection

wss.on("connection", (ws) => {
  console.log("client connected");
  ws.on("message", (payload: string) => {
    try {
      const data: SocketData = JSON.parse(payload);
      switch (data.event) {
        case "create-new-player":
          createNewPlayer(ws);
          break;
        case "get-all-players":
          getAllPlayers(ws);
          break;
        case "create-new-room":
          createRoom(ws);
          break;
        case "join-room":
          joinRoom(data, ws);
          break;
        case "serve-hand":
          serveHand(data.payload as string, ws);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  });
  ws.on("close", () => {
    console.log("client disconnected");
    removePlayer(ws);
  });
});

app.listen(port, () => {
  console.log("server started");
});
