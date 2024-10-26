import React from 'react';
import { Building, Users, Globe, Award } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      
      <div className="pt-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About VoipEase
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing business communication with enterprise-grade VoIP solutions that are simple, reliable, and affordable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Founded</h3>
              <p className="text-gray-600">2020</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Members</h3>
              <p className="text-gray-600">150+</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Countries</h3>
              <p className="text-gray-600">25+</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Awards</h3>
              <p className="text-gray-600">12</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <p className="mb-6">
              Founded in 2020, VoipEase emerged from a simple observation: business communication shouldn't be complicated. Our founders, having experienced the frustrations of complex and expensive VoIP systems, set out to create a solution that would make enterprise-grade voice communication accessible to businesses of all sizes.
            </p>
            <p className="mb-6">
              Today, we serve thousands of businesses across 25+ countries, helping them communicate more effectively with their teams and customers. Our platform processes millions of minutes of calls each month, maintaining industry-leading uptime and voice quality standards.
            </p>
            <p>
              We're backed by leading venture capital firms and have been recognized with multiple industry awards for our innovative approach to business communication. But what truly drives us is our mission to democratize enterprise-grade communication technology.
            </p>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Simplicity First</h3>
                <p className="text-gray-600">
                  We believe powerful technology should be easy to use. Everything we build follows this principle.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Customer Success</h3>
                <p className="text-gray-600">
                  Your success is our success. We're committed to providing unparalleled support and guidance.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Continuous Innovation</h3>
                <p className="text-gray-600">
                  We're always pushing boundaries to bring you the latest in communication technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}