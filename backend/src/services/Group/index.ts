import { DataSource, QueryFailedError } from "typeorm";
import connection from "../../db";
import { Group } from "../../entities/group";
import { GroupType, GroupMentionsType } from "./types";
import logger from "../../log/logger";
import { GroupMentions } from "../../entities/groupMentions";

export const postGroupMentionsService = async (payload: any) => {
  try {
    const connectedDB = await connection();
    const getRepo = connectedDB.getRepository(GroupMentions);

    const newGroupMentions = await Promise.all(
      payload.mentionMmr?.length &&
        payload?.mentionMmr?.map(async (id: number) => {
          const tempGroup = {
            userId: payload.userId,
            mentionMmr: id,
            groupId: payload.groupId,
            groupName: payload.groupName,
          };

          console.log("Saving mention for groupId:", tempGroup);

          const response = getRepo.create(tempGroup);
          const savedResponse = await getRepo.save(response);
          console.log("Saved mention:", savedResponse);
          return savedResponse;
        })
    );
    return newGroupMentions;

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
    // const response = await connectedDB
    //   .getRepository(GroupMentions)
    //   .createQueryBuilder("gm")
    //   .where("gm.userId = :userId", { userId })
    //   .andWhere("gm.mentionMmr = :mentionMmr", { mentionMmr: userId })
    //   .getMany();
    const query = ` 
SELECT * FROM [pepDB].[dbo].[group_mentions]
where mentionMmr = ${userId}`;

    const response = await connectedDB.query(query);

    console.log("response", response);

    return response;
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
