import { useQuery } from "react-query";
import { getUserTask } from "../../fetch/todoFetch";
import useTaskStore from "../store/store";
import "./TaskList.scss";
import TaskItem from "./TaskListCreator/TaskItem";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { TaskInterface } from "../../types/typesFetch";

const TaskList = () => {
  const { addAllTask, login, tasks } = useTaskStore();

  const { data, isLoading, isError, error } = useQuery<TaskInterface[]>(
    "tasks",
    () => getUserTask(login, addAllTask),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || !data) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <ul className="task-list">
        {tasks.map((taskInfo: TaskInterface) => {
          return <TaskItem taskInfo={taskInfo} key={taskInfo.task} />;
        })}
      </ul>
    </div>
  );
};

export default TaskList;
