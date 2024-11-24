import { Router } from "express";
import { postToken, getTokenPep } from "../../controller/loginData";

const router = Router();
router.post("/postToken", postToken);
router.get("/getTokenPep", getTokenPep);

export default router;
