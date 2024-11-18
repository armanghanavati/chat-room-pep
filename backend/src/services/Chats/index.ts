import { PrismaClient } from "@prisma/client";
import Messages from "../../entities/messages/Messages";
import connection from "../../db";
import Mentions from "../../entities/mentions";

const postMessagesService = async (messageData: any) => {
  try {
    console.log(messageData);
    const connectedDB = await connection();
    const fixRecieverId = messageData.recieverId.map((id: number) => id);

    const newMessage = connectedDB.getRepository(Messages).create({
      userId: messageData.userId,
      userName: messageData.userName,
      title: messageData.title,
      recieverId: fixRecieverId,
      // newMessage.setRecieverIds([15, 10, 9]);
      // roomId: "1",
    });

    await connectedDB.getRepository(Messages).save(newMessage);
    return newMessage;
  } catch (error) {
    console.error("Error saving message to database:", error);

    throw error;
  }
};

export const getMessagesService = async () => {
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

export const postMessageWithUsersService = async (payload: any) => {
  // if (
  //   !payload.recieverId ||
  //   !Array.isArray(payload.recieverId) ||
  //   payload.recieverId.length === 0
  // ) {
  //   throw new Error("recieverId must be a non-empty array.");
  // }
  const connectedDB = await connection();
  const fixRecieverId = payload.recieverId.map((id: number) => id);

  const newMessage = connectedDB.getRepository(Messages).create({
    userId: payload.userId,
    userName: payload.userName,
    title: payload.title,
    recieverId: fixRecieverId,
    // newMessage.setRecieverIds([15, 10, 9]);
    // roomId: "1",
  });

  // const mentions: Mentions[] = payload.recieverId.map((id: number) => {
  //   return mentionsRepository.create({
  //     recieverId: id,
  //   });
  // });
  await connectedDB.getRepository(Messages).save(newMessage);
  return newMessage;
};

// const PC = new PrismaClient();
// const getMessagesByRoomId = async (roomId: any) => {
//   try {
//     return await PC.message.findMany({
//       where: { roomId },
//       orderBy: { timestamp: "desc" },
//     });
//   } catch (error) {
//     console.error("Error retrieving messages:", error);
//     return []; // در صورت بروز خطا یک آرایه خالی بازمی‌گرداند
//   }
// };

export { postMessagesService };
