import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../store/store";
import { doErrorFetchQueue, onAddTask } from "../../Helpers/FetchHelper";
import TaskList from "../TaskList/TaskList";
import "./MainPage.scss";

const MainPage = () => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState("");

  const {
    error,
    setTasksSotrMod,
    tasksSotrMod,
    login,
    addTask,
    addErrorFetchQueue,
    deleteErrorFetchQueue,
    errorFetchQueue,
    setNetworkError,
  } = useTaskStore();

  useEffect(() => {
    if (login.length < 1) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (errorFetchQueue.length === 0) {
      setNetworkError(false);
    }
    doErrorFetchQueue(
      login,
      errorFetchQueue,
      deleteErrorFetchQueue,
      setNetworkError
    );
  }, [errorFetchQueue]);

  const handleAddTask = () => {
    onAddTask(newTask, setNewTask, addErrorFetchQueue, addTask);
  };

  const onSetTasksSortMod = (sortMod: string) => {
    setTasksSotrMod(sortMod);
  };

  const isActiveButtonSort = (sortMod: string) => {
    return tasksSotrMod === sortMod ? "tab-button active" : "tab-button";
  };

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button id="add-button" onClick={handleAddTask}>
          Add
        </button>
      </div>
      <div className="error-output">{error}</div>
      <div className="tabs">
        <button
          className={isActiveButtonSort("all")}
          onClick={() => onSetTasksSortMod("all")}
        >
          All Tasks
        </button>
        <button
          className={isActiveButtonSort("completed")}
          onClick={() => onSetTasksSortMod("completed")}
        >
          Completed
        </button>
        <button
          className={isActiveButtonSort("incomplete")}
          onClick={() => onSetTasksSortMod("incomplete")}
        >
          Incomplete
        </button>
      </div>
      <TaskList />
    </div>
  );
};

export default MainPage;
