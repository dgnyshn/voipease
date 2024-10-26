import React from 'react';
import { Book, Video, FileText, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function GuidesPage() {
  const guides = [
    {
      category: 'Getting Started',
      items: [
        {
          title: 'Quick Start Guide',
          description: 'Get up and running with VoipEase in minutes',
          type: 'doc',
          duration: '5 min read'
        },
        {
          title: 'First Call Setup',
          description: 'Learn how to make your first call',
          type: 'video',
          duration: '3 min watch'
        }
      ]
    },
    {
      category: 'Advanced Features',
      items: [
        {
          title: 'Call Routing Setup',
          description: 'Configure advanced call routing rules',
          type: 'doc',
          duration: '10 min read'
        },
        {
          title: 'Analytics Dashboard',
          description: 'Master the analytics dashboard',
          type: 'video',
          duration: '7 min watch'
        }
      ]
    },
    {
      category: 'Best Practices',
      items: [
        {
          title: 'Security Guide',
          description: 'Security best practices for your organization',
          type: 'doc',
          duration: '15 min read'
        },
        {
          title: 'Team Management',
          description: 'Effective team management strategies',
          type: 'doc',
          duration: '8 min read'
        }
      ]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'doc':
      default:
        return FileText;
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="pt-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Guides & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about using VoipEase effectively
            </p>
          </div>

          <div className="space-y-16">
            {guides.map((section) => (
              <div key={section.category}>
                <h2 className="text-2xl font-bold mb-8">{section.category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {section.items.map((item) => {
                    const ItemIcon = getIcon(item.type);
                    return (
                      <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <ItemIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">{item.duration}</span>
                              <button className="flex items-center text-blue-600 hover:text-blue-700">
                                View Guide
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-600 text-white rounded-xl p-12 text-center">
            <Book className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Need more help?</h2>
            <p className="text-xl opacity-90 mb-8">Check out our comprehensive documentation or contact our support team.</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
                View Documentation
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}