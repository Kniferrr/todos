import { useEffect } from "react";
import { getUserTask } from "../../fetch/todoFetch";
import useTaskStore from "../store/store";
import TaskItem from "./TaskListCreator/TaskItem";
import { TaskInterface } from "../../types/typesFetch";

const TaskList = () => {
  const { tasks, login, addAllTask, networkError } = useTaskStore();

  useEffect(() => {
    if (!networkError) {
      getUserTask(login, addAllTask);
    }
  }, [networkError]);

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
