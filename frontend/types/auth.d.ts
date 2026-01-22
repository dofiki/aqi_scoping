export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
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