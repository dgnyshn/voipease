import React from 'react';
import { Code, Headphones, TrendingUp, Users, MapPin, Briefcase } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function CareersPage() {
  const departments = [
    {
      name: 'Engineering',
      icon: Code,
      positions: [
        { title: 'Senior Backend Engineer', location: 'Remote', type: 'Full-time' },
        { title: 'Frontend Developer', location: 'New York', type: 'Full-time' },
        { title: 'DevOps Engineer', location: 'Remote', type: 'Full-time' }
      ]
    },
    {
      name: 'Customer Support',
      icon: Headphones,
      positions: [
        { title: 'Customer Success Manager', location: 'London', type: 'Full-time' },
        { title: 'Technical Support Specialist', location: 'Remote', type: 'Full-time' }
      ]
    },
    {
      name: 'Sales',
      icon: TrendingUp,
      positions: [
        { title: 'Account Executive', location: 'New York', type: 'Full-time' },
        { title: 'Sales Development Representative', location: 'London', type: 'Full-time' }
      ]
    }
  ];

  const benefits = [
    {
      title: 'Competitive Salary',
      description: 'Industry-leading compensation packages with equity options'
    },
    {
      title: 'Remote Work',
      description: 'Work from anywhere with flexible hours'
    },
    {
      title: 'Health Insurance',
      description: 'Comprehensive health, dental, and vision coverage'
    },
    {
      title: 'Learning Budget',
      description: 'Annual budget for courses, conferences, and books'
    },
    {
      title: 'Paid Time Off',
      description: 'Generous vacation policy and paid holidays'
    },
    {
      title: 'Team Events',
      description: 'Regular team meetups and annual company retreats'
    }
  ];

  return (
    <div>
      <Navbar />
      
      <div className="pt-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us revolutionize business communication. We're looking for talented individuals who share our passion for innovation.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
            <div className="space-y-12">
              {departments.map((dept) => (
                <div key={dept.name}>
                  <div className="flex items-center space-x-3 mb-6">
                    <dept.icon className="h-8 w-8 text-blue-600" />
                    <h3 className="text-2xl font-semibold">{dept.name}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dept.positions.map((position) => (
                      <div key={position.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 transition-colors">
                        <h4 className="text-lg font-semibold mb-2">{position.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {position.type}
                          </div>
                        </div>
                        <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Apply Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}