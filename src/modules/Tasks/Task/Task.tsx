import { useState } from "react";
import classNames from "classnames";
import IconArrowRight from "../../../shared/icons/IconArrowRight";
import IconMarkDone from "../../../shared/icons/IconMarkDone";
import SmallLoader from "../../../shared/components/SmallLoader/SmallLoader";
import Button from "../../../shared/components/Button/Button";
import "./Task.scss";
import { ITask, TaskKind, tasksApi, TaskState } from "../../../api/tasksApi";

interface ITaskProps {
  task: ITask;
}

const Task = ({ task }: ITaskProps) => {
  const [checkTask, setCheckTask] = useState<boolean>(false);

  const missionCallback = () => {
    (task.kind === TaskKind.TG_SUB || task.kind === TaskKind.EXT_SUB) &&
      handleLinkClick();
  };

  // const getIcon = (social?: string) => {
  //   social === 'telegram' && return ''

  // };

  const handleComplete = () => {
    tasksApi.completeTask(task.slug).then((res) => {
      console.log(res.data);
    });
  };

  const handleLinkClick = () => {
    if (task.state === TaskState.TODO) {
      setCheckTask(true);

      const newWindow =
        task.link && window.open(task.link, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;

      handleComplete();
    }
  };

  const handleClaim = () => {
    tasksApi
      .claimTask(task.slug)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div className="task" onClick={() => missionCallback()}>
      <div className="task__content">
        <div
          className={classNames("task__icon", {
            task__icon_green: task.state === TaskState.DONE,
          })}
        >
          {task.state === TaskState.DONE ? <IconMarkDone /> : "1"}
        </div>
        <div className="task__description">
          <p className="task__title">{task.name}</p>
          <p
            className={classNames("task__reward", {
              task__reward_green: task.state === TaskState.DONE,
            })}
          >
            +{task.points_reward} POINTS{" "}
            {task.state === TaskState.DONE && "recieved!"}
          </p>
        </div>
      </div>

      <div className="task__action">
        {checkTask || task.state === TaskState.ON_CHECK ? (
          <SmallLoader />
        ) : (
          task.state === TaskState.TODO && task.link && <IconArrowRight />
        )}

        {task.state === TaskState.READY_TO_CLAIM && (
          <Button
            isPrimary
            isLoading
            isRounded
            onClick={() => handleClaim()}
            text="collect"
          />
        )}
      </div>
    </div>
  );
};

export default Task;
