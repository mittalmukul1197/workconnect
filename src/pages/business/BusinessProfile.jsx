import React from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const BusinessProfile = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white">Company Profile</h1>
        <Badge variant="primary">Verified Business</Badge>
      </div>

      <Card borderVariant="indigo" className="p-6 space-y-3 text-xs">
        <h3 className="text-lg font-bold text-white">Crafted Threads Boutique</h3>
        <p className="text-slate-400">Industry: Tailoring & Apparel</p>
        <p className="text-slate-400">Location: Rajpura, Punjab</p>
        <p className="text-slate-400">Contact: +91 98765 43210</p>
      </Card>
    </div>
  );
};
