import { useState, useEffect } from 'react';  // Added useEffect import
import { FaDownload } from 'react-icons/fa';  // Added FaDownload import
import { jsPDF } from 'jspdf';  // Added jsPDF import
import Todoform from '../Todoform/Todoform';
import Todolist from '../Todolist/Todolist';

function Home() {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage if they exist
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, notes) => {
    const newTodo = {
      id: crypto.randomUUID(),
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

  const downloadAllTodos = () => {
    const doc = new jsPDF();
    
    // Add title with current date
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text(`All Todos - ${new Date().toLocaleDateString()}`, 105, 15, null, null, 'center');
    
    // Add todos
    doc.setFontSize(12);
    let yPosition = 30;
    
    todos.forEach((todo, index) => {
      // Set color based on completion status
      if (todo.completed) {
        doc.setTextColor(0, 128, 0); // Green for completed
      } else {
        doc.setTextColor(128, 0, 0); // Red for pending
      }
      
      // Add todo title
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${todo.title}`, 15, yPosition);
      
      // Add status
      doc.setFont('helvetica', 'normal');
      doc.text(`Status: ${todo.completed ? 'Completed' : 'Pending'}`, 15, yPosition + 7);
      
      // Add notes if they exist
      if (todo.notes) {
        doc.setTextColor(80, 80, 80);
        const splitNotes = doc.splitTextToSize(todo.notes, 180);
        doc.text(splitNotes, 15, yPosition + 14);
        yPosition += 14 + (splitNotes.length * 7);
      } else {
        yPosition += 21;
      }
      
      // Add separator
      doc.setDrawColor(200, 200, 200);
      doc.line(15, yPosition, 195, yPosition);
      yPosition += 10;
      
      // Add new page if needed
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });
    
    doc.save(`all-todos-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 px-2 sm:px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Todo List with Notes
            </h1>
            {todos.length > 0 && (
              <button
                onClick={downloadAllTodos}
                className="flex items-center gap-2 bg-blue-600 hover:bg-green-400 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-sm"
              >
                <FaDownload className="text-sm" />
                <span className="hidden sm:inline">Export All</span>
              </button>
            )}
          </div>
          
          <Todoform onAdd={addTodo} />
          <Todolist
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;