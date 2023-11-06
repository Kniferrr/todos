import { useQuery } from "react-query";
import { getUserTask } from "../../fetch/todoFetch";
import useTaskStore from "../store/store";
import "./TaskList.scss";
import TaskItem from "./TaskListCreator/TaskItem";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { TaskInterface } from "../../types/typesFetch";

const TaskList = () => {
  const login = useTaskStore((state) => state.login);

  const { data, isLoading, isError, error } = useQuery<TaskInterface[]>(
    "tasks",
    () => getUserTask(login),
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

  if (isError) {
    return <div>Error: {(error as Error)?.message || "An error occurred"}</div>;
  }

  return (
    <div className="task-list-container">
      <ul className="task-list">
        {data.map((taskInfo: TaskInterface) => {
          return <TaskItem taskInfo={taskInfo} key={taskInfo.task} />;
        })}
      </ul>
    </div>
  );
};

export default TaskList;
