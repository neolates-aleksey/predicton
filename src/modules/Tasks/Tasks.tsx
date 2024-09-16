import { useEffect, useState } from "react";
import { ITask, TaskKind, tasksApi, TaskState } from "../../api/tasksApi";
import Task from "./Task/Task";
import SmallLoader from "../../shared/components/SmallLoader/SmallLoader";
import "./Tasks.scss";

const mockedTasks: ITask[] = [
  {
    name: "Subscribe channel",
    slug: "string1",
    social: "telegram",
    description: "",
    link: "t.me/predicton",
    points_reward: 100,
    kind: TaskKind.TG_SUB,
    state: TaskState.TODO,
    created_at: 123,
    completed_at: null,
    user_id: "134",
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[] | false>(false);

  const updateTasks = () => {
    tasksApi
      .getTasks()
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    updateTasks();

    const updateInterval = setInterval(() => {
      updateTasks();
    }, 15000);

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <div className="tasks">
      {tasks ? (
        tasks.map((task) => <Task key={task.slug} task={task} />)
      ) : (
        <SmallLoader />
      )}
    </div>
  );
};

export default Tasks;
