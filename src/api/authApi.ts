import axios from "axios";
import { baseURL, userHeadersConfig } from "./config";

const api = axios.create({ baseURL: baseURL, headers: userHeadersConfig });

async function authMe() {
  return await api.get(`/auth/me`, {});
}

async function registerUser() {
  return await api.post(`/auth/twa/sigin`, {});
}

export const authApi = {
  authMe,
  registerUser,
};
