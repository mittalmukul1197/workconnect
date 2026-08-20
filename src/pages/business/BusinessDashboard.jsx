import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { MOCK_WORKERS, MOCK_PROJECTS } from '../../data/mockData';

export const BusinessDashboard = ({ onNavigate }) => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner & "+ Post New Work" CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white">Welcome back, {user?.name || 'Ananya Verma'} 👋</h1>
            <Badge variant="primary">Business Owner</Badge>
          </div>
          <p className="text-xs text-slate-300">
            {user?.industry || 'Crafted Threads Boutique'} • {user?.city || 'Rajpura'}, Punjab
          </p>
        </div>

        <Button
          size="lg"
          variant="primary"
          icon="plus"
          onClick={() => onNavigate('/business/post-work')}
          className="shadow-xl shadow-indigo-600/40"
        >
          + Post New Work
        </Button>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Work Orders" value="3" subtext="In active production" icon="briefcase" variant="primary" />
        <StatCard title="Workers Connected" value="12" subtext="Across active teams" icon="users" variant="emerald" />
        <StatCard title="Completed Projects" value="28" subtext="On-time delivery rate 96%" icon="check-circle" variant="sky" />
        <StatCard title="Trusted Professionals" value="8" subtext="In your saved talent pool" icon="shield" variant="amber" />
      </div>

      {/* ACTIVE WORK ORDERS & SELF-HEALING STATUS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white">Active Workforce Projects</h2>
            <p className="text-xs text-slate-400">Live output tracking & capacity allocation</p>
          </div>
          <Button size="sm" variant="ghost" icon="arrow-right" iconPosition="right" onClick={() => onNavigate('/business/projects')}>
            View All Projects
          </Button>
        </div>

        <div className="space-y-4">
          {MOCK_PROJECTS.map((proj) => (
            <Card key={proj.id} borderVariant="indigo" className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white">{proj.title}</h3>
                    <Badge variant="primary">{proj.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Deadline: <strong className="text-amber-400">{proj.deadlineDate}</strong> • Required Skill: <strong className="text-indigo-300">{proj.skillName}</strong>
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  icon="sync"
                  onClick={() => onNavigate(`/business/project/${proj.id}`)}
                >
                  Project Live Tracker & Simulator
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Production Progress: {proj.completedQuantity} / {proj.totalQuantity} {proj.unitLabel}</span>
                  <span className="text-indigo-400">{Math.round((proj.completedQuantity / proj.totalQuantity) * 100)}% Completed</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-emerald-400"
                    style={{ width: `${(proj.completedQuantity / proj.totalQuantity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Team Members */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 font-semibold">Assigned Team:</span>
                <div className="flex items-center gap-2">
                  {proj.assignedWorkers.map((w, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {w.workerName} ({w.completedQuantity}/{w.allocatedQuantity})
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* RECOMMENDED NEARBY PROFESSIONALS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white">Recommended Nearby Professionals</h2>
            <p className="text-xs text-slate-400">Available workers scored by 7-Dimension AI matching</p>
          </div>
          <Button size="sm" variant="ghost" icon="search" onClick={() => onNavigate('/business/workers')}>
            Explore Directory
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_WORKERS.map((worker) => (
            <Card key={worker.id} hover className="p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <img src={worker.avatar} alt={worker.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                  <Badge variant="success">✓ Available Today</Badge>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-white">{worker.name}</h3>
                  <p className="text-xs text-indigo-300 font-medium">{worker.profession}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{worker.city}, Punjab • {worker.rate}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {worker.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 text-[10px] font-semibold border border-slate-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                icon="shield-check"
                fullWidth
                onClick={() => onNavigate(`/workers/${worker.id}`)}
              >
                View Work Passport
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
