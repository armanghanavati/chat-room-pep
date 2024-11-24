"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditGroupSchema = void 0;
const zod_1 = require("zod");
exports.EditGroupSchema = zod_1.z.object({
    groupName: zod_1.z.string().min(1, "حداقل نام کاربری باید یک حرف باشد"),
    usersId: zod_1.z.number().min(4, "آیدی کاربر باید بزرگتر از یا برابر با 4 باشد"),
    recieverId: zod_1.z.number().int().min(1, "کاربران منشن شده اجباری هستند"),
});
//# sourceMappingURL=groupValid.js.map