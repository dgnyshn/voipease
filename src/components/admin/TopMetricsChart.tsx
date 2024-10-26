import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sales', current: 4500, previous: 4200 },
  { name: 'Support', current: 3800, previous: 3500 },
  { name: 'Marketing', current: 2800, previous: 2400 },
  { name: 'Operations', current: 2200, previous: 2000 },
  { name: 'Engineering', current: 1800, previous: 1500 }
];

export default function TopMetricsChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="current" name="Current Period" fill="#3B82F6" />
          <Bar dataKey="previous" name="Previous Period" fill="#93C5FD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}