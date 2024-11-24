"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginData_1 = require("../../controller/loginData");
const router = (0, express_1.Router)();
router.get("/:userId", loginData_1.getRouteId);
exports.default = router;
//# sourceMappingURL=index.js.map