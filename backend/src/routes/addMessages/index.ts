import { Router } from "express";
import {
  postGroup,
  getAllGroup,
  getGroup,
  editGroup,
  deleteGroup,
  uploadFile,
  getAllMessages,
} from "../../controller/messages";

const router = Router();

// router.post("/", postGroup);
// router.get("/", getAllGroup);
// router.get("/:id", getGroup);
// router.put("/:id", editGroup);
// router.delete("/:id", deleteGroup);
router.post("/uploader", uploadFile);
router.get("/getAllMessage", getAllMessages);

export default router;
