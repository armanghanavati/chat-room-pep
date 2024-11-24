"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGroupService = void 0;
const db_1 = __importDefault(require("../../db"));
const room_1 = __importDefault(require("../../entities/room"));
const postGroupService = async (payload) => {
    try {
        const connectedDB = await (0, db_1.default)();
        const newGroup = connectedDB.getRepository(room_1.default).create({
            usersId: payload.usersId,
            recieverId: payload.recieverId,
            groupName: payload.groupName,
        });
        await connectedDB.getRepository(room_1.default).save(newGroup);
        return newGroup;
    }
    catch (error) {
        console.error("Error for post group services . . . ");
        throw error;
    }
};
exports.postGroupService = postGroupService;
//# sourceMappingURL=index.js.map