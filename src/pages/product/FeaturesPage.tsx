import React from 'react';
import { Phone, Shield, Globe, Users, Clock, Zap, Headphones, Settings } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function FeaturesPage() {
  const features = [
    {
      icon: Phone,
      title: 'Crystal Clear Calls',
      description: 'HD voice quality with advanced noise cancellation for professional communication.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'End-to-end encryption and advanced security protocols to protect your communications.'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Make calls to and from anywhere in the world with competitive international rates.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Built-in tools for team communication and collaboration.'
    },
    {
      icon: Clock,
      title: 'Call Analytics',
      description: 'Detailed insights into call patterns, quality, and team performance.'
    },
    {
      icon: Zap,
      title: 'Easy Integration',
      description: 'Seamlessly integrate with your existing tools and workflows.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock support from our expert team.'
    },
    {
      icon: Settings,
      title: 'Custom Solutions',
      description: 'Tailored solutions to meet your specific business needs.'
    }
  ];

  const integrations = [
    {
      name: 'Salesforce',
      logo: 'https://www.salesforce.com/news/wp-content/uploads/sites/3/2021/05/Salesforce-logo.jpg'
    },
    {
      name: 'Slack',
      logo: 'https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_256.png'
    },
    {
      name: 'Microsoft Teams',
      logo: 'https://www.microsoft.com/en-us/microsoft-teams/teams-for-work'
    }
  ];

  return (
    <div>
      <Navbar />
      
      <div className="pt-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Features
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for professional business communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm">
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-600 text-white rounded-xl p-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-xl opacity-90">Join thousands of businesses using VoipEase</p>
            </div>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Contact Sales
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-center mb-12">Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {integrations.map((integration) => (
                <div key={integration.name} className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="h-16 w-auto mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold">{integration.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}