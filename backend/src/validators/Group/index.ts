import { z } from "zod";

export const EditGroupSchema = z.object({
  name: z.string().min(1, "نام کاربری موجود نیست"), // تضمین می‌کند که نام وجود داشته باشد
});

// export const EditGroupSchema = z.object({
//     name: z.string().min(1, "Name is required"),
//     date: z.string().optional(), // ممکن است تاریخ وجود نداشته باشد
//     email: z.string().email("Invalid email format").optional(), // ایمیل اختیاری با فرمت صحیح
//     password: z.string().min(6, "Password must be at least 6 characters").optional(), // رمز عبور با حداقل 6 کاراکتر
//   });
