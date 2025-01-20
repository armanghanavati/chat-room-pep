import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { postGroupService } from "../../services/Group";
import { EditGroupSchema } from "../groupControl/groupValid";
import { date } from "zod";
import { group, log } from "console";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import {
  getAllMessageService,
  getMessagesService,
  postMessageWithUsersService,
  uploadFileService,
} from "../../services/Chats";

const uploadsDir = path.join(__dirname, "testUpload");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const uploadFile = async (req: Request, res: Response): Promise<any> => {
  try {
    const form = formidable({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFields: 5,
      maxFieldsSize: 100 * 1024 * 1024,
      multiples: false,
    });
    const parseFormPromise = () => {
      return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            return reject(err);
          }
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          resolve({ fields, files });
        });
      });
    };

    const { fields, files }: any = await parseFormPromise();
    console.log(
      "fields, filesfields, filesfields, filesfields, files",
      fields,
      files
    );

    const getFormFile = files?.formFile;
    const uploadedFileKeys = Object.keys(files);

    if (uploadedFileKeys.length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const uploadedFileKey = uploadedFileKeys[0];
    const uploadedFile = files[uploadedFileKey];

    const payload = {
      attachmentId: fields?.attachmentId[0],
      attachmentType: fields?.attachmentType[0],
      attachmentName: fields?.attachmentName[0],
    };
    console.log("payload", payload);
    const allFiles: any = await uploadFileService(payload);
    if (allFiles) {
      return res.status(StatusCodes.ACCEPTED).json({
        message: "File uploaded successfully",
        files: files,
      });
    }
  } catch (error) {
    console.error("Error during file upload:", error);
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
