const express = require("express");
const app = express();
const port = 3000;

const tasks = {};
let countIndex = 0;

app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/tasks/:username", (req, res) => {
  const username = req.params.username;
  const userTasks = tasks[username];
  if (userTasks) {
    res.json(userTasks);
  } else {
    res.status(404).json({ error: "Пользователь не найден" });
  }
});

app.post("/user", (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(400).json({ error: "Неверный формат запроса" });
  } else {
    tasks[username] = [];
    res.status(201).json({ message: "Пользователь создан" });
  }
});

// Маршрут для добавления задачи
app.post("/tasks/:username", (req, res) => {
  const username = req.params.username;
  const task = req.body.task;
  if (!username || !task) {
    res.status(400).json({ error: "Неверный формат запроса" });
  } else {
    if (!tasks[username]) {
      res.status(404).json({ error: "Пользователь не найден" });
    } else {
      tasks[username].push({
        task,
        completed: false,
        index: countIndex++,
      });
      res.status(201).json({ message: "Задача добавлена" });
    }
  }
});

app.delete("/tasks/:username", (req, res) => {
  const username = req.params.username;
  const taskIndex = req.body.taskIndex;
  if (!username || taskIndex === undefined) {
    res.status(400).json({ error: "Неверный формат запроса" });
  } else {
    if (!tasks[username]) {
      res.status(404).json({ error: "Пользователь не найден" });
    } else if (taskIndex < 0) {
      res.status(404).json({ error: "Задача не найдена" });
    } else {
      const indexToDelete = tasks[username].findIndex(
        (task) => task.index === taskIndex
      );
      if (indexToDelete !== -1) {
        tasks[username].splice(indexToDelete, 1);
      }
      res.status(200).json({ message: "Задача удалена" });
    }
  }
});

app.patch("/tasks/:username", (req, res) => {
  const username = req.params.username;
  const taskIndex = req.body.taskIndex;
  if (!username || taskIndex === undefined) {
    res.status(400).json({ error: "Неверный формат запроса" });
  } else {
    if (!tasks[username]) {
      res.status(404).json({ error: "Пользователь не найден" });
    } else if (taskIndex < 0) {
      res.status(404).json({ error: "Задача не найдена" });
    } else if (tasks[username][taskIndex].completed !== true) {
      const indexToComplite = tasks[username].findIndex(
        (task) => task.index === taskIndex
      );
      if (indexToComplite !== -1) {
        tasks[username][indexToComplite].completed = true;
      }
      res.status(200).json({ message: "Задача отмечена как выполненная" });
    } else if (tasks[username][taskIndex].completed !== false) {
      const indexToDeComplite = tasks[username].findIndex(
        (task) => task.index === taskIndex
      );
      if (indexToDeComplite !== -1) {
        tasks[username][indexToDeComplite].completed = false;
      }

      res.status(200).json({ message: "Задача отмечена как не выполненная" });
    }
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
