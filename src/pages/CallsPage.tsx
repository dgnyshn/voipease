import React from 'react';
import UserCalls from '../components/user/UserCalls';

const dummyCalls = [
  {
    id: 1,
    number: '+1 234 567 8900',
    name: 'Alice Johnson',
    type: 'incoming',
    duration: '5:23',
    date: '2024-03-15',
    time: '14:30',
    cost: 0.25
  },
  {
    id: 2,
    number: '+1 234 567 8901',
    name: 'Bob Smith',
    type: 'outgoing',
    duration: '3:45',
    date: '2024-03-15',
    time: '13:15',
    cost: 0.15
  },
  {
    id: 3,
    number: '+1 234 567 8902',
    name: 'Carol White',
    type: 'missed',
    duration: '-',
    date: '2024-03-15',
    time: '11:45',
    cost: 0
  },
  {
    id: 4,
    number: '+1 234 567 8903',
    name: 'David Brown',
    type: 'incoming',
    duration: '8:12',
    date: '2024-03-15',
    time: '10:20',
    cost: 0.40
  },
  {
    id: 5,
    number: '+1 234 567 8904',
    name: 'Eve Wilson',
    type: 'outgoing',
    duration: '2:56',
    date: '2024-03-15',
    time: '09:15',
    cost: 0.12
  }
];

function CallsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Call History</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <UserCalls calls={dummyCalls} />
      </div>
    </div>
  );
}

export default CallsPage;