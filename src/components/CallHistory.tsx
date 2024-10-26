import React from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react';
import useCallStore from '../store/useCallStore';

interface CallHistoryProps {
  limit?: number;
}

export default function CallHistory({ limit }: CallHistoryProps) {
  const { callHistory } = useCallStore();
  const displayCalls = limit ? callHistory.slice(0, limit) : callHistory;

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  };

  const getCallIcon = (type: 'outgoing' | 'incoming' | 'missed') => {
    switch (type) {
      case 'outgoing':
        return <PhoneOutgoing className="h-5 w-5 text-green-600" />;
      case 'incoming':
        return <PhoneIncoming className="h-5 w-5 text-blue-600" />;
      case 'missed':
        return <PhoneMissed className="h-5 w-5 text-red-600" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {displayCalls.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No calls yet
        </div>
      ) : (
        displayCalls.map((call) => (
          <div
            key={call.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              {getCallIcon(call.type)}
              <div>
                <div className="font-medium">{call.number}</div>
                <div className="text-sm text-gray-500">
                  {formatDate(call.timestamp)}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {formatDuration(call.duration)}
            </div>
          </div>
        ))
      )}

      {limit && callHistory.length > limit && (
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all calls →
          </button>
        </div>
      )}
    </div>
  );
}