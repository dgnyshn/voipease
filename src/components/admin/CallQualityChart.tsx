import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Mon', quality: 4.8, latency: 82, dropRate: 0.4 },
  { date: 'Tue', quality: 4.7, latency: 85, dropRate: 0.5 },
  { date: 'Wed', quality: 4.9, latency: 80, dropRate: 0.3 },
  { date: 'Thu', quality: 4.8, latency: 83, dropRate: 0.4 },
  { date: 'Fri', quality: 4.7, latency: 87, dropRate: 0.6 },
  { date: 'Sat', quality: 4.9, latency: 81, dropRate: 0.3 },
  { date: 'Sun', quality: 4.8, latency: 84, dropRate: 0.4 },
];

export default function CallQualityChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="quality"
            name="Call Quality"
            stroke="#3B82F6"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="latency"
            name="Latency (ms)"
            stroke="#10B981"
            strokeWidth={2}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="dropRate"
            name="Drop Rate (%)"
            stroke="#F59E0B"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}