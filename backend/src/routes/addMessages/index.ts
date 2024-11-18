import { Router } from "express";
import { uploadFile, getAllMessages } from "../../controller/messages";

const router = Router();

router.post("/uploader", uploadFile);
router.get("/getAllMessage", getAllMessages);

export default router;
