import { setCookie } from "cookies-next";
import api from "./api";


export async function loginStudent(examNo: string, password: string) {
  try {
    const response = await api.post("/api/login/", { examNo, password });
    // Store access and refresh tokens in cookies with expiry time (e.g., 1 hour for access token)
    setCookie('cbt_access', response.data.access, { maxAge: 60 * 60 }); // 1 hour expiry
    setCookie('cbt_refresh', response.data.refresh, { maxAge: 60 * 60 * 24 * 30 }); // 30 days expiry
    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error.response?.data || { error: "Login failed" };
  }
}


export async function startExamSession(examId: number) {
  try {
    const response = await api.post(`/api/exam/${examId}/start/`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to start exam:", error.response?.data || error.message);
    throw error.response?.data || { error: "Failed to start exam" };
  }
}
