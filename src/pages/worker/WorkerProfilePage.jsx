import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';

export const WorkerProfilePage = ({ onNavigate }) => {
  const { user } = useAuth();

  const worker = {
    name: user?.name || 'Sunita Sharma',
    email: user?.email || 'sunita@demo.com',
    phone: user?.phone || '+91 98765 11111',
    profession: user?.profession || 'Master Tailor & Designer',
    city: user?.city || 'Rajpura',
    address: user?.address || 'House #42, Model Town, Rajpura',
    experienceYears: user?.experienceYears || 6,
    dailyCapacity: user?.dailyCapacity || '30 pieces/day',
    expectedRate: user?.expectedRate || '₹700/day',
    hasDisability: user?.hasDisability || false,
    disabilityType: user?.disabilityType || '',
    disabilityAccommodations: user?.disabilityAccommodations || [],
    idVerified: user?.idVerified || 'Verified (Aadhaar KYC Completed)'
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Worker Account & Profile Settings</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Manage your artisan credentials, capacity & accessibility settings</p>
        </div>
        <Badge variant="success">Active Worker</Badge>
      </div>

      <Card borderVariant="emerald" className="p-6 space-y-6 bg-white shadow-sm">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xl shadow-xs">
              {worker.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">{worker.name}</h2>
              <p className="text-xs font-bold text-emerald-700">{worker.profession}</p>
              <p className="text-xs text-slate-500">{worker.address}</p>
            </div>
          </div>
          <Badge variant="indigo" className="text-[10px]">{worker.idVerified}</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Contact Phone</span>
            <p className="font-bold text-slate-800">{worker.phone}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Email Address</span>
            <p className="font-bold text-slate-800">{worker.email}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Daily Capacity</span>
            <p className="font-bold text-emerald-700">{worker.dailyCapacity}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Expected Rate</span>
            <p className="font-bold text-emerald-700">{worker.expectedRate}</p>
          </div>
        </div>

        {/* DISABILITY STATUS DISPLAY */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase text-slate-700 tracking-wider">Disability & Workplace Accessibility</h3>
            {worker.hasDisability ? (
              <Badge variant="purple" className="text-[10px]">♿ Person with Disability (PwD)</Badge>
            ) : (
              <Badge variant="success" className="text-[10px]">Standard / Abled</Badge>
            )}
          </div>

          {worker.hasDisability ? (
            <div className="space-y-2 pt-1 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <Icon name="check-circle" className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-purple-950">Category: {worker.disabilityType}</span>
              </div>
              {worker.disabilityAccommodations?.length > 0 && (
                <div className="text-xs text-slate-600 space-y-1">
                  <span className="font-bold block text-slate-700">Requested Workplace Accommodations:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {worker.disabilityAccommodations.map((acc, idx) => (
                      <span key={idx} className="px-2 py-1 rounded-lg bg-purple-100/70 text-purple-900 text-[11px] font-medium border border-purple-200">
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-500">No special physical accessibility or disability accommodations indicated.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

