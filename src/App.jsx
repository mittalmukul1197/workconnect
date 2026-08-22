import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ChatProvider } from './context/ChatContext';
import { EscrowProvider } from './context/EscrowContext';
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { RoleSelectionPage } from './pages/public/RoleSelectionPage';
import { BusinessOnboardingPage } from './pages/public/BusinessOnboardingPage';
import { WorkerOnboardingPage } from './pages/public/WorkerOnboardingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Household Pages
import { HouseholdDashboard } from './pages/household/HouseholdDashboard';
import { HouseholdBookingsPage } from './pages/household/HouseholdBookingsPage';
import { HouseholdProfilePage } from './pages/household/HouseholdProfilePage';
import { HouseholdEscrowPage } from './pages/household/HouseholdEscrowPage';

// Business Pages
import { BusinessDashboard } from './pages/business/BusinessDashboard';
import { PostWorkPage } from './pages/business/PostWorkPage';
import { MatchingPage } from './pages/business/MatchingPage';
import { WorkerDirectory } from './pages/business/WorkerDirectory';
import { BusinessProjects } from './pages/business/BusinessProjects';
import { ProjectDetailPage } from './pages/business/ProjectDetailPage';
import { BusinessHistory } from './pages/business/BusinessHistory';
import { BusinessProfile } from './pages/business/BusinessProfile';

// Worker Pages
import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { WorkerCapacityPage } from './pages/worker/WorkerCapacityPage';
import { FindWorkPage } from './pages/worker/FindWorkPage';
import { WorkerProjectsPage } from './pages/worker/WorkerProjectsPage';
import { WorkPassportPage } from './pages/worker/WorkPassportPage';
import { WorkerProfilePage } from './pages/worker/WorkerProfilePage';

// Shared & Admin Pages
import { PublicPassportView } from './pages/shared/PublicPassportView';
import { MessagesPage } from './pages/shared/MessagesPage';
import { AdminDemoPage } from './pages/admin/AdminDemoPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    // Phase 1 Public Routes
    if (currentPath === '/') return <LandingPage onNavigate={navigate} />;
    if (currentPath === '/role-selection') return <RoleSelectionPage onNavigate={navigate} />;
    if (currentPath === '/onboarding/business') return <BusinessOnboardingPage onNavigate={navigate} />;
    if (currentPath === '/onboarding/worker') return <WorkerOnboardingPage onNavigate={navigate} />;
    if (currentPath === '/login') return <LoginPage onNavigate={navigate} />;
    if (currentPath === '/register') return <RegisterPage onNavigate={navigate} />;
    if (currentPath.startsWith('/workers/')) {
      const wId = currentPath.replace('/workers/', '') || 'usr-wrk-1';
      return <PublicPassportView workerId={wId} onNavigate={navigate} />;
    }

    // App Layout Views
    let pageElement = <BusinessDashboard onNavigate={navigate} />;

    // Shared Messaging Route
    if (currentPath === '/messages') pageElement = <MessagesPage onNavigate={navigate} />;

    // Household Navigation Routes
    else if (currentPath === '/household/dashboard') pageElement = <HouseholdDashboard onNavigate={navigate} />;
    else if (currentPath === '/household/bookings') pageElement = <HouseholdBookingsPage onNavigate={navigate} />;
    else if (currentPath === '/household/profile') pageElement = <HouseholdProfilePage onNavigate={navigate} />;
    else if (currentPath.startsWith('/household/escrow')) {
      const dealId = currentPath.replace('/household/escrow/', '').replace('/household/escrow', '') || 'bk-101';
      pageElement = <HouseholdEscrowPage dealId={dealId} onNavigate={navigate} />;
    }

    // Business Navigation Routes
    else if (currentPath === '/business/dashboard') pageElement = <BusinessDashboard onNavigate={navigate} />;
    else if (currentPath === '/business/post-work') pageElement = <PostWorkPage onNavigate={navigate} />;
    else if (currentPath === '/business/matches') pageElement = <MatchingPage onNavigate={navigate} />;
    else if (currentPath === '/business/workers') pageElement = <WorkerDirectory onNavigate={navigate} />;
    else if (currentPath === '/business/projects') pageElement = <BusinessProjects onNavigate={navigate} />;
    else if (currentPath.startsWith('/business/project/')) {
      const pId = currentPath.replace('/business/project/', '') || 'proj-501';
      pageElement = <ProjectDetailPage projectId={pId} onNavigate={navigate} />;
    } else if (currentPath === '/business/history') pageElement = <BusinessHistory onNavigate={navigate} />;
    else if (currentPath === '/business/profile') pageElement = <BusinessProfile onNavigate={navigate} />;

    // Worker Navigation Routes
    else if (currentPath === '/worker/dashboard') pageElement = <WorkerDashboard onNavigate={navigate} />;
    else if (currentPath === '/worker/capacity') pageElement = <WorkerCapacityPage onNavigate={navigate} />;
    else if (currentPath === '/worker/work' || currentPath === '/worker/matches') pageElement = <FindWorkPage onNavigate={navigate} />;
    else if (currentPath === '/worker/projects' || currentPath === '/worker/history') pageElement = <WorkerProjectsPage onNavigate={navigate} />;
    else if (currentPath === '/worker/profile') pageElement = <WorkPassportPage onNavigate={navigate} />;
    else if (currentPath === '/worker/settings') pageElement = <WorkerProfilePage onNavigate={navigate} />;

    // Admin Demo Route
    else if (currentPath === '/admin/demo') pageElement = <AdminDemoPage onNavigate={navigate} />;

    return (
      <AppLayout currentPath={currentPath} onNavigate={navigate}>
        {pageElement}
      </AppLayout>
    );
  };

  return (
    <AuthProvider>
      <NotificationProvider>
        <ChatProvider>
          <EscrowProvider>
            {renderContent()}
          </EscrowProvider>
        </ChatProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
