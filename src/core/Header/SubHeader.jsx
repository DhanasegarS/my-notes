import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

const SubHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsMenuOpen(false); // Close menu on scroll
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'My Questions', href: '/question' },
    { name: 'Coming Soon', href: '/' },
    { name: 'Coming Soon', href: '/' },
    { name: 'Coming Soon', href: '/' },
  ];

  return (
    <nav 
      ref={menuRef}
      className={` w-full z-0 transition-all duration-300 ${isScrolled ? 'bg-gray-50 shadow-sm py-1' : 'bg-white py-2 '}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-lg font-semibold text-gray-800 hover:text-gray-900">
              MyApp
            </Link>
          </div>

          {/* Hamburger menu button - shown on all screens */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className={`h-9 w-8 ${isMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-8 w-8 ${isMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu - appears when hamburger is clicked */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:absolute md:right-60 md:top-16 md:w-50 z-50`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-md shadow-lg ring-1 ring-green-400 ring-opacity-2 transition-all duration-300 ease-in-out">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.href}
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
        </div>
      </div>
    </nav>
  );
};

export default SubHeader;