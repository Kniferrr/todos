import "./MainPage.scss"; // Подключаем файл стилей
import useTaskStore from "../store/store";
import { useState } from "react";
import TaskList from "../TaskList/TaskList";

const MainPage = () => {
  const [newTask, setNewTask] = useState("");
  const setTask = useTaskStore((state) => state.setTask);
  const error = useTaskStore((state) => state.error);
  const setTasksSotrMod = useTaskStore((state) => state.setTasksSotrMod);
  const tasksSotrMod = useTaskStore((state) => state.tasksSotrMod);

  const handleInputChange = (event: { target: { value: string } }) => {
    setNewTask(event.target.value);
  };
  const onSetTask = () => {
    setTask(newTask);
    setNewTask("");
  };
  const onSettasksSotrMod = (mod: string) => {
    setTasksSotrMod(mod);
  };

  const activeButtonSotr = (mod: string) => {
    return tasksSotrMod == mod ? "tab-button active" : "tab-button";
  };

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button id="add-button" onClick={onSetTask}>
          Add
        </button>
      </div>
      <div className="error-output">{error}</div>
      <div className="tabs">
        <button
          className={activeButtonSotr("All")}
          onClick={() => onSettasksSotrMod("All")}
        >
          All Tasks
        </button>
        <button
          className={activeButtonSotr("complited")}
          onClick={() => onSettasksSotrMod("complited")}
        >
          Completed
        </button>
        <button
          className={activeButtonSotr("InComplited")}
          onClick={() => onSettasksSotrMod("InComplited")}
        >
          Incomplete
        </button>
      </div>
      <TaskList />
    </div>
  );
};

export default MainPage;
