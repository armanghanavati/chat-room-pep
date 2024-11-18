import { z } from "zod";

export const EditGroupSchema = z.object({
  groupName: z.string().min(1, "حداقل نام کاربری باید یک حرف باشد"),
  usersId: z.number().min(4, "آیدی کاربر باید بزرگتر از یا برابر با 4 باشد"),
  recieverId: z.number().int().min(1, "کاربران منشن شده اجباری هستند"),
});
