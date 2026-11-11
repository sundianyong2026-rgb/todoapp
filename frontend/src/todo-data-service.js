import axios from "axios";
const API_BASE = "http://127.0.0.1:8000/api/todos/";

const TodoDataService = {
  createTodo(data, token) {
    return axios.post(API_BASE, data, {
      headers: { Authorization: `Token ${token}` }
    });
  },
  retrieveAll(token) {
    return axios.get(API_BASE, {
      headers: { Authorization: `Token ${token}` }
    });
  },
  updateTodo(id, data, token) {
    return axios.put(`${API_BASE}${id}/`, data, {
      headers: { Authorization: `Token ${token}` }
    });
  },
  deleteTodo(id, token) {
    return axios.delete(`${API_BASE}${id}/`, {
      headers: { Authorization: `Token ${token}` }
    });
  },

  completeTodo(id, token) {
    return axios.put(`${API_BASE}${id}/complete/`, {}, {
      headers: { Authorization: `Token ${token}` }
    });
  }
};

export default TodoDataService;