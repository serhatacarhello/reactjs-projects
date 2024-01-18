import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export default function useTodo() {
  return useContext(TodoContext);
}
