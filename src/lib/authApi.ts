import apiClient from "./apiClient";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  role?: string;
}

export interface UpdateProfilePayload {
  fullName: string;
  phone?: string;
  address?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>("/api/Auth/login", payload),

  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse>("/api/Auth/register", payload),

  getProfile: () => apiClient.get<UserProfile>("/api/Auth/profile"),

  updateProfile: (payload: UpdateProfilePayload) =>
    apiClient.put<UserProfile>("/api/Auth/profile", payload),

  changePassword: (payload: ChangePasswordPayload) =>
    apiClient.put("/api/Auth/change-password", payload),

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};
