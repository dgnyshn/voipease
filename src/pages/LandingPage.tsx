import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Support from '../components/Support';
import { useTawkTo } from '../hooks/useTawkTo';

export default function LandingPage() {
  const { openChat } = useTawkTo();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Support />
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link to="/security" className="text-gray-400 hover:text-white">Security</Link></li>
                <li><Link to="/enterprise" className="text-gray-400 hover:text-white">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/guides" className="text-gray-400 hover:text-white">Guides</Link></li>
                <li><Link to="/status" className="text-gray-400 hover:text-white">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={openChat}
                    className="text-gray-400 hover:text-white"
                  >
                    Support
                  </button>
                </li>
                <li><Link to="/sales" className="text-gray-400 hover:text-white">Sales</Link></li>
                <li><Link to="/partners" className="text-gray-400 hover:text-white">Partners</Link></li>
                <li>
                  <button 
                    onClick={openChat}
                    className="text-gray-400 hover:text-white"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 VoipEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}