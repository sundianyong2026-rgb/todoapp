import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTodo from './add-todo';
import TodoList from './todos-list';
import Login from './login';

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  const handleLogin = (newToken, name) => {
    setToken(newToken);
    setUsername(name);
  };

  const handleLogout = () => {
    setToken(null);
    setUsername("");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <TodoList token={token} username={username} onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/add"
          element={
            token ? (
              <AddTodo token={token} username={username} onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;