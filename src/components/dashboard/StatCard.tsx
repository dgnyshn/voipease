import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  warning?: boolean;
  warningText?: string;
  subText?: string;
  actionButton?: React.ReactNode;
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend,
  warning,
  warningText,
  subText,
  actionButton
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {change && (
            <p className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? '↑' : '↓'} {change} from last month
            </p>
          )}
          {warning && warningText && (
            <p className="text-sm text-red-600 mt-1">
              {warningText}
            </p>
          )}
          {subText && (
            <p className="text-sm text-gray-600 mt-1">
              {subText}
            </p>
          )}
          {actionButton && (
            <div className="mt-2">
              {actionButton}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${warning ? 'bg-red-50' : 'bg-blue-50'}`}>
          <Icon className={`h-6 w-6 ${warning ? 'text-red-600' : 'text-blue-600'}`} />
        </div>
      </div>
    </div>
  );
}