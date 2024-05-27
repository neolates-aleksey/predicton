import axios from "axios";
import { baseURL } from "../shared/consts/baseURL.ts";

const api = axios.create({ baseURL: baseURL });

async function getCurrentBlock() {
  return await api.get(`/blocks/current`, {});
}

async function getNextBlock() {
  return await api.get(`/blocks/next`, {});
}

async function getLatestBlocks(num: number) {
  return await api.get(`/blocks/latest?num=${num}`, {});
}

export const blocksApi = {
  getCurrentBlock,
  getNextBlock,
  getLatestBlocks,
};
