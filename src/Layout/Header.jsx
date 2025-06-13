import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, LogOut, LogIn, UserPlus, X } from "lucide-react";
import { selectUserProfile, logoutUser } from "../redux/slices/userSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle click outside to close dropdown when it was opened by click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownClicked && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsDropdownClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownClicked]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
      setIsDropdownOpen(false);
      setIsDropdownClicked(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
    if (isDropdownClicked) {
      // If already clicked open, close it
      setIsDropdownOpen(false);
      setIsDropdownClicked(false);
    } else {
      // Open by click
      setIsDropdownOpen(true);
      setIsDropdownClicked(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isDropdownClicked) {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isDropdownClicked) {
      setIsDropdownOpen(false);
    }
  };

  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
    setIsDropdownClicked(false);
  };
  
  return (
    <div className="h-24 flex items-center relative">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-4 sm:px-0 ">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="block">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-pacifico  bg-gradient-to-r leading-[2] from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              EatWisely
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Hover Trigger Area */}
              <div className="flex items-center space-x-3 cursor-pointer py-2">
                <span className="text-lg font-medium text-slate-800">
                  Hey, {user.name}
                </span>
                <div 
                  className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm hover:bg-emerald-600 transition-colors duration-150"
                  onClick={handleIconClick}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              
              {/* Dropdown Content */}
              <div className={`absolute right-0 top-full  w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 transition-all duration-200 ease-in-out transform z-50 ${
                isDropdownOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible translate-y-2 pointer-events-none'
              }`}>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 px-4 py-2 text-slate-800 hover:bg-gray-50 transition-colors duration-150"
                  onClick={handleDropdownItemClick}
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    handleDropdownItemClick();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-150"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          ) : ( 
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-gray-700 rounded-lg transition-colors duration-150"
              >
                <LogIn className="w-5 h-5" /> Login
              </Link>
              <Link 
                to="/signup" 
                className="flex items-center gap-2 px-4 py-2 border-2 border-teal-500 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-150"
              >
                <UserPlus className="w-5 h-5" /> Sign Up
              </Link>
              <Link to="/scan">
                <button className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  Try Now
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="p-2 rounded-lg  transition-colors duration-150"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-zinc-900" />
            ) : (
              <Menu className="w-6 h-6 text-zinc-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-slate-800">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                >
                  <X className="w-5 h-5 text-zinc-900" />
                </button>
              </div>
              
              {/* Menu Items */}
              <div className="flex-1 p-4">
                {user ? (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                      <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Hey, {user.name}</p>
                        <p className="text-sm text-slate-600">Welcome back!</p>
                      </div>
                    </div>
                    
                    {/* Menu Links */}
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="w-5 h-5 text-slate-600" />
                        <span className="font-medium text-slate-800">Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-150"
                      >
                        <LogOut className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-red-600">Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      to="/login"
                      className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="w-5 h-5 text-slate-600" />
                      <span className="font-medium text-slate-800">Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center gap-3 p-3 border-2 border-teal-500 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-150"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus className="w-5 h-5" />
                      <span className="font-medium">Sign Up</span>
                    </Link>
                    <Link 
                      to="/scan"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                        Try Now
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;