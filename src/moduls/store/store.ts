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
  completeTasks: [],
  tasksSotrMod: "All",
};

const useTaskStore = create<TaskStateActions>()(
  immer((set) => ({
    ...initialState,
    ...getInitialStateFromLocalStorage(),
    setTask: (task) =>
      set((state) => {
        if (!state.tasks.includes(task)) {
          state.error = "";
          state.tasks = [...state.tasks, task];
          localStorage.setItem("taskState", JSON.stringify(state));
        } else {
          state.error = "Such a task already exists";
        }
      }),
    deleteTask: (taskToDelete) =>
      set((state) => {
        const newTasksList = state.tasks.filter(
          (task) => task !== taskToDelete
        );
        state.tasks = newTasksList;
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
    completeTask: (taskToComplete) =>
      set((state) => {
        const isTaskCompleted = state.completeTasks.includes(taskToComplete);
        if (isTaskCompleted) {
          const newCompleteTasks = state.completeTasks.filter(
            (task) => task !== taskToComplete
          );
          state.completeTasks = newCompleteTasks;
        } else {
          state.completeTasks = [...state.completeTasks, taskToComplete];
        }
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
    setTasksSotrMod: (newTasksSotrMod) =>
      set((state) => {
        state.tasksSotrMod = newTasksSotrMod;
        localStorage.setItem("taskState", JSON.stringify(state));
      }),
  }))
);

export default useTaskStore;
