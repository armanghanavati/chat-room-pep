import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { postGroupService } from "../../services/Group";
import { EditGroupSchema } from "../groupControl/groupValid";
import { date } from "zod";
import { group } from "console";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import { getMessagesService } from "../../services/Chats";

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

    form.parse(req, (err, fields, files): any => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.status(StatusCodes.ACCEPTED).json({
        message: "File uploaded successfully",
        files: files,
      });
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const allMessages = await getMessagesService();
    res.status(200).json({ data: allMessages, code: 0 });
  } catch (error) {
    res.status(500).json({ error, code: 1 });
  }
};

export { uploadFile, getAllMessages };
