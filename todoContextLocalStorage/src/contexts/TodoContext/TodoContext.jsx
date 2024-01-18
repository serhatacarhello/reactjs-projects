import { createContext,  useEffect, useState } from "react";

export const TodoContext = createContext({
  todos: [{ id: 1, text: "Todo Message", completed: false }],

  addTodo: (todo) => {},
  update: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  // get todos from LS
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos && Array.isArray(todos) && todos.length > 0 && setTodos(todos);
  }, []);

  // set todos to LS
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoText) => {
    setTodos((prev) => [
      { id: Date.now(), completed: false, ...todoText },
      ...prev,
    ]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  const contextValue = {
    todos,
    setTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
