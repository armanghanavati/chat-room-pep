import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { postGroupService } from "../../services/Group";
import { EditGroupSchema } from "../groupControl/groupValid";
import { date } from "zod";
import { group } from "console";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import {
  getAllMessageService,
  getMessagesService,
  postMessageWithUsersService,
} from "../../services/Chats";
import asyncWrapper from "../../middleware/asyncWrapper";
import logger from "../../log/logger";

const uploadsDir = path.join(__dirname, "testUpload");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const uploadFile = async (req: Request, res: Response) => {
  try {
    const form = formidable({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFields: 5,
      maxFieldsSize: 100 * 1024 * 1024,
    });

    console.log(form);

    form.parse(req, (err, fields, files): any => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      console.log("fields", fields);

      // const fileData = {
      //   userId: fields.userId, // اطمینان حاصل کنید که userId را از کلاینت دریافت می‌کنید
      //   filePath: files.file.filepath, // تغییر دهد بر اساس نام کلید خود در فایل آپلود شده
      //   fileName: files.file.originalFilename, // تغییر بده برای نام اصلی فایل
      // };

      res.status(StatusCodes.ACCEPTED).json({
        message: "File uploaded successfully",
        files: files,
      });
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, roomId } = req.query;
    if (!userId || !roomId) {
      res.status(400).json({ error: "userId and roomId are required." });
    }
    const userIdNumb = Number(userId);
    const roomIdNumb = Number(roomId);
    const allMessages = await getMessagesService(userIdNumb, roomIdNumb);
    res.status(200).json({ data: allMessages, code: 0 });
  } catch (error) {
    res.status(500).json({ error, code: 1 });
  }
};

const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId, role } = req.params;
    console.log("getAllMessages", roomId, role);

    const allMessages = await getAllMessageService({ roomId, role });
    res.status(200).json({ data: allMessages, code: 0 });
  } catch (error) {
    res.status(500).json({ error, code: 1 });
  }
};

const postMessageWithUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, recieverId, username, title } = req.body;

  try {
    const userMentions = await postMessageWithUsersService({
      userId,
      recieverId,
      username,
      title,
    });

    console.log(userMentions);
    res.status(StatusCodes.CREATED).json({ data: userMentions, code: 0 });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export { uploadFile, getAllMessages, postMessageWithUsers, getMessage };
