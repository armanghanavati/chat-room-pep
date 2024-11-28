import { NextFunction, Request, Response } from "express";
import { CustomErrorApi } from "../../error/index";
import { z } from "zod";
import logger from "../../log/logger";
const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      logger.error("Caaaaaaaatch Errrror . . .", { error });
      if (error instanceof z.ZodError) {
        logger.error("Validation error occurred: " + error.message);
        return next(new CustomErrorApi("Validation error", 400));
      }
      logger.error("Unexpected error occurred: " + error.message);
      return next(new CustomErrorApi("Internal server error", 500));
    }
  };
};

export default asyncWrapper;
