import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios.post("http://127.0.0.1:8000/api/auth/token/", {
      username: username,
      password: password
    })
    .then(res => {
      const token = res.data.token;
      props.onLogin(token, username);
    })
    .catch(e => console.log(e));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;