import React, { useState } from 'react';
import { Search, MailOpen, Trash2 } from 'lucide-react';
import UserVoicemails from '../components/user/UserVoicemails';
import useCallStore from '../store/useCallStore';

function VoicemailPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVoicemails, setSelectedVoicemails] = useState<string[]>([]);
  const { voicemails = [], deleteVoicemail, markVoicemailAsRead } = useCallStore();

  const filteredVoicemails = voicemails.filter(vm => 
    vm.fromNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkAsRead = () => {
    selectedVoicemails.forEach(id => markVoicemailAsRead(id));
    setSelectedVoicemails([]);
  };

  const handleDelete = () => {
    selectedVoicemails.forEach(id => deleteVoicemail(id));
    setSelectedVoicemails([]);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Voicemail</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search voicemails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {selectedVoicemails.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-blue-700">
            {selectedVoicemails.length} items selected
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleMarkAsRead}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50"
            >
              <MailOpen className="h-5 w-5" />
              <span>Mark as Read</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="h-5 w-5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <UserVoicemails voicemails={filteredVoicemails} onSelect={setSelectedVoicemails} />
      </div>
    </div>
  );
}

export default VoicemailPage;