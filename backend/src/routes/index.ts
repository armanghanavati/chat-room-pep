import { Router } from "express";
import chatRoom from "./chatRoom";
import loginData from "./loginData";
import group from "./group";

const getAllRouter = () => {
  const router = Router();

  router.use("/group", group);
  router.use("/chatRoom", chatRoom);
  router.use("/login", loginData);
  
  return router;
};

export default getAllRouter;
