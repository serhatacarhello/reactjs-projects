import { useState } from "react";
import useTodo from "../../contexts/TodoContext/useTodo";

export default function TodoItem({ todo }) {
  const { id, text, completed } = todo;
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(text);

  const { deleteTodo, toggleComplete, updateTodo } = useTodo();

  const editTodo = () => {
    updateTodo(id, { ...todo, text: todoMsg });
    setIsTodoEditable(false);
  };

  const todoCompleted = () => {
    toggleComplete(id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        completed ? "bg-[#ccbed7]" : "bg-[#c6e9a7]"
      }`}
    >
      <input
        type="checkbox"
        className="curser-pointer"
        checked={completed}
        onChange={todoCompleted}
      />
      <input
        type="text"
        className={` border  outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable
            ? "border-black/10 px-2 bg-white/80"
            : "border-transparent"
        }`}
        value={todoMsg}
        readOnly={!isTodoEditable}
        onChange={(e) => setTodoMsg(e.target.value)}
      />
      <button
        type="button"
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-100 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (completed) return;
          isTodoEditable ? editTodo() : setIsTodoEditable((prev) => !prev);
        }}
        disabled={completed}
      >
        {" "}
        {isTodoEditable ? "📁" : "✏️"}{" "}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-100 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(id)}
      >
        ❌
      </button>
    </div>
  );
}
