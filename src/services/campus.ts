import axiosInstance from "./axiosInstance";

export interface CampusPayload {
  name: string;
  description: string;
  eduMailExtension: string;
  averageHalfDistance: number;
  coordinates: { lat: number; lng: number }[];
}

export async function createCampus(payload: CampusPayload) {
  const response = await axiosInstance.post("/campus", payload);
  return response.data;
}

export async function getCampusList(name?: string, eduMailExtension?: string) {
  const params: { name?: string; eduMailExtension?: string } = {};
  if (name) params.name = name;
  if (eduMailExtension) params.eduMailExtension = eduMailExtension;
  const response = await axiosInstance.get("/campus", { params });
  return response.data;
}

export async function updateCampus(
  campusId: string,
  payload: {
    name: string;
    description: string;
    eduMailExtension: string;
    averageHalfDistance: number;
    coordinates: { lat: number; lng: number }[];
  }
) {
  const response = await axiosInstance.patch(`/campus/${campusId}`, payload);
  return response.data;
}

export async function getCampusById(id: string) {
  const response = await axiosInstance.get(`/campus/${id}`);
  return response.data.data;
}
