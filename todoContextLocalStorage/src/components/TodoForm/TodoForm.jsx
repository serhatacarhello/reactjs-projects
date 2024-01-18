import { useState } from "react";
import useTodo from "../../contexts/TodoContext/useTodo";

export default function TodoForm() {
  const [text, setText] = useState("");

  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    addTodo({ text });
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 mb-3 w-full flex items-center justify-center"
    >
      <input
        type="text"
        name="text"
        id="text"
        placeholder="Add Todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-500 bg-white/20 py-1.5 h-full"
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1.5 bg-green-600 text-white shrink-0 "
      >
        Add
      </button>
    </form>
  );
}
