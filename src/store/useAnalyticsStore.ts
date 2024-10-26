import { create } from 'zustand';

export type DateRange = '24h' | '7d' | '30d' | '90d';

interface CallMetrics {
  local: number;
  international: number;
  total: number;
}

interface QualityMetrics {
  quality: number;
  latency: number;
  dropRate: number;
}

interface PeakHour {
  time: string;
  percentage: number;
}

interface CallType {
  type: string;
  count: number;
  trend: 'up' | 'down';
}

interface QualityMetric {
  metric: string;
  value: string;
  status: 'good' | 'warning';
}

interface AnalyticsData {
  totalCallDuration: number;
  avgCallQuality: number;
  activeUsers: number;
  internationalPercentage: number;
  callVolume: { date: string } & CallMetrics[];
  qualityMetrics: { date: string } & QualityMetrics[];
  geoDistribution: { country: string; calls: number }[];
  topMetrics: { name: string; current: number; previous: number }[];
  peakHours: PeakHour[];
  callTypes: CallType[];
  qualityStats: QualityMetric[];
}

interface AnalyticsState {
  data: AnalyticsData | null;
  dateRange: DateRange;
  isLoading: boolean;
  error: string | null;
  fetchAnalytics: (range: DateRange) => Promise<void>;
}

// Mock data generator
const generateMockData = (range: DateRange): AnalyticsData => {
  const dates = {
    '24h': 24,
    '7d': 7,
    '30d': 30,
    '90d': 90
  };

  const numPoints = dates[range];

  return {
    totalCallDuration: 12450,
    avgCallQuality: 4.8,
    activeUsers: 892,
    internationalPercentage: 32,

    callVolume: Array.from({ length: numPoints }, (_, i) => ({
      date: new Date(Date.now() - (numPoints - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      local: Math.floor(Math.random() * 200) + 200,
      international: Math.floor(Math.random() * 50) + 30,
      total: Math.floor(Math.random() * 250) + 230
    })),

    qualityMetrics: Array.from({ length: numPoints }, (_, i) => ({
      date: new Date(Date.now() - (numPoints - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      quality: Math.random() * 0.5 + 4.5,
      latency: Math.floor(Math.random() * 20) + 70,
      dropRate: Math.random() * 0.8
    })),

    geoDistribution: [
      { country: 'United States', calls: 4500 },
      { country: 'Canada', calls: 1200 },
      { country: 'United Kingdom', calls: 800 },
      { country: 'Australia', calls: 600 },
      { country: 'Germany', calls: 450 }
    ],

    topMetrics: [
      { name: 'Sales', current: 4500, previous: 4200 },
      { name: 'Support', current: 3800, previous: 3500 },
      { name: 'Marketing', current: 2800, previous: 2400 },
      { name: 'Operations', current: 2200, previous: 2000 }
    ],

    peakHours: [
      { time: '2:00 PM - 4:00 PM', percentage: 78 },
      { time: '10:00 AM - 12:00 PM', percentage: 65 },
      { time: '4:00 PM - 6:00 PM', percentage: 52 }
    ],

    callTypes: [
      { type: 'Direct Calls', count: 4567, trend: 'up' },
      { type: 'Forwarded', count: 892, trend: 'up' },
      { type: 'Conference', count: 345, trend: 'down' },
      { type: 'Voicemail', count: 234, trend: 'up' }
    ],

    qualityStats: [
      { metric: 'Call Success Rate', value: '99.2%', status: 'good' },
      { metric: 'Avg Response Time', value: '0.8s', status: 'good' },
      { metric: 'Drop Rate', value: '0.5%', status: 'warning' },
      { metric: 'Audio Quality', value: '4.8/5.0', status: 'good' }
    ]
  };
};

const useAnalyticsStore = create<AnalyticsState>((set) => ({
  data: null,
  dateRange: '7d',
  isLoading: false,
  error: null,

  fetchAnalytics: async (range: DateRange) => {
    set({ isLoading: true, error: null, dateRange: range });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = generateMockData(range);
      set({ data: mockData });
    } catch (error) {
      set({ error: 'Failed to fetch analytics data' });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useAnalyticsStore;