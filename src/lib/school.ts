import api from "./api";

export async function requestDemo(data: { name: string; email: string; phone: string }) {
  const res = await api.post("/api/demo/", data);
  return res.data;
}

export const checkSchool = async (email: string) => {
  const res = await api.post("/api/check-school/", { email });
  return res.data;
};

export const requestSchool = async (data: { email: string; phone: string }) => {
  const res = await api.post("/api/request-school/", data);
  return res.data;
};

export const startSubscription = async (data: {
  email: string;
  plan: "trial" | "monthly" | "yearly";
}) => {
  const res = await api.post("/api/subscribe/", data);
  return res.data;
};
