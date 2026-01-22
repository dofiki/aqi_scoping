import * as z from "zod";

const signupSchema = z.object({
  username: z
    .string("Enter valid username")
    .min(3, "Username must be at least 3 character"),
  email: z.string().email("Enter valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default signupSchema;
