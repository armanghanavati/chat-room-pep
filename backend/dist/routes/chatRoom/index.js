"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_1 = require("../../controller/messages");
const router = (0, express_1.Router)();
router.post("/uploader", messages_1.uploadFile);
router.get("/getAllMessage/:userId", messages_1.getAllMessages);
router.post("/msgWithUsers", messages_1.postMessageWithUsers);
exports.default = router;
//# sourceMappingURL=index.js.map