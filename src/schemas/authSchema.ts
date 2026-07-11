import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
              .regex(/[A-Z]/, "Must contain at least one uppercase letter")
              .regex(/[a-z]/, "Must contain at least one lowercase letter")
              .regex(/[0-9]/, "Must contain at least one number")
              .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
});
export type LoginFormData = z.infer<typeof loginSchema>;


export const signupSchema = z.object({
    name: z.string()
          .trim()
          .min(2, "Name must be at least 2 characters")
          .max(100, "Name is too long"),

    email: z.email("Please enter a valid email address"),

    password: z.string().min(8, "Password must be at least 8 characters long")
              .regex(/[A-Z]/, "Must contain at least one uppercase letter")
              .regex(/[a-z]/, "Must contain at least one lowercase letter")
              .regex(/[0-9]/, "Must contain at least one number")
              .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

    confirmPassword: z.string(),   
})
.refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
export type SignupFormData = z.infer<typeof signupSchema>