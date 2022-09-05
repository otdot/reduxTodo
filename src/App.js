import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addNewTodo, initializeTodos, setTodoDone } from "./reducers/todoSlice";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(initializeTodos());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = e.target.todo.value;
    e.target.todo.value = "";
    dispatch(addNewTodo(todo));
  };

  const handleDone = (id) => {
    dispatch(setTodoDone(id));
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="todo" />
          <button type="submit">Add</button>
        </form>
      </div>
      <div>
        {todos.map((todo) => (
          <p
            style={{ textDecoration: todo.done ? "line-through" : "" }}
            onClick={() => handleDone(todo.id)}
            key={todo.id}
          >
            {todo.todo}
            {todo.id}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
