import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { WorkPassportCard } from '../../components/features/WorkPassportCard';

export const PublicPassportView = ({ workerId, onNavigate }) => {
  const workerUser = {
    id: workerId || 'usr-wrk-1',
    name: 'Sunita Sharma',
    profession: 'Master Tailor & Garment Designer',
    city: 'Rajpura',
    state: 'Punjab',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />
      <main className="max-w-3xl mx-auto px-4 py-12 flex-1 w-full space-y-6">
        <WorkPassportCard workerUser={workerUser} compact={false} />
      </main>
      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200">
        WorkConnect Portable Work Passport Verification Engine
      </footer>
    </div>
  );
};
