"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const Chats_1 = require("../../services/Chats");
const setupSocket = (server) => {
    let onlineUsers = [];
    let isMessageSend = false;
    const io = new socket_io_1.Server(server, {
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
                onlineUsers = onlineUsers.filter((user) => user !== userId);
                io.emit("update_online_users", onlineUsers);
                console.log("Online users:", onlineUsers);
            });
        });
        socket.on("join_room_id", (userId) => {
            console.log(`User joined room ${userId}`);
        });
        socket.on("send_message", async (MsgData) => {
            const savedMessage = await (0, Chats_1.postMessagesService)(MsgData);
            socket.broadcast.emit("receive_message", {
                id: savedMessage.id,
                userId: MsgData.userId,
                time: MsgData.time,
                userName: MsgData.userName,
                message: MsgData.title,
                recieverId: MsgData.recieverId,
            });
            socket.emit("receive_message", {
                id: savedMessage.id,
                userId: MsgData.userId,
                time: MsgData.time,
                userName: MsgData.userName,
                message: MsgData.title,
                recieverId: MsgData.recieverId,
            });
        });
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
    return io;
};
exports.default = setupSocket;
//# sourceMappingURL=index.js.map