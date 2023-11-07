import axios from "axios";
import { TaskInterface } from "../types/typesFetch";

const baseUrl = "http://localhost:3000";

export const createNewUser = (login: string) => {
  axios
    .post(`${baseUrl}/user`, { username: `${login}` })
    .then((response) => {
      console.log("Успешно создан пользователь:", response.data);
    })
    .catch((error) => {
      console.error("Ошибка при создании пользователя:", error);
    });
};

export const getUserTask = (
  login: string,
  addAllTask: (task: TaskInterface[]) => void
) => {
  return axios
    .get(`${baseUrl}/tasks/${login}`)
    .then((response) => {
      if (response.status === 200) {
        console.log("Информация Обновлена с сервером");
        addAllTask(response.data);
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        createNewUser(login);
      }
    });
};

export const addNewUserTask = async (
  task: TaskInterface,
  login: string,
  deleteErrorFetchQueue: (info: TaskInterface) => void,
  setNetworkError: (newNetworkError: boolean) => void
): Promise<void> => {
  try {
    const taskCreationResponse = await axios.post(
      `${baseUrl}/task/${login}`,
      task
    );
    deleteErrorFetchQueue(task);

    console.log("Успешное добавление:", taskCreationResponse.data);
  } catch (error: any) {
    setNetworkError(true);
    if (error.response && error.response.status === 404) {
      createNewUser(login);
    }
    console.error("Ошибка при добавлении задачи:", error);
  }
};

export const deleteUserTask = async (
  task: TaskInterface,
  login: string,
  deleteErrorFetchQueue: (info: TaskInterface) => void,
  setNetworkError: (newNetworkError: boolean) => void
) => {
  const taskIndex = task.index;

  try {
    await axios.delete(`${baseUrl}/tasks/${login}`, {
      data: { taskIndex },
    });
    deleteErrorFetchQueue(task);
  } catch (error) {
    setNetworkError(true);

    console.error("Ошибка при удалении задачи:", error);
  }
};

export const patchCompleteUserTask = async (
  task: TaskInterface,
  login: string,
  deleteErrorFetchQueue: (info: TaskInterface) => void,
  setNetworkError: (newNetworkError: boolean) => void
) => {
  const taskUrl = `${baseUrl}/tasks/${login}`;

  try {
    const taskIndex = task.index;
    const response = await axios.patch(taskUrl, { taskIndex });
    deleteErrorFetchQueue(task);
    console.log(response.data);
  } catch (error) {
    setNetworkError(true);
    console.log(error);
  }
};
