import axiosInstance from "./axiosInstance";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/zone`;

export interface ZonePayload {
  name: string;
  description: string;
  coordinates: { lat: number; lng: number }[];
  campusId: string;
}

// Create a new zone
export async function createZone(payload: ZonePayload) {
  const response = await axiosInstance.post(BASE_URL, payload);
  return response.data;
}

// Get all zones
export async function getZones() {
  const response = await axiosInstance.get(BASE_URL);
  return response.data;
}

// Get a single zone by ID
export async function getZoneById(id: string) {
  const response = await axiosInstance.get(`${BASE_URL}/${id}`);
  return response.data;
}

// Update a zone
export async function updateZone(id: string, payload: ZonePayload) {
  const response = await axiosInstance.put(`${BASE_URL}/${id}`, payload);
  return response.data;
}

// Delete a zone
export async function deleteZone(id: string) {
  const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
  return response.data;
}
