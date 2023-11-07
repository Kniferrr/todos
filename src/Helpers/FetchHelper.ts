import {
  addNewUserTask,
  deleteUserTask,
  patchCompleteUserTask,
} from "../fetch/todoFetch";
import { TaskInterface, errorFetchInterface } from "../types/typesFetch";

const fetchFunctions: Record<
  string,
  (
    task: TaskInterface,
    login: string,
    deleteErrorFetchQueue: (info: TaskInterface) => void,
    setNetworkError: (newNetworkError: boolean) => void
  ) => void
> = {
  addNewUserTask,
  deleteUserTask,
  patchCompleteUserTask,
};

export const doErrorFetchQueue = (
  login: string,
  errorFetchQueue: errorFetchInterface[],
  deleteErrorFetchQueue: (info: TaskInterface) => void,
  setNetworkError: (newNetworkError: boolean) => void
) => {
  if (errorFetchQueue[0]) {
    const fetchFunction = errorFetchQueue[0].fetchFunction;
    const taskinfo = errorFetchQueue[0].taskinfo;

    const fetchFunctionHandler = fetchFunctions[fetchFunction];

    if (fetchFunctionHandler) {
      fetchFunctionHandler(
        taskinfo,
        login,
        deleteErrorFetchQueue,
        setNetworkError
      );
    } else {
      console.error(`Неизвестная функция fetch: ${fetchFunction}`);
    }
  }
};

export const onAddTask = (
  newTask: string,
  setNewTask: React.Dispatch<React.SetStateAction<string>>,
  addErrorFetchQueue: (info: errorFetchInterface) => void,
  addTask: (task: TaskInterface) => void
) => {
  let newId = crypto.randomUUID();

  const newTaskObj = {
    task: newTask,
    completed: false,
    index: newId,
  };

  const fetchInfo = {
    fetchFunction: "addNewUserTask",
    taskinfo: newTaskObj,
  };

  addErrorFetchQueue(fetchInfo);
  addTask(newTaskObj);
  setNewTask("");
};

export const onDeleteTask = (
  task: TaskInterface,
  addErrorFetchQueue: (info: errorFetchInterface) => void,
  deleteTask: (taskToDelete: string) => void
) => {
  const fetchInfo = {
    fetchFunction: "deleteUserTask",
    taskinfo: task,
  };
  addErrorFetchQueue(fetchInfo);

  deleteTask(task.index);
};

export const onCompliteTask = (
  taskInfo: TaskInterface,
  addErrorFetchQueue: (info: errorFetchInterface) => void,
  setComplitedTask: (taskIndex: string) => void
) => {
  const fetchInfo = {
    fetchFunction: "patchCompleteUserTask",
    taskinfo: taskInfo,
  };
  addErrorFetchQueue(fetchInfo);
  setComplitedTask(taskInfo.index);
};
