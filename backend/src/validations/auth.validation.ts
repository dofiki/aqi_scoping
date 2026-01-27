import z from "zod";

// what api expects in req.body:
export const signupSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const otpSchema = z.object({
  userId: z.string(),
  otp: z.string().length(6),
});
