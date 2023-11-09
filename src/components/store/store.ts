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
  tasksSotrMod: "all",
  login: "",
  errorFetchQueue: [],
  networkError: false,
};

const useTaskStore = create<TaskStateActions>()(
  immer((set) => ({
    ...initialState,
    ...getInitialStateFromLocalStorage(),
    addAllTask: (tasks) =>
      set((state) => {
        state.error = "";
        if (Array.isArray(tasks)) {
          state.tasks = tasks;
        } else {
          state.tasks = [tasks];
        }
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
    addTask: (task) =>
      set((state) => {
        state.error = "";
        state.tasks = [...state.tasks, task];
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
    setComplitedTask: (taskIndex) =>
      set((state) => {
        const trueTask = state.tasks.findIndex(
          (task) => task.index === taskIndex
        );
        state.tasks[trueTask].completed = !state.tasks[trueTask].completed;
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
    deleteTask: (taskToDeleteIndex) =>
      set((state) => {
        const newTasksList = state.tasks;
        const indexToDelete = state.tasks.findIndex(
          (task) => task.index === taskToDeleteIndex
        );
        if (indexToDelete !== -1) {
          newTasksList.splice(indexToDelete, 1);
        }
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
    addErrorFetchQueue: (info) =>
      set((state) => {
        state.errorFetchQueue.push(info);
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
    deleteErrorFetchQueue: (info) =>
      set((state) => {
        const trueTaskIndex = state.errorFetchQueue.findIndex(
          (task) => task.taskinfo.index === info.index
        );
        const newErrorFetchQueue = state.errorFetchQueue;
        state.errorFetchQueue.splice(trueTaskIndex, 1);
        state.errorFetchQueue = newErrorFetchQueue;
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
    setNetworkError: (newNetworkError) =>
      set((state) => {
        state.networkError = newNetworkError;
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
  }))
);

export default useTaskStore;
