import { Server, Socket } from "socket.io";
import { Request, Response } from "express";
import { connect } from "mongoose";
import { v4 as uuid } from "uuid";

// connect("mongodb://localhost:27017/google-docs-clone", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

type SocketEventMap = {
  // "send-changes": (delta: object) => void;
  // "receive-changes": (delta: object) => void;
  // "get-document": (documentId: string) => void;
  // "load-document": (documentId: string) => void;
  // "save-document": (document: object) => void;
  "create-room": () => void; // TODO
  "created-room-id": string;
};
export type SocketEvent = keyof SocketEventMap;

const express = require("express");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);

app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

const PORT = Number(process.env.PORT) || 3001;
// TODO: Change this to an environment variable
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, () => `Server is listening on port ${PORT}`);

io.on("connection", (socket: Socket) => {
  const userID = socket.id;
  socket.on("join-room", ({ roomID, name, signal }) => {
    socket.join(roomID);
    socket.broadcast
      .to(roomID)
      .emit("user-connected", { name, signal, userID });

    socket.on("disconnect", () => {
      socket.broadcast.to(roomID).emit("user-disconnected", userID);
    });
  });
});
