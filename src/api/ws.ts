import { io } from "socket.io-client";

const URL = "ws://213.178.155.230/api/latest/blocks/ws";

export let socket = new WebSocket(URL);

// export const socket = io(URL);
