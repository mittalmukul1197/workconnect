import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';

export const AdminDemoPage = ({ onNavigate }) => {
  const { loginAsDemoBusiness, loginAsDemoHousehold, loginAsDemoWorker } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto text-slate-900">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-slate-900">Demo Control Center</h1>
          <Badge variant="warning">Shortcuts & Persona Switcher</Badge>
        </div>
        <p className="text-xs text-slate-500 font-medium">1-click persona switching and demo state reset for seamless presentations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card borderVariant="indigo" className="p-6 space-y-4 bg-white shadow-sm">
          <h3 className="font-bold text-base text-slate-900">Demo Persona Switcher</h3>
          <div className="space-y-2">
            <Button variant="primary" size="md" icon="building" fullWidth onClick={() => { loginAsDemoBusiness(); onNavigate('/business/dashboard'); }}>
              Switch to Demo Business ("Crafted Threads Boutique")
            </Button>
            <Button variant="outline" size="md" icon="user" fullWidth onClick={() => { loginAsDemoHousehold(); onNavigate('/household/dashboard'); }}>
              Switch to Demo Household ("Rahul Sharma")
            </Button>
            <Button variant="secondary" size="md" icon="user" fullWidth onClick={() => { loginAsDemoWorker(); onNavigate('/worker/dashboard'); }}>
              Switch to Demo Worker ("Sunita Sharma")
            </Button>
          </div>
        </Card>

        <Card borderVariant="emerald" className="p-6 space-y-4 bg-white shadow-sm">
          <h3 className="font-bold text-base text-slate-900">Direct Demo Screen Access</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Button size="sm" variant="outline" onClick={() => onNavigate('/')}>Landing Page</Button>
            <Button size="sm" variant="outline" onClick={() => onNavigate('/role-selection')}>Role Selection</Button>
            <Button size="sm" variant="outline" onClick={() => onNavigate('/onboarding/business')}>Business Onboarding</Button>
            <Button size="sm" variant="outline" onClick={() => onNavigate('/onboarding/worker')}>Worker Onboarding</Button>
            <Button size="sm" variant="outline" onClick={() => onNavigate('/business/post-work')}>AI Work Parser</Button>
            <Button size="sm" variant="outline" onClick={() => onNavigate('/business/matches')}>AI Candidate Ranking</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
