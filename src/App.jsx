import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import "./style.css";

export default function App() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
        document.body.className = darkMode ? "dark-mode" : "";
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <div className="app-container">
            <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "🌙 Dark Mode" : "🔆 Light Mode"}
            </button>
            <h1>Enhanced To-Do List</h1>
            <TodoList />
        </div>
    );
}