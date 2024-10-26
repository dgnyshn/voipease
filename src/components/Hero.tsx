import React from 'react';
import { PhoneCall, Users, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function Hero() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleStartTrial = async () => {
    // Simulate trial account creation
    await login('trial@example.com', 'trial');
    navigate('/dashboard');
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional VoIP Solutions <br />
            <span className="text-blue-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Enterprise-grade voice communication with crystal clear quality, 
            designed for modern businesses of all sizes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleStartTrial}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Free Trial
            </button>
            <a 
              href="#pricing"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <PhoneCall className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Web-Based Calling</h3>
            <p className="text-gray-600">Make calls directly from your browser with exceptional clarity</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Users className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Team Management</h3>
            <p className="text-gray-600">Easily manage multiple users and call routing</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Clock className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock assistance for your business needs</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Calls</h3>
            <p className="text-gray-600">Enterprise-grade security for all communications</p>
          </div>
        </div>
      </div>
    </div>
  );
}