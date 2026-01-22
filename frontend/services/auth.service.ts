import { signupApi, SignupPayload } from "../lib/api/auth.api";

export const signupService = async (payload: SignupPayload) => {
  const res = await signupApi(payload);
  return res.data.user;
};
