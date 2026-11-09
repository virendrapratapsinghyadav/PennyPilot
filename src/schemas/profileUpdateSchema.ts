import { z } from "zod";

export const profileUpdateSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().email(),

    oldpassword: z.string(),
    newpassword: z.string(),
  })
  .superRefine((data, ctx) => {
    const oldPasswordEntered = data.oldpassword.length > 0;
    const newPasswordEntered = data.newpassword.length > 0;

    // If either password is entered, require both.
    if (oldPasswordEntered || newPasswordEntered) {
      if (!oldPasswordEntered) {
        ctx.addIssue({
          code: "custom",
          path: ["oldpassword"],
          message: "Current password is required",
        });
      }

      if (!newPasswordEntered) {
        ctx.addIssue({
          code: "custom",
          path: ["newpassword"],
          message: "New password is required",
        });
      }

      if (newPasswordEntered && data.newpassword.length < 8) {
        ctx.addIssue({
          code: "custom",
          path: ["newpassword"],
          message: "Password must be at least 8 characters",
        });
      }
    }
  });

export type profileUpdateFormData = z.infer<
  typeof profileUpdateSchema
>;