import apiClient from "./apiClient";

// ── Types ──────────────────────────────────────────────
export interface CourseAdmin {
  courseId: number;
  title: string;
  description?: string;
  price: number;
  status?: string;
  categoryId?: number;
  categoryName?: string;
  thumbnailUrl?: string;
  instructorName?: string;
  createdAt?: string;
}

export interface UserAdmin {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  phoneNumber?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface CategoryDTO {
  categoryId: number;
  categoryName: string | null;
  description: string | null;
}

export interface CreateUserPayload {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber?: string;
}

export interface UpdateCourseStatusPayload {
  status: string;
}

export interface AdminReport {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  [key: string]: unknown;
}

// ── API ────────────────────────────────────────────────
export const adminApi = {
  // Courses
  getAllCourses: () =>
    apiClient.get<CourseAdmin[]>("/api/Admin/courses/all"),

  getPendingCourses: () =>
    apiClient.get<CourseAdmin[]>("/api/Admin/courses/pending"),

  approveCourse: (courseId: number) =>
    apiClient.patch(`/api/Admin/courses/approve/${courseId}`),

  updateCourseStatus: (courseId: number, payload: UpdateCourseStatusPayload) =>
    apiClient.patch(`/api/Admin/courses/update-status/${courseId}`, payload),

  deleteCourse: (courseId: number) =>
    apiClient.delete(`/api/Admin/courses/delete/${courseId}`),

  // Users
  getUsers: () =>
    apiClient.get<UserAdmin[]>("/api/Admin/users"),

  toggleUserStatus: (userId: number) =>
    apiClient.patch(`/api/Admin/users/toggle-status/${userId}`),

  createUser: (payload: CreateUserPayload) =>
    apiClient.post("/api/Admin/users/create", payload),

  // Categories
  getCategories: () =>
    apiClient.get<CategoryDTO[]>("/api/Admin/categories"),

  createCategory: (payload: Omit<CategoryDTO, "categoryId">) =>
    apiClient.post("/api/Admin/categories", payload),

  updateCategory: (categoryId: number, payload: Omit<CategoryDTO, "categoryId">) =>
    apiClient.put(`/api/Admin/categories/${categoryId}`, payload),

  deleteCategory: (categoryId: number) =>
    apiClient.delete(`/api/Admin/categories/${categoryId}`),

  // Report
  getReport: () =>
    apiClient.get<AdminReport>("/api/Admin/report"),
};