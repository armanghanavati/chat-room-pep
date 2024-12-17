import { LoginInfo } from "../../entities/login";
import connection from "../../db";
import asyncWrapper from "../../middleware/asyncWrapper";

export const postTokenService = async (payload: any) => {
  try {
    // if (
    //   typeof payload.token !== "string" ||
    //   typeof payload.userId !== "string" ||
    //   typeof payload.username !== "string"
    // ) {
    //   throw new Error(
    //     "Invalid payload: token, userId, and username must all be strings."
    //   );
    // }

    const connectedDB = await connection();
    const getRepoEntity = connectedDB.getRepository(LoginInfo);
    const loginInfo = getRepoEntity.create({
      token: payload.token,
      username: payload.username,
      userId: payload.userId,
      userRole: payload.userId,
    });
    await getRepoEntity.save(loginInfo);

    return loginInfo;
  } catch (error) {
    console.error("Error for post token services . . . ", error.message);
    throw error;
  }
};

export const getTokenPepService = async (userId: any) => {
  try {
    const connectedDB = await connection();
    const getRepoEntity = connectedDB.getRepository(LoginInfo);
    const userInfo = await getRepoEntity.findOne({
      where: {
        userId: userId,
      },
      order: {
        id: "DESC",
      },
    });
    return userInfo;
  } catch (error) {
    console.error("Error for get token services . . . ", error.message);
    throw error;
  }
};

export const getAllAdminChatService = async () => {
  try {
    const connectedDB = await connection();
    const query = `
   select * From AspNetUsers usr
   join AspNetUserRoles ur on usr.Id=ur.UserId
   where ur.RoleId=37
      `;
    const messages = await connectedDB.query(query);
    return messages;
  } catch (error) {
    console.error("Error for get token services . . . ", error.message);
    throw error;
  }
};
