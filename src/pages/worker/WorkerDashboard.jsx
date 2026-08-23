import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { WorkPassportCard } from '../../components/features/WorkPassportCard';
import { MOCK_OPPORTUNITIES } from '../../data/mockData';
import { useAutoTranslate } from '../../hooks/useAutoTranslate';

export const WorkerDashboard = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const dynamicTexts = [
    '25 pcs available today',
    '147 tasks completed',
    'High rating from boutiques',
    'Frequent local employers',
    'Matched with your capacity & location',
    ...MOCK_OPPORTUNITIES.map((o) => o.title)
  ];
  const dynamicTrans = useAutoTranslate(dynamicTexts, i18n.language);

  const workerUser = {
    id: user?.id || 'usr-wrk-1',
    name: user?.name || 'Sunita Sharma',
    profession: user?.profession || 'Master Tailor & Garment Designer',
    city: user?.city || 'Rajpura',
    state: user?.state || 'Punjab',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-900">
      {/* Header Banner & Capacity Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-indigo-50 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">{t('worker.welcome')}, {workerUser.name} 👋</h1>
            <Badge variant="success">{t('worker.workerArtisan')}</Badge>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {workerUser.profession} • {workerUser.city}, {workerUser.state}
          </p>
        </div>

        <Button
          size="lg"
          variant="secondary"
          icon="zap"
          onClick={() => onNavigate('/worker/capacity')}
          className="shadow-md shadow-emerald-600/20"
        >
          {t('worker.dailyCapacity')}
        </Button>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('worker.dailyCapacity')} value="30 pcs/day" subtext={dynamicTrans['25 pcs available today'] || '25 pcs available today'} icon="zap" variant="emerald" />
        <StatCard title={t('worker.onTimeRate')} value="96%" subtext={dynamicTrans['147 tasks completed'] || '147 tasks completed'} icon="check-circle" variant="primary" />
        <StatCard title={t('worker.qualityScore')} value="94 / 100" subtext={dynamicTrans['High rating from boutiques'] || 'High rating from boutiques'} icon="star" variant="amber" />
        <StatCard title={t('worker.repeatClients')} value="8" subtext={dynamicTrans['Frequent local employers'] || 'Frequent local employers'} icon="users" variant="sky" />
      </div>

      {/* WORK PASSPORT SUMMARY & OPPORTUNITY FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">{t('worker.opportunitiesTitle')}</h2>
              <p className="text-xs text-slate-500 font-medium">{dynamicTrans['Matched with your capacity & location'] || 'Matched with your capacity & location'}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => onNavigate('/worker/work')}>
              {t('common.viewAll')}
            </Button>
          </div>

          <div className="space-y-4">
            {MOCK_OPPORTUNITIES.map((opp) => {
              const displayTitle = dynamicTrans[opp.title] || opp.title;

              return (
                <Card key={opp.id} borderVariant="emerald" className="p-5 space-y-4 bg-white shadow-sm hover:shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900">{displayTitle}</h3>
                        <Badge variant="indigo">{opp.matchScore || 95}% Match</Badge>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Posted by {opp.businessName || opp.clientName || 'Crafted Threads'} • {opp.distanceKm ? `${opp.distanceKm} km` : '3 km'}</p>
                    </div>
                    <span className="text-sm font-black text-emerald-700">{opp.budgetPerUnit || opp.offeredRate}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-600">Capacity Needed: <strong>{opp.requiredDailyCapacityPerWorker || 10} units/day</strong></span>
                    <Button size="sm" variant="secondary" icon="check-circle" onClick={() => onNavigate('/worker/projects')}>
                      {t('worker.acceptOrder')}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">{t('worker.workPassport')}</h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('/worker/profile')}>
              {t('common.details')} →
            </Button>
          </div>
          <WorkPassportCard user={workerUser} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
};
