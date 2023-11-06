import axios from "axios";
import { TaskInterface } from "../types/typesFetch";
import { QueryClient } from "react-query";

const baseUrl = "http://localhost:3000";

const createNewUser = (username: string) => {
  axios
    .post(`${baseUrl}/user`, { username: `${username}` })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Ошибка:", error.response.data.error);
    });
};

export const addNewUserTask = (
  task: string,
  username: string,
  queryClient: QueryClient
) => {
  axios
    .post(`${baseUrl}/tasks/${username}`, { task: `${task}`, completed: false })
    .then((response) => {
      queryClient.invalidateQueries("tasks");
    })
    .catch((error) => {
      console.error("Ошибка:", error.response.data.error);
    });
};

export const getUserTask = (
  user: string,
  addAllTask: (task: TaskInterface[]) => void
): Promise<TaskInterface[]> => {
  return axios
    .get(`${baseUrl}/tasks/${user}`)
    .then((response) => {
      addAllTask(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error.response);
      if (error.response.status === 404) {
        createNewUser(user);
      }
      throw error;
    });
};

export const deleteUserTask = (
  taskIndex: number,
  username: string,
  queryClient: QueryClient
) => {
  axios
    .delete(`${baseUrl}/tasks/${username}`, { data: { taskIndex } })
    .then((response) => {
      queryClient.invalidateQueries("tasks");
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const patchCompliteUserTask = (
  taskIndex: number,
  username: string,
  queryClient: QueryClient
) => {
  axios
    .patch(`${baseUrl}/tasks/${username}`, { taskIndex })
    .then((response) => {
      queryClient.invalidateQueries("tasks");
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Ошибка:", error.response.data.error);
    });
};
