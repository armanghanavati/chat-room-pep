import { Router } from "express";
import { postGroup, getAllGroup } from "src/controller/groupControl";

const router = Router();

router.post("/postGroup", postGroup);
router.get("/getAllGroup", getAllGroup);

export default router;
