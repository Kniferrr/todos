import { useEffect } from "react";
import { getUserTask } from "../../fetch/todoFetch";
import useTaskStore from "../store/store";
import TaskItem from "./TaskListCreator/TaskItem";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { TaskInterface } from "../../types/typesFetch";

const TaskList = () => {
  const { tasks, login, addAllTask, networkError } = useTaskStore();

  useEffect(() => {
    if (!networkError) {
      getUserTask(login, addAllTask);
    }
  }, [networkError]);

  if (!Array.isArray(tasks)) {
    return <LoadingComponent />;
  }

  return (
    <div className="task-list-container">
      <ul className="task-list">
        {tasks.map((taskInfo: TaskInterface) => {
          return <TaskItem taskInfo={taskInfo} key={taskInfo.index} />;
        })}
      </ul>
    </div>
  );
};

export default TaskList;
