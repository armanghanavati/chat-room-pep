import { PrismaClient } from "@prisma/client";
import Messages from "../../entities/messages/Messages";
import connection from "../../db";

const postMessagesService = async (messageData: any) => {
  try {
    console.log(messageData);
    const connectedDB = await connection();
    const newMessage = connectedDB.getRepository(Messages).create({
      userId: messageData.userId,
      userName: messageData.userName,
      title: messageData.title,
      // content: messageData.content,
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
