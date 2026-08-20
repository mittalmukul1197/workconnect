import React from 'react';
import { Card } from '../../components/common/Card';

export const WorkerProfilePage = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl text-slate-900">
      <h1 className="text-2xl font-black text-slate-900">Worker Account Settings</h1>
      <Card borderVariant="emerald" className="p-6 text-xs text-slate-700 bg-white shadow-sm font-medium">
        Sunita Sharma • Master Tailor & Designer • Rajpura, Punjab
      </Card>
    </div>
  );
};
