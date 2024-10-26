import React from 'react';
import { Mail, Phone, MapPin, Building } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
              JD
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
              <p className="text-gray-500">Sales Representative</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">john.doe@example.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">+1 234 567 8900</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">Sales</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">New York, USA</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}