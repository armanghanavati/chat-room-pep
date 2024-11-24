"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../../error/index");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof index_1.CustomErrorApi) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("مشکل ارتباط با سرور");
};
exports.default = errorHandler;
//# sourceMappingURL=index.js.map