import { api } from "../axios/axios";

import {
  SignupPayload,
  SignupResponse,
  LoginPayload,
  LoginResponse,
  DashboardResponse,
  RefreshTokenResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
} from "@/types/auth";

export const signupApi = async (data: SignupPayload) => {
  const response = await api.post<SignupResponse>("/auth/signup", data);
  return response.data;
};

export const loginApi = (data: LoginPayload) =>
  api.post<LoginResponse>("/auth/login", data);

export const getDashboardApi = () =>
  api.get<DashboardResponse>("/auth/dashboard");

export const refreshTokenApi = () =>
  api.post<RefreshTokenResponse>("/auth/refresh-token", {});

export const verifyEmailApi = async (data: VerifyEmailPayload) => {
  const response = await api.post<VerifyEmailResponse>(
    "/auth/verify-email",
    data,
  );
  return response.data;
};
