import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PhoneCall, MessageCircle, X } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import Dialer from '../components/Dialer';
import useAuthStore from '../store/useAuthStore';
import { useTawkTo } from '../hooks/useTawkTo';

export default function DashboardLayout() {
  const [showDialer, setShowDialer] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const { user } = useAuthStore();
  const { openChat } = useTawkTo();

  const handleContactSupport = () => {
    setShowContactSupport(false);
    openChat();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-16">
        <Outlet />
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed right-8 bottom-8 flex flex-col space-y-4 z-50">
        {/* Contact Support Button */}
        <button
          onClick={() => setShowContactSupport(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700"
        >
          <MessageCircle className="h-6 w-6" />
        </button>

        {/* Call Button - Only show for users who can make calls */}
        {user && (
          <button
            onClick={() => setShowDialer(!showDialer)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
          >
            <PhoneCall className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Contact Support Modal */}
      {showContactSupport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Contact Support</h3>
              <button
                onClick={() => setShowContactSupport(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Live Chat Support</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Get instant help from our support team available 24/7.
                </p>
                <button
                  onClick={handleContactSupport}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Start Live Chat
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Email Support</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Send us an email and we'll respond within 24 hours.
                </p>
                <a
                  href="mailto:support@voipease.com"
                  className="block w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-center"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Dialer */}
      {showDialer && (
        <div className="fixed right-8 bottom-24 z-50 animate-fade-in">
          <Dialer />
        </div>
      )}

      {/* Click outside to close modals */}
      {(showDialer || showContactSupport) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => {
            setShowDialer(false);
            setShowContactSupport(false);
          }}
        />
      )}
    </div>
  );
}