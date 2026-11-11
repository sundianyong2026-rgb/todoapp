import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TodoDataService from './todo-data-service';

const AddTodo = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  let editing = false;
  let initialTodoTitle = "";
  let initialTodoMemo = "";

  if (location.state && location.state.currentTodo) {
    editing = true;
    initialTodoTitle = location.state.currentTodo.title;
    initialTodoMemo = location.state.currentTodo.memo;
  }

  const [title, setTitle] = useState(initialTodoTitle);
  const [memo, setMemo] = useState(initialTodoMemo ?? "");
  const [submitted, setSubmitted] = useState(false);

  const saveTodo = () => {
    var data = {
      title: title,
      memo: memo,
      completed: false,
    };

    if (editing) {
      TodoDataService.updateTodo(
        location.state.currentTodo.id,
        data,
        props.token
      )
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      TodoDataService.createTodo(data, props.token)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
          navigate("/");
        })
        .catch(e => console.log(e));
    }
  };

  return (
    <div>
      {/* ¶¥²¿µ¼º½À¸ */}
      <div style={{ background: "#3b7ddd", color: "white", padding: "10px", fontSize: "18px" }}>
        <span style={{ fontWeight: "bold", marginRight: "20px" }}>TodosApp</span>
        <span style={{ marginRight: "20px", cursor: "pointer" }} onClick={() => navigate("/")}>Todos</span>
        <span onClick={props.onLogout} style={{ cursor: "pointer" }}>Logout({props.username})</span>
      </div>

      <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <h2>{editing ? "Edit Todo" : "Add Todo"}</h2>
        <div>
          <label>Title:</label>
          <input
            style={{ width: "100%", padding: "6px", margin: "8px 0" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Memo:</label>
          <textarea
            style={{ width: "100%", padding: "6px", margin: "8px 0", minHeight: "80px" }}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          ></textarea>
        </div>
        <button
          style={{ padding: "8px 20px", background: "#3b7ddd", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          onClick={saveTodo}
        >
          Save
        </button>
        {submitted && <p>Saved!</p >}
      </div>
    </div>
  );
};

export default AddTodo;