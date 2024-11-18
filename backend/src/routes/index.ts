import { Router } from "express";
import postRouter from "./addMessages";
import loginData from "./loginData";
import group from "./group";

const getAllRouter = () => {
  const router = Router();

  router.use("/group", group);
  router.use("/chatRoom", postRouter);
  router.use("/login", loginData);
  return router;
};

export default getAllRouter;
