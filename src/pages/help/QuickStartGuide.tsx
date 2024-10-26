import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickStartGuide() {
  const steps = [
    {
      title: 'Create Your Account',
      content: 'Sign up for VoipEase and choose a plan based on your calling needs. Our plans are designed to be simple and transparent.'
    },
    {
      title: 'Make Your First Call',
      content: 'Use our web-based dialer to make calls directly from your browser. No downloads or installations required.'
    },
    {
      title: 'Check Your Call History',
      content: 'View your call history, including duration and costs. Monitor your usage and manage your minutes effectively.'
    },
    {
      title: 'Set Up Voicemail',
      content: "Configure your voicemail settings to receive messages when you're unavailable. Access your messages anytime."
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          to="/dashboard/help"
          className="inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Help Center
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">Quick Start Guide</h1>
        <p className="text-gray-500 mt-1">
          Get started with VoipEase in just a few simple steps
        </p>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          Need Additional Help?
        </h2>
        <p className="text-blue-700 mb-4">
          Our support team is available 24/7 to assist you with any questions.
        </p>
        <button 
          onClick={() => {
            if (window.Tawk_API) {
              window.Tawk_API.toggle();
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Chat with Support
        </button>
      </div>
    </div>
  );
}