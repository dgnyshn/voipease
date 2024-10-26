import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: '03/10', local: 245, international: 35, total: 280 },
  { date: '03/11', local: 288, international: 42, total: 330 },
  { date: '03/12', local: 256, international: 38, total: 294 },
  { date: '03/13', local: 302, international: 45, total: 347 },
  { date: '03/14', local: 278, international: 40, total: 318 },
  { date: '03/15', local: 265, international: 36, total: 301 },
  { date: '03/16', local: 298, international: 44, total: 342 },
];

export default function CallsChart() {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorLocal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorInternational" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="local" 
            name="Local Calls" 
            stroke="#3B82F6" 
            fillOpacity={1}
            fill="url(#colorLocal)"
          />
          <Area 
            type="monotone" 
            dataKey="international" 
            name="International" 
            stroke="#10B981" 
            fillOpacity={1}
            fill="url(#colorInternational)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}