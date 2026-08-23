import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { WorkConnectEscrowVault } from '../../components/features/WorkConnectEscrowVault';
import { MOCK_PROJECTS } from '../../data/mockData';

export const BusinessProjects = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/80 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">{t('projects.title')}</h1>
            <Badge variant="primary">{t('projects.badge')}</Badge>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {t('projects.subtitle')}
          </p>
        </div>

        <Button
          variant="primary"
          icon="plus"
          onClick={() => onNavigate('/business/post-work')}
          className="shadow-md shadow-indigo-600/20 shrink-0"
        >
          {t('projects.postNew')}
        </Button>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {MOCK_PROJECTS.map((proj) => (
          <Card key={proj.id} borderVariant="indigo" className="p-6 space-y-6 bg-white shadow-md rounded-3xl">
            {/* Project Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-lg text-slate-900">{proj.title}</h3>
                  <Badge variant="success">{proj.status}</Badge>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {t('projects.targetQuota')} <strong className="text-slate-900">{proj.totalQuantity || 100} {proj.unitLabel || 'pieces'}</strong> • <strong className="text-indigo-700 font-extrabold">{proj.workerCount || 3} {t('projects.workersAssigned')}</strong> • {t('projects.deadline')} <strong className="text-amber-700 font-extrabold">{proj.deadlineDate || '26 Aug 2026'}</strong>
                </p>
                <p className="text-xs text-slate-600 font-bold mt-1">
                  {t('projects.allocatedBudget')} <strong className="text-emerald-700 text-sm font-black">{proj.offeredBudget || '₹3,000'}</strong> <span className="text-[11px] font-normal text-slate-500">({proj.ratePerUnit || '₹30 / piece'})</span>
                </p>
              </div>

              <Button
                size="md"
                variant="primary"
                icon="zap"
                onClick={() => onNavigate(`/business/project/${proj.id}`)}
                className="shrink-0 shadow-sm"
              >
                {t('projects.openTracker')}
              </Button>
            </div>

            {/* Production Progress Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-slate-700">{t('projects.realTimeOutput')}</span>
                <span className="text-indigo-600">{proj.completedQuantity} / {proj.totalQuantity} {proj.unitLabel} Completed ({Math.round((proj.completedQuantity / proj.totalQuantity) * 100)}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-emerald-400 transition-all duration-500"
                  style={{ width: `${(proj.completedQuantity / proj.totalQuantity) * 100}%` }}
                />
              </div>
            </div>

            {/* EMBEDDED ESCROW VAULT FOR THIS PROJECT */}
            <div className="pt-2">
              <h4 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Icon name="shield" className="w-4 h-4 text-emerald-600" />
                <span>{t('projects.escrowSection')}</span>
              </h4>
              <WorkConnectEscrowVault
                dealId={proj.id}
                dealTitle={proj.title}
                businessName={proj.businessName}
                workerName="Sunita Sharma & Team"
                amount="₹3,000"
                unitDetails={`100 pieces @ ₹30 / piece`}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
