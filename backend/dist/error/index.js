"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorApi = exports.BadRequest = void 0;
const badRequest_1 = __importDefault(require("./badRequest"));
exports.BadRequest = badRequest_1.default;
const customError_1 = require("./customError");
Object.defineProperty(exports, "CustomErrorApi", { enumerable: true, get: function () { return customError_1.CustomErrorApi; } });
//# sourceMappingURL=index.js.map