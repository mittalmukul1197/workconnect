import React from 'react';
import { Card } from '../../components/common/Card';

export const WorkerProjectsPage = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      <h1 className="text-2xl font-black text-slate-900">Assigned Worker Projects</h1>
      <Card borderVariant="emerald" className="p-6 space-y-3 bg-white shadow-sm">
        <h3 className="text-base font-bold text-slate-900">100 Ethnic Kurtis Stitching Order</h3>
        <p className="text-xs text-slate-600 font-medium">Allocated Quota: <strong className="text-slate-900">35 pieces</strong> • Output Completed: <strong className="text-emerald-700">20 pieces</strong></p>
      </Card>
    </div>
  );
};
