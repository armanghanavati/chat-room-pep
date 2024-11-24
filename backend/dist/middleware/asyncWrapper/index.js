"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../error/index");
const zod_1 = require("zod");
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            console.log("Caaaaaaaatch Errrror . . .", error);
            if (error instanceof zod_1.z.ZodError) {
                return next(new index_1.CustomErrorApi("Validation error", 400));
            }
            return next(new index_1.CustomErrorApi("Internal server error", 500));
        }
    };
};
exports.default = asyncWrapper;
//# sourceMappingURL=index.js.map