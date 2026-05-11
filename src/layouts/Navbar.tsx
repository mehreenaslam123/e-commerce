import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase">
            Brand
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
            <Link to="/" className="hover:text-gray-500 transition">Shop</Link>
            <Link to="/collections" className="hover:text-gray-500 transition">Collections</Link>
            <Link to="/about" className="hover:text-gray-500 transition">About</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Search size={20} className="cursor-pointer hover:text-gray-500 transition" />
            <User size={20} className="hidden sm:block cursor-pointer hover:text-gray-500 transition" />
            <Link to="/checkout" className="relative cursor-pointer">
              <ShoppingCart size={20} className="hover:text-gray-500 transition" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 p-6 flex flex-col space-y-6 text-lg uppercase font-medium">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-gray-500 transition">Shop</Link>
          <Link to="/collections" onClick={() => setIsOpen(false)} className="hover:text-gray-500 transition">Collections</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-500 transition">About</Link>
          <Link to="/checkout" onClick={() => setIsOpen(false)} className="hover:text-gray-500 transition">Cart ({totalItems})</Link>
        </div>
      )}
    </nav>
  );
};
