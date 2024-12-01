import { QueryFailedError } from "typeorm";
import connection from "../../db";
import { Group } from "../../entities/group";
import { GroupType, GroupMentionsType } from "./types";
import logger from "../../log/logger";
import { GroupMentions } from "../../entities/groupMentions";

// const getGroupService = async (id: number) => {
//   return await PC.group.findFirst({
//     where: { id },
//     // where: { id:id },
//   });
// };

// const editGroupService = async (id: number, payload: { name: string }) => {
//   return await PC.group.update({
//     where: {
//       id: id,
//     },
//     data: {
//       name: payload.name,
//     },
//   });
// };

// const getAllgroupService = async () => {
//   return await PC.group.findMany();
// };

export const postGroupMentionsService = async (payload: any) => {
  try {
    const connectedDB = await connection();
    const getRepo = connectedDB.getRepository(GroupMentions);

    const newGroupMentions = await Promise.all(
      payload.mentionMmr.map(async (id: number) => {
        const tempGroup = {
          userId: payload.userId,
          mentionMmr: id,
          groupId: payload.groupId, // اطمینان حاصل کنید که این مقدار به درستی ارسال می‌شود
          groupName: payload.groupName,
        };

        console.log("Saving mention for groupId:", tempGroup); // برای دیباگ

        const response = getRepo.create(tempGroup);
        const savedResponse = await getRepo.save(response);
        console.log("Saved mention:", savedResponse);
        return savedResponse;
      })
    );

    return newGroupMentions; // بازگشت به تمام ذکرها
  } catch (error) {
    if (error instanceof QueryFailedError) {
      logger.error("Query Failed: " + error.message);
      logger.error("Query: " + error.query);
    } else {
      logger.error("Unexpected Error: " + error);
    }
    throw error;
  }
};

export const postGroupService = async (payload: GroupType) => {
  try {
    const connectedDB = await connection();
    const getRepo = connectedDB.getRepository(Group);
    const newGroup = getRepo.create({
      groupName: payload.groupName,
    });
    const savedGroup = await getRepo.save(newGroup);
    return savedGroup;
  } catch (error) {
    if (error instanceof QueryFailedError) {
      logger.error("Query Failed: " + error.message);
      logger.error("Query: " + error.query);
    } else {
      logger.error("Unexpected Error: " + error);
    }
    throw error;
  }
};

export const getAllGroupService = async (userId: number) => {
  try {
    const connectedDB = await connection();
    const response = await connectedDB
      .getRepository(GroupMentions)
      .createQueryBuilder("gm")
      .where("gm.userId = :userId", { userId })
      .andWhere("gm.mentionMmr = :mentionMmr", { mentionMmr: userId })
      .getMany(); // گرفتن تمامی نتایج

    return response; // برگشت نتایج
  } catch (error) {
    if (error instanceof QueryFailedError) {
      logger.error("Query Failed: " + error.message);
      logger.error("Query: " + error.query);
    } else {
      logger.error("Unexpected Error: " + error);
    }
    throw error;
  }
};
