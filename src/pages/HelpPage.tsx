import React, { useEffect } from 'react';
import { MessageCircle, Mail, Phone, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function HelpPage() {
  useEffect(() => {
    // Tawk.to Integration
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/YOUR_TAWK_TO_ID/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode?.insertBefore(s1, s0);

    return () => {
      if (window.Tawk_API?.onLoaded) {
        window.Tawk_API.onLoaded = null;
      }
    };
  }, []);

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: FileText,
      articles: [
        { title: 'Quick Start Guide', link: '/dashboard/help/quick-start' },
        { title: 'Setting Up Your Account', link: '/dashboard/help/quick-start#account' },
        { title: 'Making Your First Call', link: '/dashboard/help/quick-start#first-call' },
        { title: 'Understanding Your Dashboard', link: '/dashboard/help/quick-start#dashboard' }
      ]
    },
    {
      title: 'Features & Usage',
      icon: Phone,
      articles: [
        { title: 'Call Management', link: '/dashboard/help/call-management' },
        { title: 'Voicemail Setup', link: '/dashboard/help/call-management#voicemail' },
        { title: 'Call Forwarding', link: '/dashboard/help/call-management#forwarding' },
        { title: 'Conference Calls', link: '/dashboard/help/call-management#conference' }
      ]
    },
    {
      title: 'Billing & Plans',
      icon: Mail,
      articles: [
        { title: 'Understanding Your Bill', link: '/dashboard/help/billing-guide' },
        { title: 'Upgrading Your Plan', link: '/dashboard/help/billing-guide#upgrade' },
        { title: 'Payment Methods', link: '/dashboard/help/billing-guide#payment' },
        { title: 'Usage Tracking', link: '/dashboard/help/billing-guide#usage' }
      ]
    },
    {
      title: 'Troubleshooting',
      icon: MessageCircle,
      articles: [
        { title: 'Common Issues', link: '/dashboard/help/troubleshooting' },
        { title: 'Call Quality Problems', link: '/dashboard/help/troubleshooting#quality' },
        { title: 'Connection Issues', link: '/dashboard/help/troubleshooting#connection' },
        { title: 'Error Messages', link: '/dashboard/help/troubleshooting#errors' }
      ]
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-500 mt-1">
          Find answers or chat with our support team
        </p>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">
          Need immediate assistance?
        </h2>
        <p className="text-blue-700 mb-4">
          Our support team is available 24/7 to help you with any questions or issues.
        </p>
        <button 
          onClick={() => {
            if (window.Tawk_API) {
              window.Tawk_API.toggle();
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Start Live Chat
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {helpCategories.map((category) => (
          <div key={category.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <category.icon className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </div>
            <ul className="space-y-2">
              {category.articles.map((article) => (
                <li key={article.title}>
                  <Link
                    to={article.link}
                    className="block w-full px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Other Ways to Get Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer">
            <Mail className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-medium">Email Support</h3>
            <p className="text-sm text-gray-500">support@voipease.com</p>
          </div>
          <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer">
            <Phone className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-medium">Phone Support</h3>
            <p className="text-sm text-gray-500">+1 (234) 567-8900</p>
          </div>
        </div>
      </div>
    </div>
  );
}