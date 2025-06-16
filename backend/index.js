const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];
let currentId = 1;

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add new task
app.post('/tasks', (req, res) => {
  const { name, description } = req.body;
  const newTask = { id: currentId++, name, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.name = name;
    task.description = description;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id == id);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
