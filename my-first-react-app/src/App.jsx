import { useState } from "react";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (todo.trim() === "") return;

    setTodos((prev) => [...prev, todo]);
    setTodo("");
  };

  const handleDelete = (indexToDelete) => {
    setTodos((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-96 p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="flex-1 border p-2 rounded-lg"
            placeholder="Enter a task..."
          />

          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((item, index) => (
            <li
              key={index}
              className="flex justify-between bg-gray-100 p-2 rounded-lg"
            >
              {item}
              <button
                onClick={()=> handleDelete(index)}
                className="bg-red-500 text-white px-4 rounded-lg"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
