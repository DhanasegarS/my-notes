import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

// Define and export subjects and colors at the top level
export const subjects = [
  "General English",
  "General Tamil",
  "Aptitude",
  "General Studies",
  "Current Affairs"
];

export const subjectColors = {
  "General English": "bg-blue-100 text-blue-800",
  "General Tamil": "bg-purple-100 text-purple-800",
  "Aptitude": "bg-green-100 text-green-800",
  "General Studies": "bg-yellow-100 text-yellow-800",
  "Current Affairs": "bg-red-100 text-red-800"
};

const Todoform = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [subject, setSubject] = useState(subjects[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, notes, subject);
    setTitle('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
          >
            {subjects.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add details about this task..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
          />
        </div>
        
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-green-400 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm"
        >
          <FaPlus className="text-sm" />
          Add Task
        </button>
      </div>
    </form>
  );
};

export default Todoform;