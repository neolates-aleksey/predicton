import axios from "axios";
import { baseURL, userHeadersConfig } from "./config";

const api = axios.create({ baseURL: baseURL, headers: userHeadersConfig });

async function authMe() {
  return await api.get(`/auth/me`, {});
}

async function registerUser(referal_link?: string) {
  return await api.post(
    `/auth/twa/sigin${referal_link && `?referal_link=${referal_link}`}`,
    {}
  );
}

async function pointsClaim() {
  return await api.post(`/points/claim`, {});
}

export const authApi = {
  authMe,
  registerUser,
  pointsClaim,
};
