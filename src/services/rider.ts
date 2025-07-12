import axiosInstance from "./axiosInstance";

export async function createRider(formData: FormData) {
  const response = await axiosInstance.post("/rider", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function getRiders(params?: {
  limit?: number;
  page?: number;
  searchTerm?: string;
  email?: string;
}) {
  return axiosInstance.get("/users", { params });
}

export async function updateRider(id: string, data: Record<string, unknown>) {
  return axiosInstance.patch(`/rider/${id}`, data);
}
