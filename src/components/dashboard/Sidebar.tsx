import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  PhoneCall, 
  CreditCard, 
  Settings, 
  BarChart,
  HelpCircle,
  LogOut,
  Voicemail,
  PhoneForwarded,
  User
} from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  const commonMenuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: PhoneCall, label: 'Calls', href: '/dashboard/calls' },
    { icon: Voicemail, label: 'Voicemails', href: '/dashboard/voicemail' },
    { icon: PhoneForwarded, label: 'Forwarded', href: '/dashboard/forwarded' },
    { icon: User, label: 'Profile', href: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    { icon: HelpCircle, label: 'Help & Support', href: '/dashboard/help' }
  ];

  const adminMenuItems = [
    { icon: Users, label: 'Users', href: '/dashboard/users' },
    { icon: BarChart, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' }
  ];

  const menuItems = isAdmin ? [...commonMenuItems, ...adminMenuItems] : commonMenuItems;

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center space-x-2 mb-8">
          <PhoneCall className="h-8 w-8 text-blue-600" />
          <div>
            <span className="text-xl font-bold">VoipEase</span>
            {isAdmin && <span className="text-xs text-blue-600 ml-2">Admin</span>}
          </div>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-6 border-t border-gray-200">
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