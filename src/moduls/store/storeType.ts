export interface TaskState {
  tasks: string[];
  error: string;
  completeTasks: string[];
  tasksSotrMod: string;
  login: string;
}

export interface TaskStateActions extends TaskState {
  setTask: (task: string) => void;
  deleteTask: (taskToDelete: string) => void;
  completeTask: (taskToComplete: string) => void;
  setTasksSotrMod: (newTasksSotrMod: string) => void;
  setLogin: (login: string) => void;
}
