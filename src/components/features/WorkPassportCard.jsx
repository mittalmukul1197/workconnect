import React from 'react';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';

export const WorkPassportCard = ({ workerUser, profile, compact = false }) => {
  if (!workerUser) return null;

  const passport = profile?.workPassport || {
    totalCompletedJobs: 147,
    onTimeRate: 96,
    qualityScore: 93,
    overallRating: 4.9,
    repeatClientRate: 88,
    verifiedBadges: ['Top Rated Artisan', 'High Punctuality', 'Verified Identity', 'Zero Defect Streak']
  };

  const skills = profile?.skills || [
    { name: 'Stitching', score: 95 },
    { name: 'Alterations', score: 91 },
    { name: 'Embroidery', score: 84 }
  ];

  return (
    <div className="glass-panel rounded-2xl border border-indigo-500/30 p-6 space-y-6 relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-indigo-950/40 shadow-2xl">
      <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Icon name="shield-check" className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-white">Work Passport</h3>
              <Badge variant="success" className="text-[10px]">Verified Credentials</Badge>
            </div>
            <p className="text-xs text-slate-400">Portable Workforce Reputation ID • WorkConnect Network</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-black text-amber-400 flex items-center justify-end gap-1">
            <Icon name="star" className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span>{passport.overallRating || 4.9}</span>
          </div>
          <span className="text-[11px] text-slate-400">Overall Trust Score</span>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <img
          src={workerUser.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'}
          alt={workerUser.name}
          className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-md shrink-0"
        />
        <div className="space-y-1 min-w-0 flex-1">
          <h4 className="font-bold text-white text-base truncate">{workerUser.name}</h4>
          <p className="text-xs text-indigo-300 font-medium">{workerUser.profession || 'Master Professional'}</p>
          <div className="flex items-center gap-3 text-xs text-slate-400 pt-0.5">
            <span className="flex items-center gap-1">
              <Icon name="map-pin" className="w-3.5 h-3.5 text-slate-500" />
              {workerUser.city || 'Rajpura'}, {workerUser.state || 'Punjab'}
            </span>
            <span>• {profile?.experienceYears || 8} yrs exp</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="text-2xl font-black text-white">{passport.totalCompletedJobs || 147}</div>
          <div className="text-[11px] font-medium text-slate-400 mt-0.5">Completed Jobs</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="text-2xl font-black text-emerald-400">{passport.onTimeRate || 96}%</div>
          <div className="text-[11px] font-medium text-slate-400 mt-0.5">On-Time Delivery</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="text-2xl font-black text-indigo-400">{passport.qualityScore || 93}%</div>
          <div className="text-[11px] font-medium text-slate-400 mt-0.5">Quality Score</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="text-2xl font-black text-amber-400">{passport.repeatClientRate || 88}%</div>
          <div className="text-[11px] font-medium text-slate-400 mt-0.5">Repeat Clients</div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Verified Skill Competencies</h5>
        <div className="space-y-2">
          {skills.map((skill, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-400" />
                  {skill.name}
                </span>
                <span className="font-bold text-indigo-300">{skill.score}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {!compact && (
        <div className="pt-2 border-t border-slate-800/80">
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Verified Network Badges</h5>
          <div className="flex flex-wrap gap-2">
            {(passport.verifiedBadges || []).map((badge, idx) => (
              <span key={idx} className="text-xs font-semibold bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-lg border border-indigo-500/20 flex items-center gap-1.5">
                <Icon name="award" className="w-3.5 h-3.5 text-amber-400" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
