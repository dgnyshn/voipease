import React from 'react';
import { PhoneCall, Users, Headphones, DollarSign } from 'lucide-react';

export default function Features() {
  return (
    <div id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose VoipEase?
          </h2>
          <p className="text-xl text-gray-600">
            Discover the features that make us stand out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex gap-4">
            <PhoneCall className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Web-Based Calling</h3>
              <p className="text-gray-600">
                Make and receive calls directly from your browser. No downloads required.
                Crystal clear audio quality and minimal latency.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <DollarSign className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">
                No hidden fees or surprise charges. Pay only for what you use with
                our straightforward pricing plans.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Users className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Multi-User Management</h3>
              <p className="text-gray-600">
                Easily manage your team with advanced call routing, voicemail,
                and user permissions.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Headphones className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
              <p className="text-gray-600">
                Get help when you need it. Our support team responds within 24 hours,
                ensuring your business never stops.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}