import { TaskInterface, errorFetchInterface } from "../../types/typesFetch";

export interface TaskState {
  tasks: TaskInterface[];
  error: string;
  tasksSotrMod: string;
  login: string;
  errorFetchQueue: errorFetchInterface[];
  networkError: boolean;
}

export interface TaskStateActions extends TaskState {
  addAllTask: (task: TaskInterface[]) => void;
  addTask: (task: TaskInterface) => void;
  deleteTask: (taskToDelete: string) => void;
  setTasksSotrMod: (newTasksSotrMod: string) => void;
  setLogin: (login: string) => void;
  setComplitedTask: (taskIndex: string) => void;
  addErrorFetchQueue: (info: errorFetchInterface) => void;
  deleteErrorFetchQueue: (info: TaskInterface) => void;
  setNetworkError: (newNetworkError: boolean) => void;
}
