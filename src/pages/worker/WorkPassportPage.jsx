import React from 'react';
import { WorkPassportCard } from '../../components/features/WorkPassportCard';

export const WorkPassportPage = ({ onNavigate }) => {
  const workerUser = {
    id: 'usr-wrk-1',
    name: 'Sunita Sharma',
    profession: 'Master Tailor & Designer',
    city: 'Rajpura',
    state: 'Punjab',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <h1 className="text-2xl font-black text-white">Public Work Passport Profile</h1>
      <WorkPassportCard workerUser={workerUser} compact={false} />
    </div>
  );
};
