import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, LogOut, LogIn, UserPlus } from "lucide-react";
import { selectUserProfile, logoutUser } from "../redux/slices/userSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className="h-24 flex items-center ">
      <div className="wraper max-w-6xl mx-auto w-full flex items-center justify-between">
        <nav className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="navbar-start">
            <Link to="/" className="text-2xl font-bold font-pacifico">
              <div className="left flex-1 h-24">
                <h1 className="text-5xl font-semibold font-pacifico leading-[2] bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  EatWisely
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-end hidden md:flex items-center gap-4">
            {user ? (
              <div className="dropdown dropdown-end ">
                <label tabIndex={0} className="btn bg-emerald-500 btn-circle avatar">
                  <User className="w-6 h-6" />
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white text-slate-800 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" className="flex items-center gap-2 ">
                      <User className="w-4 h-4 " /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn  flex items-center gap-2"
                >
                  <LogIn className="w-5 h-5" /> Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-outline btn-accent  "
                >
                  <UserPlus className="w-5 h-5" /> Sign Up
                </Link>
                <Link to="/scan">
                  <button className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                    Try Now
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="navbar-end md:hidden">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden w-full bg-white text-slate-800 shadow-lg mt-2 rounded-box">
              <ul className="menu p-4">
                {user ? (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="w-4 h-4" /> Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 text-red-600"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="flex items-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogIn className="w-4 h-4" /> Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="flex items-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <UserPlus className="w-4 h-4" /> Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
