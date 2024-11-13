import { Router } from "express";
import {
  postGroup,
  getAllGroup,
  getGroup,
  editGroup,
  deleteGroup,
  uploadFile,
} from "../../controller/messages";

const router = Router();

router.post("/", postGroup);
router.get("/", getAllGroup);
router.get("/:id", getGroup);
router.put("/:id", editGroup);
router.delete("/:id", deleteGroup);
router.post("/uploader", uploadFile);

export default router;
