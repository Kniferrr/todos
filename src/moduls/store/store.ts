import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { TaskState, TaskStateActions } from "./storeType";

const getInitialStateFromLocalStorage = () => {
  const savedState = localStorage.getItem("taskState");
  return savedState ? JSON.parse(savedState) : initialState;
};

const initialState: TaskState = {
  tasks: [],
  error: "",
  tasksSotrMod: "All",
  login: "",
};

const useTaskStore = create<TaskStateActions>()(
  immer((set) => ({
    ...initialState,
    ...getInitialStateFromLocalStorage(),
    addAllTask: (task) =>
      set((state) => {
        state.error = "";
        state.tasks = task;
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
    addTask: (task) =>
      set((state) => {
        state.error = "";
        state.tasks = [...state.tasks, task];
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
    deleteTask: (taskToDelete) =>
      set((state) => {
        const newTasksList = state.tasks.filter(
          (task) => task.task !== taskToDelete
        );
        state.tasks = newTasksList;
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
    setTasksSotrMod: (newTasksSotrMod) =>
      set((state) => {
        state.tasksSotrMod = newTasksSotrMod;
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
    setLogin: (login: string) =>
      set((state) => {
        state.login = login;
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
  }))
);

export default useTaskStore;
