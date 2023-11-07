import { onCompliteTask, onDeleteTask } from "../../../Helpers/FetchHelper";
import { TaskInterface } from "../../../types/typesFetch";
import useTaskStore from "../../store/store";
import "./TaskItem.scss";

const TaskItem = ({ taskInfo }: { taskInfo: TaskInterface }) => {
  const { tasksSotrMod, deleteTask, setComplitedTask, addErrorFetchQueue } =
    useTaskStore();

  const compliteTaskClass = taskInfo.completed === true ? "complite-task" : "";

  let TaskItemComponen = (
    <li>
      <button
        onClick={() => onDeleteTask(taskInfo, addErrorFetchQueue, deleteTask)}
      >
        Del
      </button>
      <span
        className={compliteTaskClass}
        onClick={() =>
          onCompliteTask(taskInfo, addErrorFetchQueue, setComplitedTask)
        }
      >
        {taskInfo.task}
      </span>
    </li>
  );

  if (tasksSotrMod === "completed" && taskInfo.completed === false) {
    TaskItemComponen = <></>;
  }

  if (tasksSotrMod === "incomplete" && taskInfo.completed === true) {
    TaskItemComponen = <></>;
  }

  return <>{TaskItemComponen}</>;
};

export default TaskItem;
