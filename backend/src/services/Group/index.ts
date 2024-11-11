import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const PC = new PrismaClient();

const connectionString = `${process.env.DATABASE_URL}`;

const getGroupService = async (id: number) => {
  return await PC.group.findFirst({
    where: { id },
    // where: { id:id },
  });
};

const editGroupService = async (id: number, payload: { name: string }) => {
  return await PC.group.update({
    where: {
      id: id,
    },
    data: {
      name: payload.name,
    },
  });
};

const getAllgroupService = async () => {
  return await PC.group.findMany();
};

const postGroupService = async (payload: string) => {
  console.log(payload);

  const group = await PC.group.create({
    data: {
      name: payload,
    },
  });
  return group;
};

const deleteGroupService = async (id: number) => {
  return await PC.group.delete({
    where: {
      id,
    },
  });
};

export {
  deleteGroupService,
  getGroupService,
  getAllgroupService,
  postGroupService,
  editGroupService,
};
