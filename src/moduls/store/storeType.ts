import { TaskInterface } from "../../types/typesFetch";

export interface TaskState {
  tasks: TaskInterface[];
  error: string;
  tasksSotrMod: string;
  login: string;
}

export interface TaskStateActions extends TaskState {
  addAllTask: (task: TaskInterface[]) => void;
  addTask: (task: TaskInterface) => void;
  deleteTask: (taskToDelete: string) => void;
  setTasksSotrMod: (newTasksSotrMod: string) => void;
  setLogin: (login: string) => void;
}
