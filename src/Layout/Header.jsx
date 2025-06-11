import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const  navigate = useNavigate()
  return (
    <div className="h-24 flex items-center ">
      <div className="wraper max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="left flex-1 h-24">
        <h1 className="text-5xl font-semibold font-pacifico leading-[2] bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">EatWisely</h1>

        </div>
        <div className="right flex space-x-4 items-center">
          <button  className="text-black" onClick={() => navigate('/login')}> Login/Signup</button>
          <button className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">Try Now</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
