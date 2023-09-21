import useTaskStore from "../store/store";
import "./TaskList.scss"; // Подключаем файл стилей
import TaskItem from "./TaskListCreator/TaskItem";

const TaskList = () => {
  const Tasks = useTaskStore((state) => state.tasks);
  return (
    <div className="task-list-container">
      <ul className="task-list">
        {Tasks.map((task) => {
          return <TaskItem task={task} key={task} />;
        })}
      </ul>
    </div>
  );
};

export default TaskList;
