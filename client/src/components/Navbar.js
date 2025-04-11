import React, { useState } from 'react';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <header className="pb-20">
      <nav className={`fixed z-50 w-full bg-blue-700 text-white shadow-md transition-all duration-500 ${isOpen ? 'h-auto' : 'h-16'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold tracking-wide">Apni Jagah</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex space-x-6 items-center">
              <NavLinks />
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button onClick={toggleNavbar} aria-label="Toggle menu" className="focus:outline-none">
                <MenuIcon style={{ color: "white" }} fontSize="large" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isOpen && (
          <div className="sm:hidden px-4 pb-4">
            <div className="flex flex-col space-y-2 mt-2 bg-blue-600 rounded-lg shadow-inner py-3">
              <NavLinks onClick={() => setIsOpen(false)} mobile />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

const NavLinks = ({ onClick = () => {}, mobile = false }) => {
  const baseStyle = "transition-colors duration-300 font-medium";
  const linkStyle = mobile
    ? `text-center py-2 px-4 rounded hover:bg-blue-500 ${baseStyle}`
    : `hover:text-blue-200 ${baseStyle}`;

  const links = [
   
    { to: "/", label: "Home" },
    { to: "/Properties", label: "Properties" },
    { to: "/sellproperty", label: "Sell Property" },
    { to: "/Neighbourhood", label: "Around Prop Worth" },
    { to: "/Lens2Nest", label: "Lens2Nest" },
    { to: "/Visual", label: "Visual" },
    { to: "/about", label: "About" },
    { to: "/Developers", label: "Developers" },
    { to: "/Doc", label: "Doc" },
  ];

  return (
    <>
      {links.map(({ to, label }, idx) => (
        <Link key={idx} to={to} onClick={onClick} className={linkStyle}>
          {label}
        </Link>
      ))}
    </>
  );
};


