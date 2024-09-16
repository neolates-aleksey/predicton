import axios from "axios";
import { baseURL } from "./config";

const api = axios.create({ baseURL: baseURL });

async function getCurrentBlock() {
  return await api.get(`/blocks/current`, {});
}

async function getNextBlock() {
  return await api.get(`/blocks/next`, {});
}

async function getLatestBlocks(num: number, block_kind: "point_block" | "coin_block") {
  return await api.get(`/blocks/latest?num=${num}&block_kind=${block_kind}`, {});
}

export const blocksApi = {
  getCurrentBlock,
  getNextBlock,
  getLatestBlocks,
};
