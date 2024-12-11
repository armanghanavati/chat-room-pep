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
router.get("/getMessage/:userId/:roomId", getMessage);
router.get("/getAllMessage/:roomId/:role", getAllMessages);
router.post("/msgWithUsers", postMessageWithUsers);

export default router;



