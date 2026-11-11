import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoDataService from "./todo-data-service";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) suffix = "st";
  else if (day === 2 || day === 22) suffix = "nd";
  else if (day === 3 || day === 23) suffix = "rd";

  return `${day}${suffix} ${month} ${year}`;
};

const TodoList = (props) => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const loadTodos = () => {
    TodoDataService.retrieveAll(props.token)
      .then(res => setTodos(res.data));
  };

  useEffect(() => {
    loadTodos();
  }, [props.token]);

  const handleEdit = (todo) => {
    navigate("/add", { state: { currentTodo: todo } });
  };

  const handleDelete = (id) => {
    TodoDataService.deleteTodo(id, props.token)
      .then(() => {
        loadTodos();
      })
      .catch(e => console.log(e));
  };


  const completeTodo = (todoId) => {
    TodoDataService.completeTodo(todoId, props.token)
      .then(response => {
        loadTodos();
        console.log("completeTodo", todoId);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleLogout = () => {
    props.onLogout();
  };

  return (
    <div>
      <div style={{ background: "#3b7ddd", color: "white", padding: "10px", fontSize: "18px" }}>
        <span style={{ fontWeight: "bold", marginRight: "20px" }}>TodosApp</span>
        <span style={{ marginRight: "20px" }}>Todos</span>
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>Logout({props.username})</span>
      </div>

      <div style={{ padding: "20px", textAlign: "center" }}>
        <button
          style={{
            padding: "8px 20px",
            background: "white",
            border: "1px solid #3b7ddd",
            color: "#3b7ddd",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/add")}
        >
          Add To-do
        </button>

        {todos.map(todo => (
          <div
            key={todo.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              margin: "20px auto",
              maxWidth: "600px",
              textAlign: "center"
            }}
          >

            <div className={todo.completed ? "text-decoration-line-through" : ""}
                 style={todo.completed ? { textDecoration: "line-through" } : {}}>
              <h2>{todo.title}</h2>
              <p><strong>Memo:</strong> {todo.memo}</p >
              <p>Date created: {formatDate(todo.created_at)}</p >
            </div>

            <div style={{ marginTop: "10px" }}>

              {!todo.completed && (
                <button
                  style={{
                    padding: "6px 16px",
                    marginRight: "10px",
                    background: "white",
                    border: "1px solid #3b7ddd",
                    color: "#3b7ddd",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </button>
              )}

              <button
                style={{
                  padding: "6px 16px",
                  marginRight: "10px",
                  background: "white",
                  border: "1px solid #dc3545",
                  color: "#dc3545",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>

              <button
                style={{
                  padding: "6px 16px",
                  background: "white",
                  border: "1px solid #28a745",
                  color: "#28a745",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
                onClick={() => completeTodo(todo.id)}
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;