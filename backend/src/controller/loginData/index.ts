import { StatusCodes } from "http-status-codes";
import eventEmitter from "../../middleware/event/eventEmmiter";
import { Request, Response } from "express";
import {
  getAllAdminChatService,
  getTokenPepService,
  postTokenService,
} from "../../services/LoginService";

const postToken = async (req: Request, res: Response): Promise<any> => {
  const { token, userId, username, userRole } = req.body;

  const loginData = await postTokenService({
    token,
    userId,
    username,
    userRole,
  });

  await eventEmitter.emit("loginData", { ...req.body });

  if (!token || !userId || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "یکی از فیلد های مورد نظر ارسال نشده" });
  }
  res.status(StatusCodes.ACCEPTED).json({ data: loginData, code: 0 });
};

const getTokenPep = async (req: Request, res: Response): Promise<any> => {
  // const timeout = setTimeout(() => {
  //   eventEmitter.removeListener("loginData", dataListener);
  //   return res
  //     .status(StatusCodes.REQUEST_TIMEOUT)
  //     .json({ msg: "Request timed out" });
  // }, 10000);

  // const dataListener = (data: any) => {
  //   console.log("Received data from event emitter:", data);
  //   clearTimeout(timeout);
  //   res.status(StatusCodes.OK).json({ data, code: 0 });
  //   eventEmitter.removeListener("loginData", dataListener);
  // };

  // eventEmitter.on("loginData", dataListener);

  // req.on("close", () => {
  //   clearTimeout(timeout);
  //   eventEmitter.removeListener("loginData", dataListener);
  // });

  const { userId } = req.params;
  try {
    const userInfo = await getTokenPepService(userId);
    if (!userInfo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found", code: 1 });
    }
    return res.status(StatusCodes.OK).json({ data: userInfo, code: 0 });
  } catch (error) {
    console.error("Error fetching user info", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", code: 2 });
  }
};

const getAllAdminChat = async (req: Request, res: Response): Promise<void> => {
  const adminChat = await getAllAdminChatService();
  console.log(adminChat);
  res.status(StatusCodes.OK).json({ data: adminChat, code: 0 });
};

export { postToken, getTokenPep, getAllAdminChat };
