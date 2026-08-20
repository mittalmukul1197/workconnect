import React from 'react';
import { Card } from '../../components/common/Card';

export const WorkerProjectsPage = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-black text-white">Assigned Worker Projects</h1>
      <Card borderVariant="emerald" className="p-6 space-y-3">
        <h3 className="text-base font-bold text-white">100 Ethnic Kurtis Stitching Order</h3>
        <p className="text-xs text-slate-300">Allocated Quota: 35 pieces • Output Completed: 20 pieces</p>
      </Card>
    </div>
  );
};
