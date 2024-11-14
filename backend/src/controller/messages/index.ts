import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  postGroupService,
  getAllgroupService,
  getGroupService,
  editGroupService,
  deleteGroupService,
} from "../../services/Group";
import { EditGroupSchema } from "../../validators/Group";
import { date } from "zod";
import { group } from "console";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import { getMessagesService } from "../../services/Chats";

const postGroup = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  const validatedData = EditGroupSchema.parse(req.body);
  try {
    const group = await postGroupService(name);
    res.status(StatusCodes.CREATED).json({ data: group, code: 0 });
  } catch (error) {
    res.status(500).json({ msg: "Error occurred", error });
  }
};

const getAllGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const group = await getAllgroupService();
    res.status(200).json({ data: group, code: 0 });
  } catch (error) {
    res.status(500).json({ error, code: 1 });
  }
};

const getGroup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const groupId = Number(id);

    if (isNaN(groupId)) {
      return res.status(400).json({ msg: "Invalid group ID" });
    }

    const group = await getGroupService(groupId);

    if (!group) return res.status(404).json({ msg: "group has not exisit" });

    return res.status(200).json({ data: group, code: 0 });
  } catch (error) {
    return res.status(200).json({ error, code: 1 });
  }
};

const editGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const groupId = Number(id);
    // const nameValid = EditGroupSchema.parse(name);
    const group = await editGroupService(groupId, { name });
    if (!group) throw new Error("Id has not accepted!");
    res.status(200).json({ data: group, code: 0 });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const deleteGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const NumberId = Number(id);
    const group = await deleteGroupService(NumberId);
    if (!group) throw res.status(404).json({ msg: "Id has not accepted" });
    res
      .status(200)
      .json({ data: group, msg: "data has been deleted", code: 0 });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

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

    console.log(form);
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

export {
  postGroup,
  getAllGroup,
  getGroup,
  editGroup,
  deleteGroup,
  uploadFile,
  getAllMessages,
};
