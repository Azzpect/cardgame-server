import express, { Request, Response } from "express";
import {
  createNewPlayer,
  getAllPlayers,
  removePlayer,
} from "./middlewares/handlePlayers";
import { Server } from "ws";

const app = express();
const port = process.env.PORT || 3000;
const wss = new Server({ port: 5000 });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// websocket connection
type SocketData = {
  event: string;
  data: string;
};
wss.on("connection", (ws) => {
  console.log("client connected");
  ws.on("message", (payload: string) => {
    const data: SocketData = JSON.parse(payload);
    switch (data.event) {
      case "create-new-player":
        createNewPlayer(ws);
        break;
      case "get-all-players":
        getAllPlayers(ws);
        break;
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
