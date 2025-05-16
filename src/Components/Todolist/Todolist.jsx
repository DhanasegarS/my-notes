import Todoitem from "../Todoitem/Todoitem";
import { FaClipboardList } from "react-icons/fa";

const Todolist = ({ todos, onToggle, onDelete, onUpdate, activeSubject = "All" }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">
          <FaClipboardList className="w-12 h-12 mx-auto" />
        </div>
        <p className="text-gray-500">
          {activeSubject === "All" 
            ? "No tasks yet. Add one above!" 
            : `No tasks for ${activeSubject}. Add one or switch subjects!`}
        </p>
      </div>
    );
  }

  // Calculate completion percentage
  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <Todoitem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
      
      {/* Progress summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800 font-medium">
          Showing {totalCount} {totalCount === 1 ? "task" : "tasks"} 
          {activeSubject !== "All" && ` in ${activeSubject}`}
        </p>
        <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-blue-600 mt-1">
          {completedCount} of {totalCount} completed ({completionPercentage}%)
        </p>
      </div>
    </div>
  );
};

export default Todolist;