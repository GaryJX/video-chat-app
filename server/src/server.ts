import { Server, Socket } from "socket.io";
import { connect } from "mongoose";
import { v4 as uuid } from "uuid";

connect("mongodb://localhost:27017/google-docs-clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

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

const PORT = Number(process.env.PORT) || 3001;
console.log(`Starting socket.io server on port ${PORT}`);
const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

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

  // socket.on("get-document", async (documentId: string) => {
  //   const document = await findOrCreateDocument(documentId);
  //   socket.join(documentId);
  //   socket.emit("load-document", document.data);

  //   socket.on("send-changes", (delta) => {
  //     socket.broadcast.to(documentId).emit("receive-changes", delta);
  //   });

  //   socket.on("save-document", async (data) => {
  //     // await Document.findByIdAndUpdate(documentId, { data });
  //   });
  // });
});
