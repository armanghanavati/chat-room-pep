import { Server } from "socket.io";

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
        console.log(
          `gggggggggggggggggg${onlineUsers} ${userId} joined the home dashboard`
        );
      }
      io.emit("update_online_user", onlineUsers);

      socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user: any) => user !== userId);
        io.emit("update_online_users", onlineUsers);
      });
    });

    socket.on("send_message", (MsgData) => {
      socket.to(MsgData.roomId).emit("receive_message", {
        id: socket.id,
        userId: MsgData.userId,
        message: MsgData.title,
      });
      socket.emit("recive_message", {
        id: socket.id,
        userId: MsgData.userId,
        message: MsgData.title,
      });
      // ارسال پیام به دیگر کاربران
      //   socket.broadcast.emit("receive_message", {
      //     id: socket.id,
      //     userId: MsgData.userId,
      //     message: MsgData.title,
      //   });
      // });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

export default setupSocket;
