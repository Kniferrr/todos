import useTaskStore from "../../store/store";
import "./TaskItem.scss"; // Подключаем файл стилей

const TaskItem = ({ task }: { task: string }) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const completeTask = useTaskStore((state) => state.completeTask);
  const completeTasks = useTaskStore((state) => state.completeTasks);
  const tasksSotrMod = useTaskStore((state) => state.tasksSotrMod);
  const onDeleteTask = (task: string) => {
    deleteTask(task);
  };
  const onCompliteTask = (task: string) => {
    completeTask(task);
  };

  const compliteTaskClass = completeTasks.includes(task) ? "complite-task" : "";

  let TaskItemComponen = (
    <li>
      <button onClick={() => onDeleteTask(task)}>Del</button>
      <span className={compliteTaskClass} onClick={() => onCompliteTask(task)}>
        {task}
      </span>
    </li>
  );

  if (tasksSotrMod == "complited" && !completeTasks.includes(task)) {
    TaskItemComponen = <></>;
  }
  if (tasksSotrMod == "InComplited" && completeTasks.includes(task)) {
    TaskItemComponen = <></>;
  }
  return <>{TaskItemComponen}</>;
};

export default TaskItem;
