import { LoginInfo } from "src/entities/login";
import connection from "../../db";

export const postTokenService = async (payload: any) => {
  try {
    const connectedDB = await connection();
    const getRepoEntity = connectedDB.getRepository(LoginInfo);
    const loginInfo = getRepoEntity.create({
      token: payload.token,
      userName: payload.userName,
      userId: payload.userId,
    });
    await getRepoEntity.save(loginInfo);
    console.log("getRepoEntity", getRepoEntity);

    return loginInfo;
  } catch (error) {
    console.error("Error for post token services . . . ");
    throw error;
  }
};
