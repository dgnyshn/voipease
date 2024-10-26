import React from 'react';
import { ArrowLeft, Phone, Voicemail, PhoneForwarded } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CallManagement() {
  const sections = [
    {
      icon: Phone,
      title: 'Making Calls',
      description: 'Learn how to make and manage calls through our web interface.',
      content: [
        {
          subtitle: 'Using the Web Dialer',
          steps: [
            'Click the phone icon in the bottom right corner of any page',
            'Enter the phone number using the dialer keypad',
            'Click the green call button to start the call',
            'During the call, use the mute button if needed'
          ]
        },
        {
          subtitle: 'Call History',
          steps: [
            'Access call history from the "Calls" section in the sidebar',
            'View all your incoming and outgoing calls',
            'Search for specific calls using the search bar',
            'See call duration and cost details for each call'
          ]
        }
      ]
    },
    {
      icon: Voicemail,
      title: 'Voicemail',
      description: 'Leave and manage voicemail messages.',
      content: [
        {
          subtitle: 'Leaving a Voicemail',
          steps: [
            'When making a call, click the voicemail icon if the call is not answered',
            'Record your message when prompted',
            'Click end call when finished recording',
            'The message will be delivered to the recipient'
          ]
        },
        {
          subtitle: 'Managing Voicemails',
          steps: [
            'Access your voicemails from the "Voicemail" section in the sidebar',
            'Click play to listen to messages',
            'Use the search bar to find specific voicemails',
            'Mark messages as read or delete them as needed'
          ]
        }
      ]
    },
    {
      icon: PhoneForwarded,
      title: 'Call Forwarding',
      description: 'Set up and manage call forwarding.',
      content: [
        {
          subtitle: 'Setting Up Forwarding',
          steps: [
            'Go to the "Forwarded" section in the sidebar',
            'Enter your forwarding number in the settings area',
            'Choose when to forward calls (Always, When busy, etc.)',
            'Save your forwarding preferences'
          ]
        },
        {
          subtitle: 'Managing Forwarded Calls',
          steps: [
            'View your forwarded calls history in the same section',
            'See which calls were forwarded and to what numbers',
            'Monitor the status of active forwarded calls',
            'Search through your forwarding history'
          ]
        }
      ]
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
        <h1 className="text-2xl font-bold text-gray-900 mt-4">Call Management</h1>
        <p className="text-gray-500 mt-1">
          Learn how to use VoipEase's calling features effectively
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <section.icon className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>
            <p className="text-gray-600 mb-6">{section.description}</p>
            
            <div className="space-y-6">
              {section.content.map((subsection) => (
                <div key={subsection.subtitle} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">{subsection.subtitle}</h3>
                  <ul className="space-y-2">
                    {subsection.steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm flex-shrink-0 mr-3">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          Need More Help?
        </h2>
        <p className="text-blue-700 mb-4">
          Our support team is available 24/7 to assist you with any questions about call management.
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