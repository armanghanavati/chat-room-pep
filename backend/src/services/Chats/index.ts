import { Messages } from "../../entities/messages/Messages";
import connection from "../../db";
import { DataSource } from "typeorm";

export const postMessagesService = async (messageData: {
  userId: number; // Changed to number to match the entity definition
  userName: string;
  title: string;
  recieverId: number[] | null; // Also changed to number to match entity
}) => {
  try {
    console.log("messageData", messageData);
    const connectedDB = await connection();
    const connectModel = connectedDB.getRepository(Messages);

    if (messageData.recieverId?.length) {
      const fixRecieverId = await Promise.all(
        messageData.recieverId.map(async (id) => {
          const newMessageData = {
            userId: messageData.userId,
            userName: messageData.userName,
            title: messageData.title,
            recieverId: id,
          };

          const newMessage = connectModel.create(newMessageData);
          await connectModel.save(newMessage);

          return newMessage;
        })
      );
      return fixRecieverId;
    } else {
      const newMessage = connectModel.create({
        userId: messageData.userId,
        userName: messageData.userName,
        title: messageData.title,
        recieverId: null,
      });
      await connectModel.save(newMessage);
      return [newMessage];
    }
  } catch (error) {
    console.error("Error saving message to database:", error.message);
    throw new Error("Database error: " + error.message);
  }
};

export const getAllMessageService = async () => {
  try {
    const connectedDB = await connection();
    const messageRepo = connectedDB.getRepository(Messages);
    const messages = await messageRepo.find();
    return messages;
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

// تابع getMessagesService
export const getMessagesService = async (userId: number) => {
  try {
    // اتصال به پایگاه داده
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const query = `
        SELECT chat.title, chat.[time], chat.id, chat.recieverId, chat.userId , chat.userName
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

    console.log(messages);

    return messages;
  } catch (error) {
    console.error("Error fetching messages from database:", error);
    throw error;
  }
};

export const postMessageWithUsersService = async (payload: any) => {
  const connectedDB = await connection();

  const recieverIds = Array.isArray(payload.recieverId)
    ? payload.recieverId
    : null;

  console.log("recieverIds recieverIds recieverIds", recieverIds, payload);

  if (recieverIds?.length === 0) {
    const newMessageData = {
      userId: payload.userId,
      userName: payload.userName,
      title: payload.title,
      recieverId: null,
    };

    const newMessage = connectedDB
      .getRepository(Messages)
      .create(newMessageData);

    await connectedDB.getRepository(Messages).save(newMessage);
    return newMessage; // return: message when recieverId was null
  }
  const fixRecieverId = await Promise.all(
    recieverIds.map(async (ids: any) => {
      const newMessageData = {
        userId: payload.userId,
        userName: payload.userName,
        title: payload.title,
        recieverId: ids !== undefined ? ids : null,
      };

      const newMessage = connectedDB
        .getRepository(Messages)
        .create(newMessageData);

      await connectedDB.getRepository(Messages).save(newMessage);
      return newMessage;
    })
  );

  return fixRecieverId;
};
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
