import axiosInstance from "./axiosInstance";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload) {
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
}

export async function loginUser(payload: { email: string; password: string }) {
  const response = await axiosInstance.post("/auth/login", payload);
  if (response.data.data.token) {
    localStorage.setItem("token", response.data.data.token);
  }
  return response.data;
}
