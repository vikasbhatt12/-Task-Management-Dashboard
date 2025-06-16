import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(`http://localhost:5000/tasks/${editingTask.id}`, {
          name: taskName,
          description: taskDescription,
        });
        setEditingTask(null);
      } else {
        await axios.post("http://localhost:5000/tasks", {
          name: taskName,
          description: taskDescription,
        });
      }
      setTaskName("");
      setTaskDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTaskName(task.name);
    setTaskDescription(task.description);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="App">
      <h1>Add New Task</h1>
      <div className="form-container">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group ">
              <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />

              <button type="submit">
                {editingTask ? "Update Task" : "Add Task"}
              </button>
            </div>
            <div className="form-group">
              <textarea
                type="text"
                placeholder="Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div>
          <h1>Task List</h1>
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-details">
                  <h3>{task.name}</h3>
                  <p>{task.description}</p>
                </div>
                <div className="task-buttons">
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
