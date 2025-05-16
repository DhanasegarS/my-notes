import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaDownload,
  FaCheck,
} from "react-icons/fa";
import { jsPDF } from "jspdf";

// Define subjects and colors here to avoid circular imports
const subjects = [
  "General English",
  "General Tamil",
  "Aptitude",
  "General Studies",
  "Current Affairs",
];

const subjectColors = {
  "General English": "bg-blue-100 text-blue-800",
  "General Tamil": "bg-purple-100 text-purple-800",
  Aptitude: "bg-green-100 text-green-800",
  "General Studies": "bg-yellow-100 text-yellow-800",
  "Current Affairs": "bg-red-100 text-red-800",
};

const Todoitem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editNotes, setEditNotes] = useState(todo.notes);
  const [editSubject, setEditSubject] = useState(todo.subject);

  const handleUpdate = () => {
    onUpdate(todo.id, editTitle, editNotes, editSubject);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (confirmDelete) {
      onDelete(todo.id);
    }
  };

  const handleDownload = () => {
  try {
    const doc = new jsPDF();
    
    // Default black color
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(`Task: ${todo.title}`, 15, 15);
    
    doc.setFontSize(12);
    doc.text(`Subject: ${todo.subject}`, 15, 25);
    
    // Status with color
    if (todo.completed) {
      doc.setTextColor(0, 128, 0); // Green
    } else {
      doc.setTextColor(128, 0, 0); // Red
    }
    doc.text(`Status: ${todo.completed ? 'Completed' : 'Pending'}`, 15, 35);
    
    // Notes with dark gray
    doc.setTextColor(80, 80, 80);
    if (todo.notes && typeof todo.notes === 'string' && todo.notes.trim() !== '') {
      const splitNotes = doc.splitTextToSize(todo.notes.trim(), 180);
      doc.text(splitNotes, 15, 45);
    }
    
    doc.save(`task-${todo.id}.pdf`);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    alert('Could not download task PDF. Please try again.');
  }
};

  return (
    <div
      className={`p-4 rounded-lg shadow-sm ${
        todo.completed
          ? "bg-green-50 border border-green-100"
          : "bg-white border border-gray-100"
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <select
            value={editSubject}
            onChange={(e) => setEditSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
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
              className={`flex-shrink-0 mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                todo.completed
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {todo.completed && <FaCheck className="text-xs" />}
            </button>

            <div className="flex-grow">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-1 ${
                  subjectColors[todo.subject]
                }`}
              >
                {todo.subject}
              </span>
              <h3
                className={`font-medium ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
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
                  setEditSubject(todo.subject);
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
