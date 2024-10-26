import React from 'react';
import { Bell, Phone } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user } = useAuthStore();
  
  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-10">
      <div className="flex items-center justify-between h-16 px-8 ml-64">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <Phone className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">VoipEase</span>
          {user?.role === 'admin' && (
            <span className="text-xs text-blue-600 ml-2">Admin</span>
          )}
        </Link>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {user?.name.charAt(0)}
            </div>
            <span className="text-sm font-medium">{user?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
}