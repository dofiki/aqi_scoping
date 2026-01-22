import { api } from "../axios/axios";

import {
  SignupPayload,
  SignupResponse,
  LoginPayload,
  LoginResponse,
  DashboardResponse,
  RefreshTokenResponse,
} from "@/types/auth";

export const signupApi = (data: SignupPayload) =>
  api.post<SignupResponse>("/auth/signup", data);

export const loginApi = (data: LoginPayload) =>
  api.post<LoginResponse>("/auth/login", data);

export const getDashboardApi = () =>
  api.get<DashboardResponse>("/auth/dashboard");

export const refreshTokenApi = () =>
  api.post<RefreshTokenResponse>("/auth/refresh-token", {});
