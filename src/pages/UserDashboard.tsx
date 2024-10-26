import React from 'react';
import { Phone } from 'lucide-react';
import UserHeader from '../components/user/UserHeader';
import UserSidebar from '../components/user/UserSidebar';
import UserStats from '../components/user/UserStats';
import UserCalls from '../components/user/UserCalls';
import UserVoicemails from '../components/user/UserVoicemails';
import UserForwardedCalls from '../components/user/UserForwardedCalls';
import AdminDashboard from '../components/admin/AdminDashboard';
import Dialer from '../components/Dialer';
import useAuthStore from '../store/useAuthStore';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [showDialer, setShowDialer] = React.useState(false);
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <UserHeader />
      
      {/* Floating Call Button */}
      <button
        onClick={() => setShowDialer(!showDialer)}
        className="fixed right-8 bottom-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        <Phone className="h-6 w-6" />
      </button>

      {/* Floating Dialer */}
      {showDialer && (
        <div className="fixed right-8 bottom-24 z-50 animate-fade-in">
          <Dialer />
        </div>
      )}
      
      <main className="ml-64 pt-16 p-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {isAdmin ? (
              <AdminDashboard />
            ) : (
              <>
                <UserStats />
                <UserCalls limit={5} />
              </>
            )}
          </div>
        )}
        
        {activeTab === 'calls' && <UserCalls />}
        {activeTab === 'voicemails' && <UserVoicemails />}
        {activeTab === 'forwarded' && <UserForwardedCalls />}

        {/* Click outside to close dialer */}
        {showDialer && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={() => setShowDialer(false)}
          />
        )}
      </main>
    </div>
  );
}