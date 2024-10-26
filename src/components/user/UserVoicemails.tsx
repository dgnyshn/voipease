import React, { useState } from 'react';
import { Play, Trash2, Mail, MailOpen, Search } from 'lucide-react';

interface Voicemail {
  id: string;
  fromNumber: string;
  timestamp: string;
  duration: number;
  isRead: boolean;
}

const dummyVoicemails: Voicemail[] = [
  {
    id: '1',
    fromNumber: '+1 (234) 567-8901',
    timestamp: '2024-03-15T14:30:00',
    duration: 45,
    isRead: false
  },
  {
    id: '2',
    fromNumber: '+1 (345) 678-9012',
    timestamp: '2024-03-15T13:15:00',
    duration: 62,
    isRead: true
  },
  {
    id: '3',
    fromNumber: '+1 (456) 789-0123',
    timestamp: '2024-03-15T11:45:00',
    duration: 33,
    isRead: false
  }
];

export default function UserVoicemails() {
  const [voicemails, setVoicemails] = useState<Voicemail[]>(dummyVoicemails);
  const [searchTerm, setSearchTerm] = useState('');

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handlePlay = (voicemailId: string) => {
    setVoicemails(voicemails.map(vm => 
      vm.id === voicemailId ? { ...vm, isRead: true } : vm
    ));
    // Add audio playback logic here
  };

  const handleDelete = (voicemailId: string) => {
    setVoicemails(voicemails.filter(vm => vm.id !== voicemailId));
  };

  const filteredVoicemails = voicemails.filter(voicemail =>
    voicemail.fromNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Voicemails</h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search voicemails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredVoicemails.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No voicemails found
          </div>
        ) : (
          filteredVoicemails.map((voicemail) => (
            <div key={voicemail.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {voicemail.isRead ? (
                    <MailOpen className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Mail className="h-5 w-5 text-blue-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{voicemail.fromNumber}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(voicemail.timestamp)} • {formatDuration(voicemail.duration)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePlay(voicemail.id)}
                    className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50"
                    title="Play voicemail"
                  >
                    <Play className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(voicemail.id)}
                    className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50"
                    title="Delete voicemail"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {!voicemail.isRead && (
                <div className="mt-2 text-sm text-blue-600">
                  New message
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}