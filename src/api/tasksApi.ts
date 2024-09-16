import axios from "axios";
import { baseURL, userHeadersConfig } from "./config";

const api = axios.create({ baseURL: baseURL, headers: userHeadersConfig });

export enum TaskKind {
  TG_SUB = "telegram_subscription",
  EXT_SUB = "external_susbcription",
  INVITE = "invite",
  WIN_N_TIMES = "win_n_times",
  WIN_N_TIMES_IN_A_ROW = "win_n_times_in_a_row",
}

export enum TaskState {
  TODO = "todo",
  ON_CHECK = "on_check",
  READY_TO_CLAIM = "ready_to_claim",
  DONE = "done",
}

export interface ITask {
  name: string;
  slug: string;
  link: string | null;
  social: string | null;
  description: string;
  points_reward: number;
  kind: TaskKind;
  state: TaskState;
  created_at: number;
  completed_at: number | null;
  user_id: string;
}

async function getTasks(): Promise<{
  data: { message: string; tasks: ITask[] };
}> {
  return await api.get(`/tasks/my`, {});
}

async function completeTask(task_id: string) {
  return await api.patch(`/tasks/my/${task_id}/complete`, {});
}

async function claimTask(task_id: string) {
  return await api.patch(`/tasks/my/${task_id}/claim`, {});
}

export const tasksApi = {
  getTasks,
  completeTask,
  claimTask,
};
