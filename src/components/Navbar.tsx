import React from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, login } = useAuthStore();

  const handleStartTrial = async () => {
    navigate('/signup');
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Phone className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">VoipEase</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
            <a href="#support" className="text-gray-600 hover:text-blue-600">Support</a>
            {isAuthenticated ? (
              <Link 
                to="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Sign in
                </Link>
                <button 
                  onClick={handleStartTrial}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Start Free Trial
                </button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Features</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Pricing</a>
            <a href="#support" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Support</a>
            {isAuthenticated ? (
              <Link 
                to="/dashboard"
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600"
                >
                  Sign in
                </Link>
                <button 
                  onClick={handleStartTrial}
                  className="w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Start Free Trial
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}