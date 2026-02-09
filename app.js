const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
  },
];

app.use("/tasks/:id?", (req, res, next) => {
  console.log("middle ware running.....");
  const requiredKeys = ["title", "description", "completed"];
  let data = req.body;
  if (req.method === "POST" || req.method === "PUT") {
    const isValid =
      data &&
      typeof data.title === "string" &&
      data.title.trim() !== "" &&
      typeof data.description === "string" &&
      data.description.trim() !== "" &&
      typeof data.completed === "boolean";

    if (!isValid) {
      return res.status(400).json({ error: "Invalid task data" });
    }
  }
  console.log("id from middleware=====", req.params);
  if (typeof req.params.id === "number") {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
  }
  next();
});
app.get("/tasks", (req, res) => {
  console.log("tasks=====", tasks);
  const sortedTasks = tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.status(200).json(sortedTasks);
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  res.status(200).json(task);
});

app.get("/tasks/completed/:completed", (req, res) => {
  const completed = req.params.completed === "true";
  const filteredTasks = tasks.filter(
    (task) => task.completed.toString() === completed.toString(),
  );
  res.status(200).json(filteredTasks);
});

app.get("/tasks/priority/:level", (req, res) => {
  const level = req.params.level;
  const priorityTasks = tasks.filter((task) => task.priority === level);
  res.status(200).json(priorityTasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    date: new Date().toISOString(),
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  const updatedTask = {
    id: taskId,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };
  tasks[taskIndex] = updatedTask;
  res.status(200).json(updatedTask);
});
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  tasks.splice(taskIndex, 1);
  res.status(200).json({});
});
if (require.main === module) {
  app.listen(port, (err) => {
    if (err) {
      return console.log("Something bad happened", err);
    }
    console.log(`Server is listening on ${port}`);
  });
}

module.exports = app;
