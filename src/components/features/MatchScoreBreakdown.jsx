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
    <div className="space-y-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-bold text-white uppercase tracking-wider text-[10px]">7-Dimension AI Score</span>
        <span className="font-black text-indigo-400 text-base">{score}%</span>
      </div>

      <div className="space-y-1.5 text-slate-300">
        <div className="flex justify-between">
          <span>Skill Competency Match (30%)</span>
          <span className="font-bold text-white">{breakdown.skillFitScore}/30</span>
        </div>
        <div className="flex justify-between">
          <span>Availability & Schedule (15%)</span>
          <span className="font-bold text-white">{breakdown.availabilityScore}/15</span>
        </div>
        <div className="flex justify-between">
          <span>Daily Quota Capacity (15%)</span>
          <span className="font-bold text-white">{breakdown.capacityScore}/15</span>
        </div>
        <div className="flex justify-between">
          <span>Proximity Radius (10%)</span>
          <span className="font-bold text-white">{breakdown.locationScore}/10</span>
        </div>
        <div className="flex justify-between">
          <span>Experience & Portfolio (10%)</span>
          <span className="font-bold text-white">{breakdown.experienceScore}/10</span>
        </div>
        <div className="flex justify-between">
          <span>Work Passport Reliability (10%)</span>
          <span className="font-bold text-white">{breakdown.reliabilityScore}/10</span>
        </div>
        <div className="flex justify-between">
          <span>Budget & Rate Fit (10%)</span>
          <span className="font-bold text-white">{breakdown.budgetFitScore}/10</span>
        </div>
      </div>
    </div>
  );
};
