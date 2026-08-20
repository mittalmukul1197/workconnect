import React from 'react';
import { Card } from '../../components/common/Card';

export const BusinessHistory = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      <h1 className="text-2xl font-black text-slate-900">Work Order History</h1>
      <Card className="p-6 text-xs text-slate-600 bg-white shadow-sm font-medium">
        28 projects completed successfully with a 96% on-time delivery score across Rajpura & Patiala clusters.
      </Card>
    </div>
  );
};
