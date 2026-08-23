import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { MOCK_WORKERS, MOCK_PROJECTS } from '../../data/mockData';
import { useAutoTranslate } from '../../hooks/useAutoTranslate';

export const BusinessDashboard = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  // Gather all dynamic project strings for translation (titles, locations, statuses)
  const dynamicTextsToTranslate = [
    ...MOCK_PROJECTS.map((p) => p.title),
    ...MOCK_PROJECTS.map((p) => p.location),
    ...MOCK_PROJECTS.map((p) => p.status)
  ];

  const dynamicTrans = useAutoTranslate(dynamicTextsToTranslate, i18n.language);

  return (
    <div className="space-y-8 animate-fade-in text-slate-900">
      {/* Header Banner & "+ Post New Work" CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-white to-purple-50 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">{t('business.welcome')}, {user?.name || 'Ananya Verma'} 👋</h1>
            <Badge variant="primary">{t('business.businessOwner')}</Badge>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {user?.industry || 'Crafted Threads Boutique'} • {user?.city || 'Rajpura'}, Punjab
          </p>
        </div>

        <Button
          size="lg"
          variant="primary"
          icon="plus"
          onClick={() => onNavigate('/business/post-work')}
          className="shadow-md shadow-indigo-600/20"
        >
          {t('business.postNewWork')}
        </Button>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('business.activeProjects')} value="3" subtext={t('business.activeProduction')} icon="briefcase" variant="primary" />
        <StatCard title={t('business.assignedTeam')} value="12" subtext={t('business.acrossActiveTeams')} icon="users" variant="emerald" />
        <StatCard title={t('common.completed')} value="28" subtext={t('business.onTimeDeliveryRate')} icon="check-circle" variant="sky" />
        <StatCard title={t('business.recommendedWorkers')} value="8" subtext={t('business.savedTalentPool')} icon="shield" variant="amber" />
      </div>

      {/* ACTIVE WORK ORDERS & SELF-HEALING STATUS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">{t('business.activeProjects')}</h2>
            <p className="text-xs text-slate-500 font-medium">{t('business.realTimeTracker')}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onNavigate('/business/projects')}>
            {t('common.viewAll')} ({MOCK_PROJECTS.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_PROJECTS.map((proj) => {
            const displayTitle = dynamicTrans[proj.title] || proj.title;
            const displayLocation = dynamicTrans[proj.location] || proj.location;
            const displayStatus = dynamicTrans[proj.status] || proj.status;

            return (
              <Card key={proj.id} borderVariant="indigo" className="p-5 space-y-4 bg-white shadow-sm hover:shadow-md">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{displayTitle}</h3>
                    <p className="text-[11px] text-slate-500">{displayLocation} • {proj.workerCount} {t('business.workersAssigned')}</p>
                  </div>
                  <Badge variant={proj.status === 'Delayed / Self-Healing' ? 'amber' : 'success'}>
                    {displayStatus}
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">{t('business.productionProgress')}</span>
                    <span className="text-indigo-600 font-extrabold">
                      {proj.progress}% {(proj.completedQuantity || proj.completedUnits) ? `(${proj.completedQuantity || proj.completedUnits}/${proj.totalQuantity || proj.targetUnits} ${proj.unitLabel || proj.unit || ''})` : ''}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500" style={{ width: `${proj.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-slate-600 font-medium">
                    {t('business.budget')}: <strong className="text-emerald-700 font-black text-xs">{proj.offeredBudget || proj.budget || '₹3,000'}</strong>
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => onNavigate(`/business/projects`)}>
                    {t('business.openTracker')} →
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
