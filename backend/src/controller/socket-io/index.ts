import { Server } from "socket.io";
import { postMessagesService, getMessagesService } from "../../services/Chats";
import logger from "../../log/logger";

const setupSocket = (server: any) => {
  let onlineUsers: any = [];
  let isMessageSend = false;
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
    socket.on("join_room_id", (userId) => {
      logger.info(`User joined room ${userId}`);
    });
    socket.on("send_message", async (msgData) => {
      try {
        const savedMessages = await postMessagesService(msgData);
        socket.broadcast.emit("receive_message", {
          id: savedMessages[0].id,
          userId: msgData.userId,
          time: msgData.time,
          userName: msgData.userName,
          message: msgData.title,
          recieverId: msgData.recieverId,
          roomId: Number(msgData.roomId),
        });
        socket.emit("receive_message", {
          id: savedMessages[0].id,
          userId: msgData.userId,
          time: msgData.time,
          userName: msgData.userName,
          message: msgData.title,
          recieverId: msgData.recieverId,
          roomId: Number(msgData.roomId),
        });
      } catch (error) {
        console.error("Error sending message:", error.message);
      }
    });
    // socket.on("request_chat_history", async () => {
    //   const fixId = MsgData.userId;

    //   const chatHistory = await getMessagesService();
    //   socket.emit("chat_history", chatHistory);
    // });
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  return io;
};

export default setupSocket;

// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // یک شی برای نگه‌داری اعضای گروه‌ها
// let groups = {
//   'group1': []  // گروه اول
// };

// // اتصال به سوکت
// io.on('connection', (socket) => {
//   console.log('یک کاربر وصل شد:', socket.id);

//   // عضویت کاربر در گروه
//   socket.on('joinGroup', (groupName) => {
//     if (!groups[groupName]) {
//       groups[groupName] = [];
//     }
//     groups[groupName].push(socket.id);
//     console.log(`${socket.id} به گروه ${groupName} پیوست`);
//   });

//   // ارسال پیام به اعضای خاص یک گروه
//   socket.on('sendMessageToGroup', (groupName, receivers, message) => {
//     if (groups[groupName]) {
//       // ارسال پیام فقط به آیدی‌های خاص (در اینجا مثلا آیدی‌های 3 و 5)
//       receivers.forEach(receiverId => {
//         // چک کردن اگر آیدی در گروه وجود دارد
//         if (groups[groupName].includes(receiverId)) {
//           io.to(receiverId).emit('newMessage', message);
//         }
//       });
//     }
//   });

//   // قطع ارتباط کاربر
//   socket.on('disconnect', () => {
//     console.log('یک کاربر قطع ارتباط کرد:', socket.id);
//     // حذف کاربر از گروه‌ها
//     for (let group in groups) {
//       groups[group] = groups[group].filter(id => id !== socket.id);
//     }
//   });
// });
