import { useState } from 'react';
import Todoform from '../Todoform/Todoform';  // Changed to default import
import Todolist from '../Todolist/Todolist';  // Changed to default import

function Home() {
  const [todos, setTodos] = useState([]);

  const addTodo = (title, notes) => {
    const newTodo = {
      id: Date.now(),
      title,
      notes,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updatedTitle, updatedNotes) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, title: updatedTitle, notes: updatedNotes }
          : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo List with Notes
        </h1>
        <Todoform onAdd={addTodo} />
        <Todolist
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      </div>
    </div>
  );
}

export default Home;