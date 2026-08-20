import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { WorkPassportCard } from '../../components/features/WorkPassportCard';
import { MOCK_OPPORTUNITIES } from '../../data/mockData';

export const WorkerDashboard = ({ onNavigate }) => {
  const { user } = useAuth();

  const workerUser = {
    id: user?.id || 'usr-wrk-1',
    name: user?.name || 'Sunita Sharma',
    profession: user?.profession || 'Master Tailor & Garment Designer',
    city: user?.city || 'Rajpura',
    state: user?.state || 'Punjab',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner & Capacity Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white">Welcome back, {workerUser.name} 👋</h1>
            <Badge variant="success">Worker & Artisan</Badge>
          </div>
          <p className="text-xs text-slate-300">
            {workerUser.profession} • {workerUser.city}, {workerUser.state}
          </p>
        </div>

        <Button
          size="lg"
          variant="secondary"
          icon="zap"
          onClick={() => onNavigate('/worker/capacity')}
          className="shadow-xl shadow-emerald-600/40"
        >
          Manage Daily Capacity (30 pcs/day)
        </Button>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Daily Capacity" value="30 pcs/day" subtext="25 pcs available today" icon="zap" variant="emerald" />
        <StatCard title="Work Passport Rating" value="4.9 / 5" subtext="Top Rated Artisan" icon="star" variant="amber" />
        <StatCard title="Jobs Completed" value="147" subtext="96% on-time delivery rate" icon="check-circle" variant="sky" />
        <StatCard title="Active Assignments" value="1" subtext="20 pcs output completed" icon="briefcase" variant="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* WORK OPPORTUNITIES FEED (REVERSE MATCHING) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-white">Work Opportunities For You</h2>
              <p className="text-xs text-slate-400">Businesses matching your skills & available daily capacity</p>
            </div>
            <Button size="sm" variant="ghost" icon="search" onClick={() => onNavigate('/worker/work')}>
              Explore All
            </Button>
          </div>

          <div className="space-y-4">
            {MOCK_OPPORTUNITIES.map((opp) => (
              <Card key={opp.id} borderVariant="emerald" className="p-5 space-y-4 hover:border-emerald-500/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-white">{opp.title}</h3>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                        {opp.matchScore}% AI Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Business: <strong className="text-white">{opp.businessName}</strong> • Location: <strong className="text-slate-300">{opp.city} ({opp.distanceKm} km away)</strong>
                    </p>
                  </div>

                  <span className="text-sm font-black text-emerald-400">{opp.budgetPerUnit}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Skill Needed</span>
                    <p className="font-bold text-indigo-300 mt-0.5">{opp.skillRequired}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Total Quota</span>
                    <p className="font-bold text-white mt-0.5">{opp.quota}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Deadline</span>
                    <p className="font-bold text-amber-400 mt-0.5">{opp.deadlineDays} Days</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
                    <span>Matches your 25 pcs/day remaining capacity</span>
                  </div>

                  <Button
                    size="sm"
                    variant="secondary"
                    icon="arrow-right"
                    iconPosition="right"
                    onClick={() => onNavigate('/worker/projects')}
                  >
                    Accept Work Order
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* WORK PASSPORT SUMMARY COLUMN */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white">My Work Passport</h2>
            <Button size="sm" variant="ghost" onClick={() => onNavigate('/worker/profile')}>
              Full View
            </Button>
          </div>
          <WorkPassportCard workerUser={workerUser} compact />
        </div>
      </div>
    </div>
  );
};
