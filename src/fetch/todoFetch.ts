import axios from "axios";
import { TaskInterface } from "../types/typesFetch";

const baseUrl = "http://localhost:3000";

const createNewUser = (login: string) => {
  console.log("Создание пользователя начато");
  axios
    .post(`${baseUrl}/user`, { username: `${login}` })
    .then((response) => {
      console.log("Успешно создан пользователь:", response.data);
    })
    .catch((error) => {
      console.error("Ошибка при создании пользователя:", error);
      if (error.response) {
        console.error("Ответ сервера:", error.response.data);
      }
    })
    .finally(() => {
      console.log("Создание пользователя завершено");
    });
};

export const getUserTask = async (
  login: string,
  addAllTask: (task: TaskInterface[]) => void
) => {
  try {
    const response = await axios.get(`${baseUrl}/tasks/${login}`);
    if (response.status === 200) {
      console.log("Информация Обновлена с севером");
      addAllTask(response.data);
      return response.data;
    } else if (response.status === 404) {
      createNewUser(login);
    }
  } catch (error) {}
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
    if (error.response && error.response.status === 404) {
      createNewUser(login);
    } else {
      setNetworkError(true);
      console.error("Ошибка при добавлении задачи:", error);
    }
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
