export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  userId: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  _id: string;
  username: string;
  email: string;
}

export interface DashboardResponse {
  message: string;
  username: string;
  email: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface VerifyEmailPayload {
  userId: string;
  otp: string;
}

export interface VerifyEmailResponse {
  message: string;
  accessToken: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}
