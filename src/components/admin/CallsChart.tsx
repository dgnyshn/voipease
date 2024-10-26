import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const hourlyData = [
  { time: '00:00', calls: 45, avgDuration: 180, peakLoad: 15 },
  { time: '03:00', calls: 32, avgDuration: 195, peakLoad: 12 },
  { time: '06:00', calls: 28, avgDuration: 210, peakLoad: 10 },
  { time: '09:00', calls: 120, avgDuration: 240, peakLoad: 45 },
  { time: '12:00', calls: 156, avgDuration: 225, peakLoad: 65 },
  { time: '15:00', calls: 180, avgDuration: 195, peakLoad: 85 },
  { time: '18:00', calls: 145, avgDuration: 180, peakLoad: 55 },
  { time: '21:00', calls: 98, avgDuration: 165, peakLoad: 35 }
];

const dailyData = [
  { date: 'Mon', calls: 845, avgDuration: 195, peakLoad: 45 },
  { date: 'Tue', calls: 932, avgDuration: 205, peakLoad: 52 },
  { date: 'Wed', calls: 878, avgDuration: 198, peakLoad: 48 },
  { date: 'Thu', calls: 1102, avgDuration: 215, peakLoad: 65 },
  { date: 'Fri', calls: 1250, avgDuration: 225, peakLoad: 75 },
  { date: 'Sat', calls: 765, avgDuration: 185, peakLoad: 35 },
  { date: 'Sun', calls: 650, avgDuration: 175, peakLoad: 28 }
];

export default function CallsChart() {
  const [timeframe, setTimeframe] = useState('hourly');
  const [metric, setMetric] = useState('calls');

  const data = timeframe === 'hourly' ? hourlyData : dailyData;
  
  const metricConfigs = {
    calls: {
      name: 'Total Calls',
      color: '#3B82F6',
      formatter: (value: number) => `${value} calls`
    },
    avgDuration: {
      name: 'Avg Duration',
      color: '#10B981',
      formatter: (value: number) => `${Math.round(value / 60)}m ${value % 60}s`
    },
    peakLoad: {
      name: 'Peak Load',
      color: '#F59E0B',
      formatter: (value: number) => `${value}%`
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
          >
            <option value="hourly">Today (Hourly)</option>
            <option value="daily">This Week (Daily)</option>
          </select>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
          >
            <option value="calls">Call Volume</option>
            <option value="avgDuration">Average Duration</option>
            <option value="peakLoad">Peak Load</option>
          </select>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={metricConfigs[metric].color} stopOpacity={0.1}/>
                <stop offset="95%" stopColor={metricConfigs[metric].color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={timeframe === 'hourly' ? 'time' : 'date'} />
            <YAxis />
            <Tooltip formatter={(value) => metricConfigs[metric].formatter(value)} />
            <Area
              type="monotone"
              dataKey={metric}
              name={metricConfigs[metric].name}
              stroke={metricConfigs[metric].color}
              fillOpacity={1}
              fill="url(#colorMetric)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}