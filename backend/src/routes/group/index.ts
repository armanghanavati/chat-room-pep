import { Router } from "express";
import { postGroupMentions, getAllGroup } from "../../controller/groupControl";

const router = Router();

router.post("/postGroupMentions", postGroupMentions);
router.get("/getAllGroup/:id", getAllGroup);

export default router;
