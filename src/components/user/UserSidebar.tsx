import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, User, Settings, BarChart, HelpCircle, LogOut, Voicemail, PhoneForwarded, Users, CreditCard } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

interface UserSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function UserSidebar({ activeTab, setActiveTab }: UserSidebarProps) {
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const location = useLocation();

  const commonMenuItems = [
    { id: 'overview', icon: BarChart, label: 'Overview', href: '/dashboard' },
    { id: 'calls', icon: Phone, label: 'Calls', href: '/dashboard/calls' },
    { id: 'voicemails', icon: Voicemail, label: 'Voicemails', href: '/dashboard/voicemail' },
    { id: 'forwarded', icon: PhoneForwarded, label: 'Forwarded', href: '/dashboard/forwarded' },
    { id: 'profile', icon: User, label: 'Profile', href: '/dashboard/profile' },
    { id: 'settings', icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  const adminMenuItems = [
    { id: 'users', icon: Users, label: 'Users', href: '/dashboard/users' },
    { id: 'billing', icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
  ];

  const menuItems = isAdmin ? [...commonMenuItems, ...adminMenuItems] : commonMenuItems;

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Phone className="h-8 w-8 text-blue-600" />
          <div>
            <span className="text-xl font-bold">VoipEase</span>
            {isAdmin && <span className="text-xs text-blue-600 ml-2">Admin</span>}
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-6 border-t border-gray-200">
        <button className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
          <HelpCircle className="h-5 w-5" />
          <span>Help & Support</span>
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}