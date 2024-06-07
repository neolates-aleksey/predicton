import { useEffect, useState } from "react";
import IconTelegram from "../../shared/icons/IconTelegram";
import Task from "./Task/Task";
import "./Tasks.scss";
import SmallLoader from "../../shared/components/SmallLoader/SmallLoader";

export enum TaskStatus {
  NOT_COMPLETED = "NOT_COMPLETED",
  DONE = "DONE",
  COLLECTED = "COLLECTED",
}

export interface ITask {
  title: string;
  icon: any;
  reward: number;
  status: TaskStatus;
  link?: string;
  condition?: string;
}

const mockedTasks: ITask[] = [
  {
    title: "Subscribe to Telegram",
    icon: <IconTelegram />,
    reward: 50,
    link: "https://t.me/PredictonNews",
    status: TaskStatus.NOT_COMPLETED,
  },
  {
    title: "Subscribe to X",
    icon: <IconTelegram />,
    reward: 50,
    link: "https://t.me/neolates",
    status: TaskStatus.COLLECTED,
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[] | false>(false);

  useEffect(() => {
    setTimeout(() => {
      setTasks(mockedTasks);
    }, 2500);
  }, []);

  return <div className="tasks">{tasks ? tasks.map((task) => <Task key={task.title} task={task} />) : <SmallLoader />}</div>;
};

export default Tasks;
