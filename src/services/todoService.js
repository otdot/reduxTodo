import axios from "axios";
const baseUrl = "http://localhost:3001/todos";

const getTodos = async () => {
  const todos = await axios.get(baseUrl);
  return todos.data;
};

const createNew = async (todo) => {
  const newTodo = {
    todo: todo,
  };
  const res = await axios.post(baseUrl, newTodo);
  return res.data;
};

const setAsDone = async (id) => {
  const todo = await axios.get(`${baseUrl}/${id}`);
  console.log("res:", todo.data);
  const res = await axios.put(`${baseUrl}/${id}`, {
    ...todo.data,
    done: !todo.data.done,
  });
  return res.data;
};

export default { getTodos, createNew, setAsDone };
