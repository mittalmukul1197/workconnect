import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../common/Icon';
import { useAutoTranslate } from '../../hooks/useAutoTranslate';

export const MatchScoreBreakdown = ({ match }) => {
  const { t, i18n } = useTranslation();
  if (!match) return null;

  const score = match.totalScore || 92;
  const breakdown = match.breakdown || {
    skillFitScore: 30,
    availabilityScore: 15,
    capacityScore: 15,
    locationScore: 9,
    experienceScore: 9,
    reliabilityScore: 9,
    budgetFitScore: 5,
    accessibilityScore: 5
  };

  const reasons = match.reasons || [];
  const isInclusive = match.isInclusivePreference || match.accessibilityCompatible;

  const translatedReasons = useAutoTranslate(reasons, i18n.language);

  return (
    <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">{t('matchBreakdown.title')}</span>
        <div className="flex items-center gap-2">
          {isInclusive && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
              {t('matchBreakdown.inclusiveMatch')}
            </span>
          )}
          <span className="font-black text-indigo-700 text-base">{score}%</span>
        </div>
      </div>

      <div className="space-y-1.5 text-slate-600">
        <div className="flex justify-between">
          <span>{t('matchBreakdown.skillCompetency')}</span>
          <span className="font-bold text-slate-900">{breakdown.skillFitScore}/30</span>
        </div>
        <div className="flex justify-between">
          <span>{t('matchBreakdown.availabilitySchedule')}</span>
          <span className="font-bold text-slate-900">{breakdown.availabilityScore}/15</span>
        </div>
        <div className="flex justify-between">
          <span>{t('matchBreakdown.dailyCapacity')}</span>
          <span className="font-bold text-slate-900">{breakdown.capacityScore}/15</span>
        </div>
        <div className="flex justify-between">
          <span>{t('matchBreakdown.proximityRadius')}</span>
          <span className="font-bold text-slate-900">{breakdown.locationScore}/10</span>
        </div>
        <div className="flex justify-between">
          <span>{t('matchBreakdown.experiencePortfolio')}</span>
          <span className="font-bold text-slate-900">{breakdown.experienceScore}/10</span>
        </div>
        <div className="flex justify-between">
          <span>{t('matchBreakdown.reliabilityScore')}</span>
          <span className="font-bold text-slate-900">{breakdown.reliabilityScore}/10</span>
        </div>
        <div className="flex justify-between">
          <span>{t('matchBreakdown.budgetFit')}</span>
          <span className="font-bold text-slate-900">{breakdown.budgetFitScore}/5</span>
        </div>
        <div className="flex justify-between text-purple-800 font-medium">
          <span>{t('matchBreakdown.accessibilityInclusion')}</span>
          <span className="font-bold text-purple-950">{breakdown.accessibilityScore}/5</span>
        </div>
      </div>

      {reasons.length > 0 && (
        <div className="pt-2 border-t border-slate-200 space-y-1 text-[11px]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t('matchBreakdown.topReasons')}</span>
          <ul className="space-y-1 text-slate-700">
            {reasons.map((reason, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{translatedReasons[reason] || reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
