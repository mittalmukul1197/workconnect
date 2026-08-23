import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { MatchScoreBreakdown } from '../../components/features/MatchScoreBreakdown';
import { MOCK_WORKERS } from '../../data/mockData';
import { rankWorkersForJob } from '../../services/matchingEngine';

export const MatchingPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [activeJob, setActiveJob] = useState(() => {
    try {
      const saved = localStorage.getItem('workconnect_active_job');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Default fallback requirement if none set from PostWorkPage
  const currentJob = activeJob || {
    workType: 'Garment Manufacturing & Apparel',
    skillName: 'Stitching',
    totalQuantity: 100,
    unitLabel: 'pieces',
    deadlineDays: 5,
    workersNeeded: 2,
    requiredDailyCapacityPerWorker: 10,
    suggestedRatePerUnit: 30,
    city: 'Rajpura',
    accessibilitySupported: true,
    supportedAccommodations: [
      'Wheelchair Accessible Workspace',
      'Flexible Work Hours / Rest Breaks',
      'Home-based / Remote Work Option'
    ]
  };

  const rankedWorkers = rankWorkersForJob(MOCK_WORKERS, currentJob);

  const handleSelectPreset = (skillName, workType, rate, unit) => {
    const newJob = {
      ...currentJob,
      skillName,
      workType,
      suggestedRatePerUnit: rate,
      unitLabel: unit
    };
    setActiveJob(newJob);
    try {
      localStorage.setItem('workconnect_active_job', JSON.stringify(newJob));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      {/* Header & Active Requirement Banner */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">{t('matching.title')}</h1>
              <Badge variant="primary">{t('matching.badge')}</Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {t('matching.subtitle')}
            </p>
          </div>

          <Button variant="outline" size="sm" icon="plus" onClick={() => onNavigate('/business/post-work')}>
            {t('matching.postNew')}
          </Button>
        </div>

        {/* Active Requirement Card */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-2">
              <Icon name="briefcase" className="w-4 h-4 text-indigo-600" />
              <span>{t('matching.activeTarget')} <strong>{currentJob.skillName}</strong> ({currentJob.totalQuantity} {currentJob.unitLabel})</span>
            </span>
            <Badge variant="indigo">
              {currentJob.workersNeeded} {t('matching.workersNeeded')} • {currentJob.deadlineDays} {t('matching.days')}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-indigo-200/60">
            <span className="text-[11px] font-bold text-slate-500">{t('matching.testPresets')}</span>
            <button
              onClick={() => handleSelectPreset('Stitching', 'Garment Manufacturing & Apparel', 30, 'pieces')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                currentJob.skillName === 'Stitching'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              🧵 Stitching (Kurtis)
            </button>
            <button
              onClick={() => handleSelectPreset('Electrical Wiring', 'Renewable Energy & Contracting', 850, 'setups')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                currentJob.skillName === 'Electrical Wiring'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              ⚡ Electrical Wiring (Solar)
            </button>
          </div>
        </div>
      </div>

      {/* Ranked Candidate List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rankedWorkers.map((worker, index) => {
          const match = worker.match;
          const isTopMatch = index === 0;

          return (
            <Card
              key={worker.id}
              borderVariant={isTopMatch ? 'emerald' : worker.hasDisability ? 'purple' : 'indigo'}
              className="p-6 space-y-4 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                    />
                    <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-slate-900 text-white font-extrabold text-[10px] flex items-center justify-center border border-white">
                      #{index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{worker.name}</h3>
                    <p className="text-xs text-indigo-700 font-bold">{worker.profession}</p>
                    <p className="text-[11px] text-slate-500">📍 {worker.city} • {worker.dailyCapacity}</p>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <Badge variant={isTopMatch ? 'success' : match.totalScore >= 85 ? 'primary' : 'secondary'}>
                    {match.totalScore}% {t('matching.aiMatch')}
                  </Badge>
                  {match.isInclusivePreference && (
                    <span className="block text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">
                      {t('matching.inclusiveMatch')}
                    </span>
                  )}
                </div>
              </div>

              {/* 8-Dimension Breakdown */}
              <MatchScoreBreakdown match={match} />

              <Button
                variant={isTopMatch ? 'primary' : 'secondary'}
                size="md"
                icon="check-circle"
                fullWidth
                onClick={() => onNavigate('/business/projects')}
              >
                {t('matching.assign')}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
