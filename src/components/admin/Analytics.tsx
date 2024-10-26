import React from 'react';
import { Calendar, TrendingUp, Clock, Globe, Phone, Users } from 'lucide-react';
import StatCard from '../dashboard/StatCard';
import CallsChart from './CallsChart';
import CallQualityChart from './CallQualityChart';
import GeoDistributionMap from './GeoDistributionMap';
import TopMetricsChart from './TopMetricsChart';
import { useAnalytics } from '../../hooks/useAnalytics';
import LoadingSpinner from '../LoadingSpinner';

export default function Analytics() {
  const { data, dateRange, updateDateRange, isLoading, error } = useAnalytics();

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-8 text-red-600">
        Error loading analytics data: {error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Calculate trends based on date range
  const getTrendText = (value: number, range: string) => {
    const periods: Record<string, string> = {
      '24h': 'yesterday',
      '7d': 'last week',
      '30d': 'last month',
      '90d': 'last quarter'
    };
    return `↑ ${value}% from ${periods[range]}`;
  };

  const stats = [
    {
      title: 'Total Call Duration',
      value: `${data.totalCallDuration} min`,
      subText: getTrendText(8, dateRange),
      icon: Clock
    },
    {
      title: 'Avg Call Quality',
      value: `${data.avgCallQuality}/5.0`,
      subText: getTrendText(4, dateRange),
      icon: TrendingUp
    },
    {
      title: 'Active Users',
      value: data.activeUsers.toString(),
      subText: getTrendText(12, dateRange),
      icon: Users
    },
    {
      title: 'International Calls',
      value: `${data.internationalPercentage}%`,
      subText: getTrendText(5, dateRange),
      icon: Globe
    }
  ];

  return (
    <div className="space-y-6 p-8">
      {/* Date Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <select
            value={dateRange}
            onChange={(e) => updateDateRange(e.target.value as any)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Call Volume & Duration</h3>
          <CallsChart data={data.callVolume} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Call Quality Metrics</h3>
          <CallQualityChart data={data.qualityMetrics} />
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
          <GeoDistributionMap data={data.geoDistribution} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Top Performance Metrics</h3>
          <TopMetricsChart data={data.topMetrics} />
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Peak Hours</h3>
          <div className="space-y-4">
            {data.peakHours.map((peak) => (
              <div key={peak.time} className="flex justify-between items-center">
                <span className="text-gray-600">{peak.time}</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-blue-600 rounded-full h-2" 
                      style={{ width: `${peak.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{peak.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Call Types</h3>
          <div className="space-y-4">
            {data.callTypes.map((type) => (
              <div key={type.type} className="flex justify-between items-center">
                <span className="text-gray-600">{type.type}</span>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${
                    type.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {type.count.toLocaleString()}
                    {type.trend === 'up' ? ' ↑' : ' ↓'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Quality Metrics</h3>
          <div className="space-y-4">
            {data.qualityStats.map((metric) => (
              <div key={metric.metric} className="flex justify-between items-center">
                <span className="text-gray-600">{metric.metric}</span>
                <span className={`font-medium ${
                  metric.status === 'good' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}