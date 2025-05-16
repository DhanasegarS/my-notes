import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import Todoform from "../Todoform/Todoform";
import Todolist from "../Todolist/Todolist";
import { subjects, subjectColors } from "../Todoform/Todoform";

function Home() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [activeSubject, setActiveSubject] = useState("All");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, notes, subject) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      notes,
      subject,
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

  const updateTodo = (id, updatedTitle, updatedNotes, updatedSubject) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: updatedTitle,
              notes: updatedNotes,
              subject: updatedSubject,
            }
          : todo
      )
    );
  };

  const filteredTodos =
    activeSubject === "All"
      ? todos
      : todos.filter((todo) => todo.subject === activeSubject);

  const calculateSubjectProgress = (subject) => {
    const subjectTodos = todos.filter((todo) => todo.subject === subject);
    if (subjectTodos.length === 0) return 0;
    const completed = subjectTodos.filter((todo) => todo.completed).length;
    return Math.round((completed / subjectTodos.length) * 100);
  };

  const downloadAllTodos = () => {
  try {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text(`My Study Plan - ${new Date().toLocaleDateString()}`, 105, 15, { align: 'center' });
    
    let yPosition = 30;
    
    todos.forEach((todo, index) => {
      // Reset to default black color for most text
      doc.setTextColor(0, 0, 0);
      
      // Subject
      doc.setFontSize(12);
      doc.text(`Subject: ${todo.subject}`, 15, yPosition);
      
      // Title
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${todo.title}`, 15, yPosition + 10);
      
      // Status - Simplified color approach
      doc.setFont('helvetica', 'normal');
      if (todo.completed) {
        doc.setTextColor(0, 128, 0); // Green for completed
      } else {
        doc.setTextColor(128, 0, 0); // Red for pending
      }
      doc.text(`Status: ${todo.completed ? 'Completed' : 'Pending'}`, 15, yPosition + 16);
      
      // Reset to dark gray for notes
      doc.setTextColor(80, 80, 80);
      
      // Notes handling
      if (todo.notes && typeof todo.notes === 'string') {
        const cleanNotes = todo.notes.trim();
        if (cleanNotes !== '') {
          const splitNotes = doc.splitTextToSize(cleanNotes, 180);
          doc.text(splitNotes, 15, yPosition + 22);
          yPosition += 22 + (splitNotes.length * 7);
        } else {
          yPosition += 28;
        }
      } else {
        yPosition += 28;
      }
      
      // Separator line
      doc.setDrawColor(200, 200, 200);
      doc.line(15, yPosition, 195, yPosition);
      yPosition += 10;
      
      // Page break if needed
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });
    
    doc.save(`SK-study-plan-${new Date().toISOString().slice(0, 10)}.pdf`);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    alert('Could not generate PDF. Please try again later.');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 px-2 sm:px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              My Study Planner
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

          {/* Subject Progress Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div
              onClick={() => setActiveSubject("All")}
              className={`bg-white p-3 rounded-lg shadow cursor-pointer transition-all ${
                activeSubject === "All" ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <h3 className="font-medium text-sm">All Subjects</h3>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${
                        todos.length > 0
                          ? Math.round(
                              (todos.filter((t) => t.completed).length /
                                todos.length) *
                                100
                            )
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  {todos.filter((t) => t.completed).length} / {todos.length}
                </p>
              </div>
            </div>

            {subjects.map((subject) => (
              <div
                key={subject}
                onClick={() => setActiveSubject(subject)}
                className={`bg-white p-3 rounded-lg shadow cursor-pointer transition-all ${
                  activeSubject === subject ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <h3 className="font-medium text-sm">{subject}</h3>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        subjectColors[subject].split(" ")[0]
                      }`}
                      style={{ width: `${calculateSubjectProgress(subject)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-gray-500">
                    {
                      todos.filter((t) => t.subject === subject && t.completed)
                        .length
                    }{" "}
                    / {todos.filter((t) => t.subject === subject).length}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Todoform onAdd={addTodo} />
          <Todolist
            todos={filteredTodos}
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
