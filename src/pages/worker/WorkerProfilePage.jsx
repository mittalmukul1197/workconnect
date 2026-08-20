import React from 'react';
import { Card } from '../../components/common/Card';

export const WorkerProfilePage = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-2xl font-black text-white">Worker Account Settings</h1>
      <Card borderVariant="emerald" className="p-6 text-xs text-slate-300">
        Sunita Sharma • Master Tailor & Designer • Rajpura, Punjab
      </Card>
    </div>
  );
};
