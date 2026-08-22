import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { WorkPassportCard } from '../../components/features/WorkPassportCard';

export const WorkPassportPage = ({ onNavigate }) => {
  const { user } = useAuth();

  const workerUser = {
    id: user?.id || 'usr-wrk-1',
    name: user?.name || 'Sunita Sharma',
    profession: user?.profession || 'Master Tailor & Designer',
    city: user?.city || 'Rajpura',
    state: user?.state || 'Punjab',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    hasDisability: user?.hasDisability || false,
    disabilityType: user?.disabilityType || '',
    disabilityAccommodations: user?.disabilityAccommodations || []
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto text-slate-900">
      <h1 className="text-2xl font-black text-slate-900">Public Work Passport Profile</h1>
      <WorkPassportCard workerUser={workerUser} compact={false} />
    </div>
  );
};

