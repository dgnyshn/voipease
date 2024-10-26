import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { useTawkTo } from '../hooks/useTawkTo';

export default function Support() {
  const { openChat } = useTawkTo();

  return (
    <div id="support" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            24/7 Support
          </h2>
          <p className="text-xl text-gray-600">
            Our expert team is here to help you succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Live Chat Support */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl text-white text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-blue-100 mb-6">
              Get instant help from our support team
            </p>
            <button 
              onClick={openChat}
              className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Chat Now
            </button>
          </div>

          {/* Email Support */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-6">
              Response within 24 hours
            </p>
            <a
              href="mailto:support@voipease.com"
              className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Need assistance? Our support team is ready to help.
          </p>
          <button
            onClick={openChat}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg"
          >
            Chat with Us
          </button>
        </div>
      </div>
    </div>
  );
}