"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessagesService = exports.postMessageWithUsersService = exports.getMessagesService = void 0;
const Messages_1 = __importDefault(require("../../entities/messages/Messages"));
const db_1 = __importDefault(require("../../db"));
const typeorm_1 = require("typeorm");
const postMessagesService = async (messageData) => {
    var _a;
    try {
        const connectedDB = await (0, db_1.default)();
        const fixRecieverId = (_a = messageData === null || messageData === void 0 ? void 0 : messageData.recieverId) === null || _a === void 0 ? void 0 : _a.map((id) => id);
        const newMessage = connectedDB.getRepository(Messages_1.default).create({
            userId: messageData.userId,
            userName: messageData.userName,
            title: messageData.title,
            recieverId: messageData.recieverId,
        });
        await connectedDB.getRepository(Messages_1.default).save(newMessage);
        return newMessage;
    }
    catch (error) {
        console.error("Error saving message to database:", error);
        throw error;
    }
};
exports.postMessagesService = postMessagesService;
const AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "coappweb",
    username: "sa",
    password: "P@yv@nd123",
    database: "pepDB",
    synchronize: true,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
});
const getMessagesService = async (userId) => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const query = `
        SELECT chat.title, chat.[time], chat.id, chat.recieverId, chat.userId
        FROM [chat-message] chat
        LEFT JOIN AspNetUsers us ON chat.userId = us.Id
        LEFT JOIN AspNetUserRoles userRole ON us.Id = userRole.UserId
        WHERE (1 = IIF((userRole.RoleId = 1 AND us.Id = ${userId}), 1, 0)
        OR (chat.userId = ${userId} OR chat.recieverId = ${userId})
        OR chat.recieverId IS NULL)
        AND chat.id IS NOT NULL
      `;
        const messages = await AppDataSource.query(query);
        return messages;
    }
    catch (error) {
        console.error("Error fetching messages from database:", error);
        throw error;
    }
};
exports.getMessagesService = getMessagesService;
const postMessageWithUsersService = async (payload) => {
    const connectedDB = await (0, db_1.default)();
    const recieverIds = Array.isArray(payload.recieverId)
        ? payload.recieverId
        : null;
    if (recieverIds === null) {
        const newMessageData = {
            userId: payload.userId,
            userName: payload.userName,
            title: payload.title,
            recieverId: null,
        };
        const newMessage = connectedDB
            .getRepository(Messages_1.default)
            .create(newMessageData);
        await connectedDB.getRepository(Messages_1.default).save(newMessage);
        return newMessage;
    }
    const fixRecieverId = await Promise.all(recieverIds.map(async (ids) => {
        const newMessageData = {
            userId: payload.userId,
            userName: payload.userName,
            title: payload.title,
            recieverId: ids !== undefined ? ids : null,
        };
        const newMessage = connectedDB
            .getRepository(Messages_1.default)
            .create(newMessageData);
        await connectedDB.getRepository(Messages_1.default).save(newMessage);
        return newMessage;
    }));
    return fixRecieverId;
};
exports.postMessageWithUsersService = postMessageWithUsersService;
//# sourceMappingURL=index.js.map