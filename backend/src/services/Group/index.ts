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

export const postGroupMentionsService = async (payload: GroupMentionsType) => {
  try {
    const connectedDB = await connection();
    const getRepo = connectedDB.getRepository(GroupMentions);

    const newGroup = payload.mentionMmr.map(async (id: number) => {
      const tempGroup = {
        userId: payload.userId,
        mentionMmr: id,
        groupId: payload.groupId,
        groupName: payload.groupName,
      };
      const response = getRepo.create(tempGroup);
      await getRepo.save(response);
    });
    return newGroup;
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
    return getRepo.create({
      groupName: payload.groupName,
    });
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

export const getAllGroupService = async () => {
  try {
    const connectedDB = await connection();
    const getRepo = connectedDB.getRepository(Group);
    return getRepo.find();
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

// const deleteGroupService = async (id: number) => {
//   return await PC.group.delete({
//     where: {
//       id,
//     },
//   });
// };
