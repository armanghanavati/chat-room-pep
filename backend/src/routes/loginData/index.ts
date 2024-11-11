import { Router } from "express";
import { getRouteId } from "../../controller/loginData";

const router = Router();
router.get("/:userId", getRouteId);

export default router;
