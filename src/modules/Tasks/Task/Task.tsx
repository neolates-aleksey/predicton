import { useState } from "react";
import classNames from "classnames";
import { ITask, TaskStatus } from "../Tasks";
import IconArrowRight from "../../../shared/icons/IconArrowRight";
import IconMarkDone from "../../../shared/icons/IconMarkDone";
import SmallLoader from "../../../shared/components/SmallLoader/SmallLoader";
import Button from "../../../shared/components/Button/Button";
import "./Task.scss";

interface ITaskProps {
  task: ITask;
}

const Task = ({ task }: ITaskProps) => {
  const [checkTask, setCheckTask] = useState<boolean>(false);

  const onTaskClick = () => {
    if (task.status === TaskStatus.NOT_COMPLETED) {
      setCheckTask(true);

      const newWindow = window.open(task.link, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;

      //TODO: Запрос на сервер на выполнение квеста
      setTimeout(() => {
        setCheckTask(false);
        task.status = TaskStatus.DONE;
      }, 11000);
    }
  };

  return (
    <div className="task" onClick={onTaskClick}>
      <div className="task__content">
        <div
          className={classNames("task__icon", {
            task__icon_green: task.status === TaskStatus.COLLECTED,
          })}
        >
          {task.status === TaskStatus.COLLECTED ? <IconMarkDone /> : task.icon}
        </div>
        <div className="task__description">
          <p className="task__title">{task.title}</p>
          <p
            className={classNames("task__reward", {
              task__reward_green: task.status === TaskStatus.COLLECTED,
            })}
          >
            +{task.reward} POINTS{" "}
            {task.status === TaskStatus.COLLECTED && "recieved!"}
          </p>
        </div>
      </div>
      <div className="task__action">
        {checkTask ? (
          <SmallLoader />
        ) : (
          task.status === TaskStatus.NOT_COMPLETED &&
          task.link && <IconArrowRight />
        )}
        {task.status === TaskStatus.DONE && (
          <Button isPrimary isRounded text="collect" />
        )}
      </div>
    </div>
  );
};

export default Task;
