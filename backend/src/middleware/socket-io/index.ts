import { Server } from "socket.io";
import { postMessagesService } from "../../services/Chats";

const setupSocket = (server: any) => {
  let onlineUsers: any = [];
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`);
    });

    socket.on("join_home", (userId) => {
      if (!onlineUsers.includes(userId)) {
        onlineUsers.push(userId);
      }
      io.emit("update_online_user", onlineUsers);

      socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user: any) => user !== userId);
        io.emit("update_online_users", onlineUsers);
        console.log(onlineUsers);
      });
    });

    socket.on("send_message", async (MsgData) => {
      console.log("MsgData", MsgData);

      // روم
      // socket.to(MsgData.roomId).emit("receive_message", savedMessage);
      // socket.to(MsgData.roomId).emit("receive_message", {
      //   id: socket.id,
      //   userId: MsgData.userId,
      //   message: MsgData.title,
      //   time: MsgData.time,
      // });
      // socket.emit("recive_message", {
      //   id: socket.id,
      //   userId: MsgData.userId,
      //   userName: MsgData.userName,
      //   message: MsgData.title,
      //   time: MsgData.time,
      // });

      const savedMessage = await postMessagesService(MsgData);
      // ارسال پیام به دیگر کاربران
      socket.broadcast.emit("receive_message", savedMessage);
      // socket.emit("receive_message", savedMessage); // گزینه برای ارسال به خود فرستنده
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  return io;
};

export default setupSocket;