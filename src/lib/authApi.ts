import apiClient from "./apiClient";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>("/auth/login", payload),

  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse>("/auth/register", payload),

  getProfile: () => apiClient.get<UserProfile>("/auth/profile"),

  updateProfile: (payload: Partial<UserProfile>) =>
    apiClient.put<UserProfile>("/auth/profile", payload),

  changePassword: (payload: ChangePasswordPayload) =>
    apiClient.put("/auth/change-password", payload),

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};
