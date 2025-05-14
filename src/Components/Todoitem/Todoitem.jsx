import { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes, FaDownload } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

const Todoitem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editNotes, setEditNotes] = useState(todo.notes);

  const handleUpdate = () => {
    onUpdate(todo.id, editTitle, editNotes);
    setIsEditing(false);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(`Todo: ${todo.title}`, 10, 10);
    doc.text(`Status: ${todo.completed ? 'Completed' : 'Pending'}`, 10, 20);
    doc.text('Notes:', 10, 30);
    doc.text(todo.notes, 10, 40);
    doc.save(`todo-${todo.id}.pdf`);
  };

  return (
    <div
      className={`p-4 border rounded-lg ${
        todo.completed ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            className="w-full px-3 py-2 border rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <FaTimes />
            </button>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaSave />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
            />
            <span
              className={`ml-3 flex-1 ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {todo.title}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDownload()}
                className="text-blue-500 hover:text-blue-700"
                title="Download as PDF"
              >
                <FaDownload />
              </button>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditTitle(todo.title);
                  setEditNotes(todo.notes);
                }}
                className="text-yellow-500 hover:text-yellow-700"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          {todo.notes && (
            <div className="ml-8 p-3 bg-gray-50 rounded text-gray-700">
              {todo.notes}
            </div>
          )}
          <div className="ml-8 text-xs text-gray-400">
            Created: {new Date(todo.createdAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Todoitem;