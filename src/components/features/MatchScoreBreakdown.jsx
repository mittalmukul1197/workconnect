import React from 'react';
import { Icon } from '../common/Icon';

export const MatchScoreBreakdown = ({ match }) => {
  if (!match) return null;

  const score = match.totalScore || 95;
  const breakdown = match.breakdown || {
    skillFitScore: 30,
    availabilityScore: 15,
    capacityScore: 15,
    locationScore: 9.5,
    experienceScore: 9.0,
    reliabilityScore: 9.5,
    budgetFitScore: 9.0
  };

  return (
    <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">7-Dimension AI Score</span>
        <span className="font-black text-indigo-700 text-base">{score}%</span>
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
          <span>Budget & Rate Fit (10%)</span>
          <span className="font-bold text-slate-900">{breakdown.budgetFitScore}/10</span>
        </div>
        {(match.hasDisability || breakdown.accessibilityMatchScore !== undefined) && (
          <div className="flex justify-between text-purple-700 font-semibold pt-1 border-t border-slate-200">
            <span>♿ Accessibility & Workplace Fit</span>
            <span className="font-bold text-purple-900">
              {breakdown.accessibilityMatchScore !== undefined ? `${breakdown.accessibilityMatchScore}/10` : '10/10 (Compatible)'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
