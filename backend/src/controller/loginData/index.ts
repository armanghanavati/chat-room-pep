import { StatusCodes } from "http-status-codes";
import eventEmitter from "../../middleware/event/eventEmmiter";
import { Request, Response } from "express";
import { postTokenService } from "../../services/LoginService";

const postToken = async (req: Request, res: Response): Promise<any> => {
  const { token, userId, userName } = req.body;

  const loginData = await postTokenService({ token, userId, userName });

  await eventEmitter.emit("loginData", { ...req.body });

  if (!token || !userId || !userName) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "یکی از فیلد های مورد نظر ارسال نشده" });
  }
  res.status(StatusCodes.ACCEPTED).json({ data: loginData, code: 0 });
};

const getTokenPep = (req: Request, res: Response) => {
  const timeout = setTimeout(() => {
    eventEmitter.removeListener("loginData", dataListener);
    return res
      .status(StatusCodes.REQUEST_TIMEOUT)
      .json({ msg: "Request timed out" });
  }, 10000);

  const dataListener = (data: any) => {
    console.log("Received data from event emitter:", data);
    clearTimeout(timeout);
    res.status(StatusCodes.OK).json({ data, code: 0 });
    eventEmitter.removeListener("loginData", dataListener);
  };

  eventEmitter.on("loginData", dataListener);

  req.on("close", () => {
    clearTimeout(timeout);
    eventEmitter.removeListener("loginData", dataListener);
  });
};

export { postToken, getTokenPep };
