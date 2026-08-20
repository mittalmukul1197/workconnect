import React from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const BusinessProfile = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl text-slate-900">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900">Company Profile</h1>
        <Badge variant="primary">Verified Business</Badge>
      </div>

      <Card borderVariant="indigo" className="p-6 space-y-3 text-xs bg-white shadow-sm font-medium">
        <h3 className="text-lg font-bold text-slate-900">Crafted Threads Boutique</h3>
        <p className="text-slate-600">Industry: <strong className="text-slate-900">Tailoring & Apparel</strong></p>
        <p className="text-slate-600">Location: <strong className="text-slate-900">Rajpura, Punjab</strong></p>
        <p className="text-slate-600">Contact: <strong className="text-indigo-700">+91 98765 43210</strong></p>
      </Card>
    </div>
  );
};
