
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2 group">
        <div className="w-12 h-12 bg-gradient-to-r from-kid-blue to-kid-purple rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
          <span className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
            TK
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kid-blue to-kid-purple">
          KidLearn
        </h1>
      </Link>
      
      <div className="hidden md:flex space-x-2">
        <button className="px-4 py-2 rounded-full bg-white border border-kid-blue/20 shadow-sm hover:shadow-md transition-all duration-300 text-kid-blue font-medium">
          Bantuan
        </button>
      </div>
    </header>
  );
};

export default Header;
