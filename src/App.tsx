import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import Dashboard from './pages/Dashboard';
import CallsPage from './pages/CallsPage';
import VoicemailPage from './pages/VoicemailPage';
import ForwardedCallsPage from './pages/ForwardedCallsPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import AnalyticsPage from './pages/AnalyticsPage';
import BillingPage from './pages/BillingPage';
import HelpPage from './pages/HelpPage';
import QuickStartGuide from './pages/help/QuickStartGuide';
import CallManagement from './pages/help/CallManagement';
import BillingGuide from './pages/help/BillingGuide';
import Troubleshooting from './pages/help/Troubleshooting';
import AboutPage from './pages/company/AboutPage';
import CareersPage from './pages/company/CareersPage';
import BlogPage from './pages/company/BlogPage';
import FeaturesPage from './pages/product/FeaturesPage';
import SecurityPage from './pages/product/SecurityPage';
import EnterprisePage from './pages/product/EnterprisePage';
import GuidesPage from './pages/resources/GuidesPage';
import useAuthStore from './store/useAuthStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
        <Route path="/guides" element={<GuidesPage />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard/*" 
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="calls" element={<CallsPage />} />
          <Route path="voicemail" element={<VoicemailPage />} />
          <Route path="forwarded" element={<ForwardedCallsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="help/quick-start" element={<QuickStartGuide />} />
          <Route path="help/call-management" element={<CallManagement />} />
          <Route path="help/billing-guide" element={<BillingGuide />} />
          <Route path="help/troubleshooting" element={<Troubleshooting />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;