import { PrismaClient } from "@prisma/client";
import Messages from "../../entities/messages/Messages";
import connection from "../../db";
import Mentions from "../../entities/mentions";
import { DataSource, getConnection } from "typeorm";

const postMessagesService = async (messageData: any) => {
  try {
    const connectedDB = await connection();
    const fixRecieverId = messageData?.recieverId?.map((id: number) => id);
    console.log("fixRecieverId fixRecieverId", fixRecieverId);

    const newMessage = connectedDB.getRepository(Messages).create({
      userId: messageData.userId,
      userName: messageData.userName,
      title: messageData.title,
      recieverId: messageData.recieverId,
    });

    await connectedDB.getRepository(Messages).save(newMessage);
    return newMessage;
  } catch (error) {
    console.error("Error saving message to database:", error);

    throw error;
  }
};

// export const getMessagesService = async () => {
//   try {
//     const connectedDB = await connection();
//     const messageRepo = connectedDB.getRepository(Messages);
//     const messages = await messageRepo.find();
//     return messages;
//   } catch (error) {
//     console.error("Error saving message to database:", error);
//     throw error;
//   }
// };

const AppDataSource = new DataSource({
  type: "mssql",
  host: "coappweb",
  username: "sa",
  password: "P@yv@nd123",
  database: "pepDB",
  // entities: [Messages, Group, Mentions, Reciever],
  // entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: true,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
});

// تابع getMessagesService
export const getMessagesService = async (userId: number) => {
  try {
    // اتصال به پایگاه داده
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

    // اجرای Query
    const messages = await AppDataSource.query(query);

    return messages;
  } catch (error) {
    console.error("Error fetching messages from database:", error);
    throw error;
  }
};

export const postMessageWithUsersService = async (payload: any) => {
  const connectedDB = await connection();

  const fixRecieverId = payload?.recieverId?.map(async (ids: any) => {
    const newMessageData = {
      userId: payload.userId,
      userName: payload.userName,
      title: payload.title,
      recieverId: ids,
    };
    
    const newMessage = connectedDB
      .getRepository(Messages)
      .create(newMessageData);

    await connectedDB.getRepository(Messages).save(newMessage);
  });
  return fixRecieverId;
};

export { postMessagesService };
// export const postMessageWithUsersService = async (payload: any) => {
//   const connectedDB = await connection();

//   console.log("payload payload payload", payload);

//   const newMessage = connectedDB.getRepository(Messages).create({
//     userId: payload.userId,
//     userName: payload.userName,
//     title: payload.title,
//     time: new Date(payload.time),
//   });

//   await connectedDB.getRepository(Messages).save(newMessage);

//   const recieverIds = payload.recieverId;
//   if (Array.isArray(recieverIds)) {
//     const receivers = recieverIds.map((id) => {
//       const reciever = new Reciever();
//       reciever.recieverId = id;
//       reciever.message = newMessage;
//       return reciever;
//     });

//     await connectedDB.getRepository(Reciever).save(receivers);
//   }

//   return newMessage;
// }
