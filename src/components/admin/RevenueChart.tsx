import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', minutes: 4200, subscriptions: 3800, total: 8000 },
  { month: 'Feb', minutes: 4800, subscriptions: 3900, total: 8700 },
  { month: 'Mar', minutes: 5200, subscriptions: 4100, total: 9300 },
  { month: 'Apr', minutes: 4900, subscriptions: 4000, total: 8900 },
  { month: 'May', minutes: 5500, subscriptions: 4200, total: 9700 },
  { month: 'Jun', minutes: 6000, subscriptions: 4300, total: 10300 },
];

export default function RevenueChart() {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value) => `$${value}`}
            labelStyle={{ color: '#374151' }}
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '0.5rem',
              padding: '0.5rem'
            }}
          />
          <Legend />
          <Bar 
            dataKey="minutes" 
            name="Minutes Revenue" 
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="subscriptions" 
            name="Subscriptions" 
            fill="#10B981"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}