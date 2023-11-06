import "./MainPage.scss"; // Подключаем файл стилей
import useTaskStore from "../store/store";
import { useEffect, useState } from "react";
import TaskList from "../TaskList/TaskList";
import { useNavigate } from "react-router-dom";
import { addNewUserTask } from "../../fetch/todoFetch";
import { useQueryClient } from "react-query";

const MainPage = () => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState("");
  const queryClient = useQueryClient();
  const { error, setTasksSotrMod, tasksSotrMod, login } = useTaskStore();

  useEffect(() => {
    if (login.length < 1) {
      navigate("/login");
    }
  });

  const handleInputChange = (event: { target: { value: string } }) => {
    setNewTask(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSetTask();
    }
  };

  const onSetTask = async () => {
    addNewUserTask(newTask, login, queryClient);
    setNewTask("");
  };

  const onSettasksSotrMod = (tasksSotrMod: string) => {
    setTasksSotrMod(tasksSotrMod);
  };

  const activeButtonSotr = (sotrMod: string) => {
    return tasksSotrMod == sotrMod ? "tab-button active" : "tab-button";
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
          onKeyDown={handleKeyDown}
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
