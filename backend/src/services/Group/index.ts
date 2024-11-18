import { PrismaPg } from "@prisma/adapter-pg";
import connection from "../../db";
import Group from "../../entities/room";
import { GroupType } from "./types";

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

const postGroupService = async (payload: GroupType) => {
  try {
    const connectedDB = await connection();
    const newGroup = connectedDB.getRepository(Group).create({
      usersId: payload.usersId,
      recieverId: payload.recieverId,
      groupName: payload.groupName,
    });
    await connectedDB.getRepository(Group).save(newGroup);
    return newGroup;
  } catch (error) {
    console.error("Error for post group services . . . ");
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

export {
  // deleteGroupService,
  // getGroupService,
  // getAllgroupService,
  postGroupService,
  // editGroupService,
};
