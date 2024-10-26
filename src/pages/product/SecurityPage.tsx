import React from 'react';
import { Shield, Lock, Key, FileCheck, AlertTriangle, Server, Users, CheckCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All calls and data are encrypted using industry-standard protocols.'
    },
    {
      icon: Key,
      title: 'Access Control',
      description: 'Granular permissions and role-based access control.'
    },
    {
      icon: FileCheck,
      title: 'Compliance',
      description: 'GDPR, HIPAA, and SOC 2 Type II compliant.'
    },
    {
      icon: AlertTriangle,
      title: 'Threat Detection',
      description: '24/7 monitoring and automated threat detection.'
    },
    {
      icon: Server,
      title: 'Data Centers',
      description: 'Secure, redundant data centers with 99.99% uptime.'
    },
    {
      icon: Users,
      title: 'User Authentication',
      description: 'Multi-factor authentication and SSO support.'
    }
  ];

  const certifications = [
    'ISO 27001',
    'SOC 2 Type II',
    'GDPR Compliant',
    'HIPAA Compliant',
    'PCI DSS',
    'CCPA Compliant'
  ];

  return (
    <div>
      <Navbar />
      
      <div className="pt-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Enterprise-Grade Security
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your security is our top priority. We employ industry-leading security measures to protect your communications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {securityFeatures.map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm">
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-12 mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Certifications & Compliance</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center justify-center p-4 border border-gray-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-xl p-12">
            <div className="text-center">
              <Shield className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Want to learn more about our security?</h2>
              <p className="text-xl opacity-90 mb-8">Download our security whitepaper or talk to our team.</p>
              <div className="flex justify-center space-x-4">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
                  Download Whitepaper
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                  Contact Security Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}