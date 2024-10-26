import React from 'react';
import { Bell, Search } from 'lucide-react';

export default function UserHeader() {
  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-10">
      <div className="flex items-center justify-between h-16 px-8 ml-64">
        <div className="flex items-center flex-1">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search calls..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-500">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              2
            </span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}