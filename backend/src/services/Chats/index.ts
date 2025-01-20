import { Messages } from "../../entities/messages/Messages";
import connection from "../../db";
import { DataSource } from "typeorm";
import logger from "../../log/logger";

export const postMessagesService = async (messageData: {
  userId: number;
  username: string;
  title: string;
  recieverId: number[] | null;
  roomId: number;
}) => {
  try {
    logger.info(messageData);
    const connectedDB = await connection();
    const connectModel = connectedDB.getRepository(Messages);

    if (messageData.recieverId?.length) {
      const fixRecieverId = await Promise.all(
        messageData.recieverId.map(async (id) => {
          const newMessageData = {
            userId: messageData.userId,
            username: messageData.username,
            title: messageData.title,
            recieverId: id,
            roomId: messageData.roomId,
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
        username: messageData.username,
        title: messageData.title,
        recieverId: null,
        roomId: messageData.roomId,
      });
      const main = await connectModel.save(newMessage);
      console.log("main", main);
      return [main];
    }
  } catch (error) {
    console.error("Error saving message to database:", error.message);
    throw new Error("Database error: " + error.message);
  }
};

export const getAllMessageService = async (payload: any) => {
  try {
    console.log("role", payload);
    const numbRole = Number(payload?.role);
    const numbRoomId = Number(payload?.roomId);
    const connectedDB = await connection();
    const messageRepo = connectedDB.getRepository(Messages);
    if (payload?.roomId === 0) {
      const messages = await messageRepo.find({
        where: {
          roomId: payload?.roomId,
        },
      });
      return messages;
    } else {
      const messages = await messageRepo.find({
        where: {
          roomId: payload?.roomId,
        },
      });
      return messages;
    }
  } catch (error) {
    console.error("Error saving message to database:", error);
    throw error;
  }
};

export const getMessagesService = async (
  userId: number | string,
  roomId: number
) => {
  try {
    const connectedDB = await connection();
    const query = `
        SELECT distinct chat.title, chat.[time], chat.id, chat.recieverId, chat.userId , chat.username, chat.roomId
        FROM [messages] chat
        LEFT JOIN AspNetUsers us ON chat.userId = us.Id
        LEFT JOIN AspNetUserRoles userRole ON us.Id = userRole.UserId
        where (chat.userId = ${userId} OR chat.recieverId = ${userId}
        OR chat.recieverId IS NULL)
        and roomId = ${roomId}`;
    const messages = await connectedDB.query(query);
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

  if (recieverIds?.length === 0) {
    const newMessageData = {
      userId: payload.userId,
      username: payload.username,
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
        username: payload.username,
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

export const uploadFileService = async (payload: any) => {
  
};
// export const postMessageWithUsersService = async (payload: any) => {
//   const connectedDB = await connection();

//   console.log("payload payload payload", payload);

//   const newMessage = connectedDB.getRepository(Messages).create({
//     userId: payload.userId,
//     username: payload.username,
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
