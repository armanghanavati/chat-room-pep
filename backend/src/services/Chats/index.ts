import { PrismaClient } from "@prisma/client";
import { Messages } from "../../entities/messages/Messages";
import { connection } from "../../db";
import Mentions from "../../entities/mentions";
import { DataSource, DeepPartial, getConnection } from "typeorm";
// import { Message } from "../../models/messages";

const postMessagesService = async (messageData: any) => {
  try {
    // const connectedDB = await connection();
    // const fixRecieverId = messageData?.recieverId?.map((id: number) => id);
    // const newMessage = connectedDB.getRepository(Messages).create({
    //   userId: messageData.userId,
    //   userName: messageData.userName,
    //   title: messageData.title,
    //   recieverId: messageData.recieverId,
    // });
    // await connectedDB.getRepository(Messages).save(newMessage);
    // return newMessage;
  } catch (error) {
    console.error("Error saving message to database:", error);
    throw error;
  }
};

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

  const fixRecieverId = await Promise.all(
    payload?.recieverId?.map(async (reciever: any) => {
      const newMessageData: DeepPartial<Messages> = {
        userId: payload.userId,
        userName: payload.userName,
        title: payload.title,
        recieverId: reciever || null, // اطمینان از اینکه recieverId می‌تواند null باشد
        time: new Date(),
      };

      const newMessage = await Messages.create(newMessageData).save(); // اضافه کردن .save() برای ذخیره رکورد
      return newMessage;
    })
  );

  return fixRecieverId;
};

export { postMessagesService };
