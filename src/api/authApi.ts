import { client } from "./client";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  data: {
    user: {
      _id: string;
      username: string;
      email: string;
      avatar: { url: string };
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export const loginApi = (data: LoginRequest) =>
  client.post("/users/login", data);

export const registerApi = (data: RegisterRequest) =>
  client.post("/users/register", data);
