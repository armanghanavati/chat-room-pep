import { Router } from "express";
import MessagesRouter from "./addMessages";
import postRouter from "./addMessages";
import loginData from "./loginData";

const getAllRouter = () => {
  const router = Router();
  router.use("/chatRoom", postRouter);
  router.use("/login", loginData);
  return router;
};

export default getAllRouter;
