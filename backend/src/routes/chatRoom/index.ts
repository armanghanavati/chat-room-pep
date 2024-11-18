import { Router } from "express";
import {
  uploadFile,
  getAllMessages,
  postMessageWithUsers,
} from "../../controller/messages";

const router = Router();

router.post("/uploader", uploadFile);
router.get("/getAllMessage", getAllMessages);
router.post("/msgWithUsers", postMessageWithUsers);

export default router;
