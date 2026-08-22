import React from 'react';
import { Icon } from '../common/Icon';

export const MatchScoreBreakdown = ({ match }) => {
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

  return (
    <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">8-Dimension AI Match Score</span>
        <div className="flex items-center gap-2">
          {isInclusive && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
              ♿ Inclusive Match
            </span>
          )}
          <span className="font-black text-indigo-700 text-base">{score}%</span>
        </div>
      </div>

      <div className="space-y-1.5 text-slate-600">
        <div className="flex justify-between">
          <span>Skill Competency Match (30%)</span>
          <span className="font-bold text-slate-900">{breakdown.skillFitScore}/30</span>
        </div>
        <div className="flex justify-between">
          <span>Availability & Schedule (15%)</span>
          <span className="font-bold text-slate-900">{breakdown.availabilityScore}/15</span>
        </div>
        <div className="flex justify-between">
          <span>Daily Quota Capacity (15%)</span>
          <span className="font-bold text-slate-900">{breakdown.capacityScore}/15</span>
        </div>
        <div className="flex justify-between">
          <span>Proximity Radius (10%)</span>
          <span className="font-bold text-slate-900">{breakdown.locationScore}/10</span>
        </div>
        <div className="flex justify-between">
          <span>Experience & Portfolio (10%)</span>
          <span className="font-bold text-slate-900">{breakdown.experienceScore}/10</span>
        </div>
        <div className="flex justify-between">
          <span>Work Passport Reliability (10%)</span>
          <span className="font-bold text-slate-900">{breakdown.reliabilityScore}/10</span>
        </div>
        <div className="flex justify-between">
          <span>Budget & Rate Fit (5%)</span>
          <span className="font-bold text-slate-900">{breakdown.budgetFitScore}/5</span>
        </div>
        <div className="flex justify-between text-purple-800 font-medium">
          <span>Accessibility & Inclusion (5%)</span>
          <span className="font-bold text-purple-950">{breakdown.accessibilityScore}/5</span>
        </div>
      </div>

      {reasons.length > 0 && (
        <div className="pt-2 border-t border-slate-200 space-y-1 text-[11px]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Top Recommendation Reasons</span>
          <ul className="space-y-1 text-slate-700">
            {reasons.map((reason, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
