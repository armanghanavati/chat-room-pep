"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groupControl_1 = require("../../controller/groupControl");
const router = (0, express_1.Router)();
router.post("/postGroup", groupControl_1.postGroup);
router.get("/getAllGroup", groupControl_1.getAllGroup);
exports.default = router;
//# sourceMappingURL=index.js.map