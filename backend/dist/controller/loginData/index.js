"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteId = void 0;
const eventEmmiter_1 = __importDefault(require("../../middleware/event/eventEmmiter"));
const getRouteId = async (req, res) => {
    const { userId } = req.params;
    eventEmmiter_1.default.emit("getId", userId);
    res.send(userId);
};
exports.getRouteId = getRouteId;
//# sourceMappingURL=index.js.map