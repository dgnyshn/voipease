import React from 'react';
import { Building, Users, Shield, Headphones, Server, Settings } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function EnterprisePage() {
  const features = [
    {
      icon: Users,
      title: 'Unlimited Users',
      description: 'Scale your team without limitations. Add as many users as you need.'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Enterprise-grade security features including custom encryption and compliance tools.'
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: '24/7 priority support with dedicated account manager.'
    },
    {
      icon: Server,
      title: 'Private Cloud',
      description: 'Optional private cloud deployment for complete control.'
    },
    {
      icon: Settings,
      title: 'Custom Integration',
      description: 'Custom API access and integration support.'
    }
  ];

  const customers = [
    {
      name: 'Global Corp',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Tech Solutions',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3624?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Innovate Inc',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3625?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    }
  ];

  return (
    <div>
      <Navbar />
      
      <div className="pt-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Enterprise Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scalable, secure, and customizable VoIP solutions for large organizations
            </p>
            <div className="mt-8">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 mr-4">
                Contact Sales
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50">
                Schedule Demo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-8 rounded-xl shadow-sm">
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-12 mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Industry Leaders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {customers.map((customer) => (
                <div key={customer.name} className="flex items-center justify-center">
                  <img
                    src={customer.logo}
                    alt={customer.name}
                    className="h-16 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-xl p-12">
            <div className="md:flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-xl opacity-90">Let's discuss your enterprise needs</p>
              </div>
              <div className="mt-6 md:mt-0">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}