"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessageWithUsers = exports.getAllMessages = exports.uploadFile = void 0;
const http_status_codes_1 = require("http-status-codes");
const formidable_1 = __importDefault(require("formidable"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Chats_1 = require("../../services/Chats");
const uploadsDir = path_1.default.join(__dirname, "testUpload");
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir);
}
const uploadFile = async (req, res) => {
    try {
        const form = (0, formidable_1.default)({
            uploadDir: uploadsDir,
            keepExtensions: true,
            maxFields: 5,
            maxFieldsSize: 100 * 1024 * 1024,
        });
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
                message: "File uploaded successfully",
                files: files,
            });
        });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
};
exports.uploadFile = uploadFile;
const getAllMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const fixId = Number(userId);
        const allMessages = await (0, Chats_1.getMessagesService)(fixId);
        res.status(200).json({ data: allMessages, code: 0 });
    }
    catch (error) {
        res.status(500).json({ error, code: 1 });
    }
};
exports.getAllMessages = getAllMessages;
const postMessageWithUsers = async (req, res) => {
    const { userId, recieverId, userName, title } = req.body;
    console.log(req.body);
    try {
        const userMentions = await (0, Chats_1.postMessageWithUsersService)({
            userId,
            recieverId,
            userName,
            title,
        });
        console.log(userMentions);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ data: userMentions, code: 0 });
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};
exports.postMessageWithUsers = postMessageWithUsers;
//# sourceMappingURL=index.js.map