import axios from "axios";
import { baseURL } from "../shared/consts/baseURL.ts";

const api = axios.create({ baseURL: baseURL });

interface IGetLatestsBlocks {
  count: number;
}

async function getCurrentBlock() {
  return await api.get(`/blocks/current`, {});
}

async function getNextBlock() {
  return await api.get(`/blocks/next`, {});
}

async function getLatestBlocks({ count }: IGetLatestsBlocks) {
  return await api.get(`/blocks/${count}`, {});
}

export const blocksApi = {
  getCurrentBlock,
  getNextBlock,
  getLatestBlocks,
};
