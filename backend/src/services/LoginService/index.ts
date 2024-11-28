import { LoginInfo } from "../../entities/login";
import connection from "../../db";

export const postTokenService = async (payload: any) => {
  try {
    // if (
    //   typeof payload.token !== "string" ||
    //   typeof payload.userId !== "string" ||
    //   typeof payload.userName !== "string"
    // ) {
    //   throw new Error(
    //     "Invalid payload: token, userId, and userName must all be strings."
    //   );
    // }

    const connectedDB = await connection();
    const getRepoEntity = connectedDB.getRepository(LoginInfo);
    const loginInfo = getRepoEntity.create({
      token: payload.token,
      userName: payload.userName,
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
