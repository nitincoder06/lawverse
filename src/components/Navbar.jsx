import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
import { ADMIN_UID } from '../config.js';

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Error logging out:", error));
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-amber-600">
          <Link to="/">Lawverse</Link>
        </div>
        
        <ul className="hidden md:flex space-x-8 items-center font-semibold">
          <li><Link to="/" className="text-gray-600 hover:text-amber-600">Home</Link></li>
          <li><Link to="/find-a-lawyer" className="text-gray-600 hover:text-amber-600">Find a Lawyer</Link></li>
          <li><Link to="/ebooks" className="text-gray-600 hover:text-amber-600">E-books</Link></li>
          <li><Link to="/hearings" className="text-gray-600 hover:text-amber-600">Hearings</Link></li>
        </ul>
        
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center text-gray-700 bg-gray-100 px-4 py-2 rounded-lg focus:outline-none hover:bg-gray-200 capitalize">
                {currentUser.email.split('@')[0]}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                  <Link to="/my-bookings" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Bookings</Link>
                  {currentUser.uid === ADMIN_UID && (
                    <Link to="/admin" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-amber-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-300">
              Login / Sign Up
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button className="text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;