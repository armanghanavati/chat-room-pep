import { Router } from "express";
import {
  uploadFile,
  getAllMessages,
  postMessageWithUsers,
  getMessage,
} from "../../controller/messages";

const router = Router();

// router.post("/uploader", uploadFile);
router.post("/uploader", uploadFile);
router.get("/getMessage/:userId", getMessage);
router.get("/getAllMessage", getAllMessages);
router.post("/msgWithUsers", postMessageWithUsers);

export default router;
