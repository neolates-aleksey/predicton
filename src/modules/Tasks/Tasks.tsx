import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ITask, tasksApi } from "../../api/tasksApi";
import { authApi } from "../../api/authApi";
import { userState } from "../../store/userState";
import Task from "./Task/Task";
import ContentLoader from "react-content-loader";
import "./Tasks.scss";

const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[] | false>(false);
  const [, setUserInfo] = useRecoilState(userState);

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

      authApi.authMe().then((res) => {
        setUserInfo(res.data);
      });
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
        <>
          <ContentLoader
            className="tasks__loader"
            speed={2}
            width={"100"}
            height={"auto"}
            viewBox="0 0 370 40"
            backgroundColor="#20303F"
            foregroundColor="#324353"
          >
            <rect x="0" y="0" rx="6" ry="6" width="100%" height="40" />
          </ContentLoader>

          <ContentLoader
            className="tasks__loader"
            speed={2}
            width={"100"}
            height={"auto"}
            viewBox="0 0 370 40"
            backgroundColor="#20303F"
            foregroundColor="#324353"
          >
            <rect x="0" y="0" rx="6" ry="6" width="100%" height="40" />
          </ContentLoader>
        </>
      )}
    </div>
  );
};

export default Tasks;
