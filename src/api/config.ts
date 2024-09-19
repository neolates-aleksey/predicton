import { retrieveLaunchParams } from "@tma.js/sdk";

const url = "195.133.144.10";

export const baseURL = `http://${url}/api/0.0.1/`;

export const getTgToken = (): string => {
  try {
    const params = retrieveLaunchParams();

    return `bearer ${params.initDataRaw}`;
  } catch (e) {
    return "bearer query_id=AAFp4QoZAAAAAGnhChl0IPg5&user=%7B%22id%22%3A420143465%2C%22first_name%22%3A%22%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9%22%2C%22last_name%22%3A%22%D0%9F%D0%BE%D0%B7%D0%BD%D1%8F%D0%BA%22%2C%22username%22%3A%22neolates%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1720533476&hash=56c99f67c8f618245af6a3994589ec4de2862b1134ceff8417f5ea5799591973";
  }
};

export const userHeadersConfig = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  Authorization: `${getTgToken()}`,
};

const socketUrl = `ws://${url}/api/latest/blocks/ws/point_block`;

export let socket = new WebSocket(socketUrl);
