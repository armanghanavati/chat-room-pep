"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatRoom_1 = __importDefault(require("./chatRoom"));
const loginData_1 = __importDefault(require("./loginData"));
const group_1 = __importDefault(require("./group"));
const getAllRouter = () => {
    const router = (0, express_1.Router)();
    router.use("/group", group_1.default);
    router.use("/chatRoom", chatRoom_1.default);
    router.use("/login", loginData_1.default);
    return router;
};
exports.default = getAllRouter;
//# sourceMappingURL=index.js.map