import React from 'react';
import { ArrowLeft, CreditCard, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BillingGuide() {
  const sections = [
    {
      icon: Clock,
      title: 'Understanding Your Minutes',
      description: 'Learn how minutes work in your plan.',
      content: [
        {
          subtitle: 'Checking Your Balance',
          steps: [
            'View remaining minutes on your dashboard',
            'Monitor usage in real-time',
            'Set up low balance notifications',
            'Purchase additional minutes when needed'
          ]
        },
        {
          subtitle: 'Usage Tracking',
          steps: [
            'Access detailed call history',
            'View duration and cost of each call',
            'Monitor international vs domestic usage',
            'Track cost savings compared to traditional calls'
          ]
        }
      ]
    },
    {
      icon: DollarSign,
      title: 'Plans & Pricing',
      description: 'Understand our simple pricing structure.',
      content: [
        {
          subtitle: 'Plan Features',
          steps: [
            'Starter: 500 minutes/month at $19',
            'Professional: 2000 minutes/month at $49',
            'Enterprise: Unlimited minutes at $99',
            'All plans include web-based calling'
          ]
        },
        {
          subtitle: 'Call Rates',
          steps: [
            'Domestic calls: $0.02/minute',
            'International calls: Starting at $0.10/minute',
            'No setup or monthly fees',
            'Pay only for what you use'
          ]
        }
      ]
    },
    {
      icon: CreditCard,
      title: 'Managing Your Subscription',
      description: 'Handle billing and payments.',
      content: [
        {
          subtitle: 'Payment Methods',
          steps: [
            'Add or update credit card information',
            'Set up automatic payments',
            'View and download invoices',
            'Update billing information'
          ]
        },
        {
          subtitle: 'Billing Cycles',
          steps: [
            'Monthly billing on subscription date',
            'Pro-rated charges for upgrades',
            'Automatic renewal process',
            'Cancel anytime with no penalties'
          ]
        }
      ]
    },
    {
      icon: TrendingUp,
      title: 'Cost Optimization',
      description: 'Maximize value from your plan.',
      content: [
        {
          subtitle: 'Saving Tips',
          steps: [
            'Monitor your usage patterns',
            'Choose the right plan for your needs',
            'Use included features effectively',
            'Compare savings vs traditional calls'
          ]
        },
        {
          subtitle: 'Usage Reports',
          steps: [
            'Download monthly usage reports',
            'Track cost savings over time',
            'Analyze call patterns',
            'Identify peak usage times'
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
        <h1 className="text-2xl font-bold text-gray-900 mt-4">Billing Guide</h1>
        <p className="text-gray-500 mt-1">
          Everything you need to know about billing and payments
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
          Need Help with Billing?
        </h2>
        <p className="text-blue-700 mb-4">
          Our billing support team is available 24/7 to assist you.
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