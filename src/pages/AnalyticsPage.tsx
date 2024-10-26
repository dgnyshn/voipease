import React from 'react';
import Analytics from '../components/admin/Analytics';
import useAuthStore from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';
import PlanRestrictedFeature from '../components/PlanRestrictedFeature';

export default function AnalyticsPage() {
  const { user } = useAuthStore();

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard/overview" />;
  }

  return (
    <PlanRestrictedFeature feature="analytics">
      <Analytics />
    </PlanRestrictedFeature>
  );
}