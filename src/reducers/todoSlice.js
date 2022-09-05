import { createSlice } from "@reduxjs/toolkit";
import todoService from "../services/todoService";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    set_todos(state, action) {
      return action.payload;
    },
    add_todos(state, action) {
      state.push(action.payload);
    },
    setDone(state, action) {
      const updatedTodo = action.payload;
      return state.map((todo) =>
        todo.id !== updatedTodo.id ? todo : updatedTodo
      );
    },
  },
});

export const { set_todos, add_todos, setDone } = todoSlice.actions;

export const initializeTodos = () => {
  return async (dispatch) => {
    const todos = await todoService.getTodos();
    dispatch(set_todos(todos));
  };
};

export const addNewTodo = (content) => {
  return async (dispatch) => {
    const newTodo = await todoService.createNew(content);
    dispatch(add_todos(newTodo));
  };
};

export const setTodoDone = (id) => {
  return async (dispatch) => {
    const updatedTodo = await todoService.setAsDone(id);
    dispatch(setDone(updatedTodo));
  };
};

export default todoSlice.reducer;
