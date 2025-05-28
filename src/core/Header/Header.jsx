import React from 'react';
import { Link, useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();
  
  const topics = [
    { id: 'home', title: 'Home', subtitle: 'Dashboard',  },
    { id: 'part-a', title: 'Paper I', subtitle: 'Tamil',  },
    { id: 'part-b', title: 'General', subtitle: 'Studies', },
    { id: 'part-c', title: 'Aptitude', subtitle: 'SSLC',  }
  ];

  return (
    <header className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md py-3 sticky top-0  border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <nav className="flex justify-between items-center  py-1">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={topic.id === 'home' ? '/' : `/${topic.id}`}
              className={`flex-1 min-w-[80px] mx-1 px-3 py-2 rounded-lg text-center transition-all duration-200 transform hover:scale-105 ${
                (location.pathname === '/' && topic.id === 'home') || 
                (topic.id !== 'home' && location.pathname.includes(topic.id))
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-blue-800 shadow-sm hover:bg-green-100'
              }`}
            >
              <div className="text-lg">{topic.icon}</div>
              <div className="font-semibold text-sm whitespace-nowrap">{topic.title}</div>
              <div className="text-xs opacity-80 whitespace-nowrap">{topic.subtitle}</div>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;