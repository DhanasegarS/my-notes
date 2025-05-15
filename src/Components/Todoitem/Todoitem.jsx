import { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes, FaDownload, FaCheck } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

const Todoitem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editNotes, setEditNotes] = useState(todo.notes);

  const handleUpdate = () => {
    onUpdate(todo.id, editTitle, editNotes);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (confirmDelete) {
      onDelete(todo.id);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    
    // Set title with larger font
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text(`Task: ${todo.title}`, 15, 15);
    
    // Set status color based on completion
    if (todo.completed) {
      doc.setTextColor(0, 128, 0); // Green for completed
    } else {
      doc.setTextColor(128, 0, 0); // Red for pending
    }
    
    // Add status text
    doc.setFontSize(12);
    doc.text(`Status: ${todo.completed ? 'Completed' : 'Pending'}`, 15, 25);
    
    // Add notes if they exist
    if (todo.notes) {
      doc.setTextColor(80, 80, 80);
      const splitNotes = doc.splitTextToSize(todo.notes, 180);
      doc.text(splitNotes, 15, 35);
    }
    
    // Add creation date at bottom
    doc.setTextColor(100, 100, 100);
    doc.text(`Created: ${new Date(todo.createdAt).toLocaleString()}`, 15, doc.internal.pageSize.height - 15);
    
    doc.save(`task-${todo.id}.pdf`);
  };

  return (
    <div className={`p-4 rounded-lg shadow-sm ${todo.completed ? 'bg-green-50 border border-green-100' : 'bg-white border border-gray-100'}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
          <textarea
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              <FaTimes />
            </button>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <FaSave />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <button
              onClick={() => onToggle(todo.id)}
              className={`flex-shrink-0 mt-1 w-5 h-5 rounded border flex items-center justify-center ${todo.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
            >
              {todo.completed && <FaCheck className="text-xs" />}
            </button>
            
            <div className="flex-grow">
              <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.title}
              </h3>
              {todo.notes && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg text-gray-700 text-sm">
                  {todo.notes}
                </div>
              )}
              <div className="mt-2 text-xs text-gray-400">
                Created: {new Date(todo.createdAt).toLocaleString()}
              </div>
            </div>
            
            <div className="flex flex-shrink-0 gap-1">
              <button
                onClick={handleDownload}
                className="p-2 text-indigo-500 hover:text-indigo-700 rounded-full hover:bg-indigo-50 transition-colors"
                title="Download as PDF"
              >
                <FaDownload className="text-sm" />
              </button>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditTitle(todo.title);
                  setEditNotes(todo.notes);
                }}
                className="p-2 text-yellow-500 hover:text-yellow-700 rounded-full hover:bg-yellow-50 transition-colors"
                title="Edit"
              >
                <FaEdit className="text-sm" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todoitem;