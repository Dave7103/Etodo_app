import React, { useState, useEffect } from "react";
import axios from "axios";  // Install Axios: npm install axios

const API_URL = "https://etodo-app.onrender.com/api/posts/";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    // Fetch tasks from the backend when the component mounts
    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setTasks(response.data);  // Update state with API response
            })
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    // Add a new task
    const addTask = () => {
        if (task.trim() === "") return;
        axios.post(API_URL, { text: task, completed: false })
            .then(response => {
                setTasks([...tasks, response.data]);
                setTask("");
            })
            .catch(error => console.error("Error adding task:", error));
    };

    // Toggle task completion
    const toggleComplete = (id) => {
        const updatedTask = tasks.find(t => t.id === id);
        axios.patch(`${API_URL}${id}/`, { completed: !updatedTask.completed })
            .then(response => {
                setTasks(tasks.map(t => (t.id === id ? response.data : t)));
            })
            .catch(error => console.error("Error updating task:", error));
    };

    // Delete a task
    const deleteTask = (id) => {
        axios.delete(`${API_URL}${id}/`)
            .then(() => {
                setTasks(tasks.filter(t => t.id !== id));
            })
            .catch(error => console.error("Error deleting task:", error));
    };

    return (
        <div className="todo-container">
            <input
                type="text"
                placeholder="Add a new task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>

            <ul>
                {tasks.map((t) => (
                    <li key={t.id} className={t.completed ? "completed" : ""}>
                        <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(t.id)} />
                        <span>{t.text}</span>
                        <button onClick={() => deleteTask(t.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
