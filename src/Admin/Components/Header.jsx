import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">MyWebsite</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Services</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <nav className="md:hidden bg-white shadow-md border-t">
          <ul className="flex flex-col text-gray-700 font-medium">
            <li className="border-b">
              <a href="#" className="block px-4 py-3 hover:bg-gray-100">Home</a>
            </li>
            <li className="border-b">
              <a href="#" className="block px-4 py-3 hover:bg-gray-100">About</a>
            </li>
            <li className="border-b">
              <a href="#" className="block px-4 py-3 hover:bg-gray-100">Services</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 hover:bg-gray-100">Contact</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
