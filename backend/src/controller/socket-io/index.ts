import { Server } from "socket.io";
import { postMessagesService, getMessagesService } from "../../services/Chats";

const setupSocket = (server: any) => {
  let onlineUsers: any = [];
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join_home", (userId) => {
      if (!onlineUsers.includes(userId)) {
        onlineUsers.push(userId);
      }
      io.emit("update_online_users", onlineUsers);

      socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user: any) => user !== userId);
        io.emit("update_online_users", onlineUsers);
        console.log("Online users:", onlineUsers);
      });
    });

    socket.on("send_message", async (MsgData) => {
      const savedMessage = await postMessagesService(MsgData);
      socket.broadcast.emit("receive_message", {
        id: savedMessage.id,
        userId: MsgData.userId,
        time: MsgData.time,
        userName: MsgData.userName,
        message: MsgData.title,
      });
    });

    socket.on("request_chat_history", async () => {
      const chatHistory = await getMessagesService();
      socket.emit("chat_history", chatHistory);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  return io;
};

export default setupSocket;

// socket.on("join_room", (roomId) => {
//   socket.join(roomId);
//   console.log(`User joined room ${roomId}`);
// });
