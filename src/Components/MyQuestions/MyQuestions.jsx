import { useState, useEffect } from 'react';

const MyQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Load questions from localStorage on component mount
  useEffect(() => {
    try {
      const savedQuestions = localStorage.getItem('my-questions');
      if (savedQuestions) {
        setQuestions(JSON.parse(savedQuestions));
      }
    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  // Save questions to localStorage whenever they change
  useEffect(() => {
    if (hasHydrated) {
      try {
        localStorage.setItem('my-questions', JSON.stringify(questions));
      } catch (error) {
        console.error('Failed to save questions:', error);
      }
    }
  }, [questions, hasHydrated]);

  const addQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        const newQuestions = [...questions, {
          id: Date.now(),
          question: newQuestion,
          answer: newAnswer,
          createdAt: new Date().toISOString()
        }];
        setQuestions(newQuestions);
        setNewQuestion('');
        setNewAnswer('');
        setIsSubmitting(false);
      }, 500);
    }
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
  };

  const filteredQuestions = activeTab === 'answered' 
    ? questions.filter(q => q.answer) 
    : activeTab === 'unanswered' 
      ? questions.filter(q => !q.answer) 
      : questions;

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-green-500 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading your questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Questions</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              className={`h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mb-6 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => { setActiveTab('all'); setIsMobileMenuOpen(false); }}
                className={`px-4 py-2 text-left rounded-md ${activeTab === 'all' ? 'bg-green-100 text-green-700' : 'text-gray-700'}`}
              >
                All Questions
              </button>
              <button
                onClick={() => { setActiveTab('answered'); setIsMobileMenuOpen(false); }}
                className={`px-4 py-2 text-left rounded-md ${activeTab === 'answered' ? 'bg-green-100 text-green-700' : 'text-gray-700'}`}
              >
                Answered
              </button>
              <button
                onClick={() => { setActiveTab('unanswered'); setIsMobileMenuOpen(false); }}
                className={`px-4 py-2 text-left rounded-md ${activeTab === 'unanswered' ? 'bg-green-100 text-green-700' : 'text-gray-700'}`}
              >
                Unanswered
              </button>
            </div>
          </div>
        )}

        <div className="text-center mb-6 md:mb-10">
          <h1 className="hidden md:block text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">My Questions</h1>
          <p className="text-sm md:text-lg text-gray-600">Store and organize your knowledge</p>
        </div>

        {/* Add Question Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 md:mb-10 transition-all duration-300 hover:shadow-xl">
          <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Question
            </h2>
            <form onSubmit={addQuestion}>
              <div className="space-y-3 md:space-y-5">
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">Question</label>
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    placeholder="What would you like to ask?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">Answer</label>
                  <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    placeholder="Enter the answer (optional)"
                    rows={3}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 md:py-3 px-4 md:px-6 rounded-lg font-medium text-white transition-all ${isSubmitting ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} shadow-md hover:shadow-lg flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      Save Question
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center mb-3 md:mb-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Saved Questions
              </h2>
              <div className="hidden md:flex space-x-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 text-sm rounded-md transition-all ${activeTab === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('answered')}
                  className={`px-3 py-1 text-sm rounded-md transition-all ${activeTab === 'answered' ? 'bg-white shadow-sm text-green-600' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  Answered
                </button>
                <button
                  onClick={() => setActiveTab('unanswered')}
                  className={`px-3 py-1 text-sm rounded-md transition-all ${activeTab === 'unanswered' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600 hover:text-gray-800'}`}
                >
                  Unanswered
                </button>
              </div>
            </div>

            {/* Mobile Filter Tabs */}
            <div className="md:hidden grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-2 text-xs sm:text-sm rounded-md transition-all ${activeTab === 'all' ? 'bg-white shadow-sm text-gray-900 border border-gray-200' : 'text-gray-600 hover:text-gray-800 bg-gray-100'}`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('answered')}
                className={`py-2 text-xs sm:text-sm rounded-md transition-all ${activeTab === 'answered' ? 'bg-white shadow-sm text-green-600 border border-gray-200' : 'text-gray-600 hover:text-gray-800 bg-gray-100'}`}
              >
                Answered
              </button>
              <button
                onClick={() => setActiveTab('unanswered')}
                className={`py-2 text-xs sm:text-sm rounded-md transition-all ${activeTab === 'unanswered' ? 'bg-white shadow-sm text-red-600 border border-gray-200' : 'text-gray-600 hover:text-gray-800 bg-gray-100'}`}
              >
                Unanswered
              </button>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8 md:py-10">
                <svg className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-base md:text-lg font-medium text-gray-900">No questions found</h3>
                <p className="mt-1 text-xs md:text-sm text-gray-500">
                  {activeTab === 'all' 
                    ? "Add your first question above!" 
                    : activeTab === 'answered' 
                      ? "You haven't answered any questions yet" 
                      : "All questions have answers!"}
                </p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {filteredQuestions.map((q) => (
                  <div key={q.id} className="group p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">{q.question}</h3>
                        <p className={`text-sm sm:text-base text-gray-600 ${q.answer ? 'bg-green-50 px-2 py-1 sm:px-3 sm:py-2 rounded-md' : 'bg-red-50 px-2 py-1 sm:px-3 sm:py-2 rounded-md'}`}>
                          {q.answer || "No answer provided yet"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 sm:mt-2">
                          Added on {new Date(q.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteQuestion(q.id)}
                        className="opacity-70 md:opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 rounded-full transition-all duration-200"
                        title="Delete question"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQuestions;