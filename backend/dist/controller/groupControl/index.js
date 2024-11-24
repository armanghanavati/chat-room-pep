"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGroup = exports.postGroup = void 0;
const http_status_codes_1 = require("http-status-codes");
const Group_1 = require("../../services/Group");
const asyncWrapper_1 = __importDefault(require("../../middleware/asyncWrapper"));
const postGroup = (0, asyncWrapper_1.default)(async (req, res) => {
    const { groupName, usersId, recieverId } = req.body;
    const group = await (0, Group_1.postGroupService)({ groupName, usersId, recieverId });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ data: group, code: 0 });
});
exports.postGroup = postGroup;
const getAllGroup = () => { };
exports.getAllGroup = getAllGroup;
//# sourceMappingURL=index.js.map