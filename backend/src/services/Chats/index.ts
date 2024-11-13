import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const postMessagesService = async (messageData: any) => {
  try {
    console.log(messageData, process.env.DATABASE_URL);
    return prismaClient.message.create({
      data: {
        userId: messageData.userId,
        userName: messageData.userName,
        content: messageData.title,
        roomId: messageData.roomId,
      },
    });
  } catch (error) {
    console.error("Error saving message to database:", error);
    throw error;
  }
};

export { postMessagesService };
