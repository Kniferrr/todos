import { useQueryClient } from "react-query";
import {
  deleteUserTask,
  patchCompliteUserTask,
} from "../../../fetch/todoFetch";
import { TaskInterface } from "../../../types/typesFetch";
import useTaskStore from "../../store/store";
import "./TaskItem.scss";

const TaskItem = ({ taskInfo }: { taskInfo: TaskInterface }) => {
  const queryClient = useQueryClient();
  const { tasksSotrMod, login } = useTaskStore();

  const onDeleteTask = (task: TaskInterface) => {
    deleteUserTask(task.index, login, queryClient);
  };

  const onCompliteTask = () => {
    patchCompliteUserTask(taskInfo.index, login, queryClient);
  };

  const compliteTaskClass = taskInfo.completed === true ? "complite-task" : "";

  let TaskItemComponen = (
    <li>
      <button onClick={() => onDeleteTask(taskInfo)}>Del</button>
      <span className={compliteTaskClass} onClick={() => onCompliteTask()}>
        {taskInfo.task}
      </span>
    </li>
  );

  if (tasksSotrMod === "complited" && taskInfo.completed === false) {
    TaskItemComponen = <></>;
  }

  if (tasksSotrMod === "InComplited" && taskInfo.completed === true) {
    TaskItemComponen = <></>;
  }

  return <>{TaskItemComponen}</>;
};

export default TaskItem;
