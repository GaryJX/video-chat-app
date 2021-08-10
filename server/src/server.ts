import { Server, Socket } from "socket.io";
import { Request, Response } from "express";
import { connect } from "mongoose";
import { v4 as uuid } from "uuid";
require("dotenv").config();

type SocketEventMap = {
  // "send-changes": (delta: object) => void;
  // "receive-changes": (delta: object) => void;
  // "get-document": (documentId: string) => void;
  // "load-document": (documentId: string) => void;
  // "save-document": (document: object) => void;
  "create-room": () => void;
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
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, () => `Server is listening on port ${PORT}`);

const roomConnections: { [key: string]: { name: string; userID: string }[] } =
  {};

io.on("connection", (socket: Socket) => {
  const userID = socket.id;

  socket.on("join-room", ({ roomID, name }) => {
    console.log(roomConnections);
    socket.join(roomID);
    if (!roomConnections.hasOwnProperty(roomID)) {
      roomConnections[roomID] = [];
    }

    if (roomConnections[roomID].length >= 1) {
      // TODO: Currently only handling max 2 users in a room. Eventually allow more users
      const alreadyJoinedUser = roomConnections[roomID][0];
      socket.emit("user-connected", alreadyJoinedUser);
      socket.emit("is-initiator", true);
    } else {
      socket.emit("is-initiator", false);
    }

    roomConnections[roomID].push({ name, userID });
    socket.broadcast.to(roomID).emit("user-connected", { name, userID });

    socket.on("peer-signal", (signal) => {
      socket.broadcast.to(roomID).emit("peer-signal", signal);
    });

    socket.on("disconnect", () => {
      roomConnections[roomID] =
        roomConnections[roomID]?.filter((user) => user.userID !== userID) || [];
      if (roomConnections[roomID].length === 0) delete roomConnections[roomID];

      socket.broadcast.to(roomID).emit("user-disconnected", userID);
    });
  });
});
