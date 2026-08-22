import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useChat } from '../../context/ChatContext';

export const WorkPassportCard = ({ workerUser, profile, compact = false, onNavigate }) => {
  const { t } = useTranslation();
  const { openChatWithUser } = useChat();

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
    <div className="rounded-2xl border border-indigo-200 p-6 space-y-6 relative overflow-hidden bg-white shadow-md text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Icon name="shield-check" className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-slate-900">{t('workPassport.title')}</h3>
              <Badge variant="success" className="text-[10px]">{t('workPassport.verifiedCredentials')}</Badge>
            </div>
            <p className="text-xs text-slate-500">{t('workPassport.subtitle')}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-black text-amber-500 flex items-center justify-end gap-1">
            <span>★</span>
            <span>{passport.overallRating}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('workPassport.overallTrust')}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <span className="text-xs text-slate-500 font-medium block">{t('workPassport.completedJobs')}</span>
          <span className="text-lg font-black text-slate-900">{passport.totalCompletedJobs}</span>
        </div>
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
          <span className="text-xs text-emerald-800 font-medium block">{t('worker.onTimeRate')}</span>
          <span className="text-lg font-black text-emerald-700">{passport.onTimeRate}%</span>
        </div>
        <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-center">
          <span className="text-xs text-indigo-800 font-medium block">{t('worker.qualityScore')}</span>
          <span className="text-lg font-black text-indigo-700">{passport.qualityScore}</span>
        </div>
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-center">
          <span className="text-xs text-amber-800 font-medium block">{t('worker.repeatClients')}</span>
          <span className="text-lg font-black text-amber-700">{passport.repeatClientRate}%</span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('workPassport.competencies')}</h4>
        <div className="space-y-1.5">
          {skills.map((s) => (
            <div key={s.name} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-800">{s.name}</span>
              <span className="font-mono font-bold text-indigo-600">{s.score}%</span>
            </div>
          ))}
        </div>
      </div>

      {(workerUser.hasDisability || profile?.hasDisability) && (
        <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="purple" className="text-[10px]">♿ PwD Inclusive Worker</Badge>
              <span className="font-bold text-purple-950">
                {workerUser.disabilityType || profile?.disabilityType || 'Special Ability Artisan'}
              </span>
            </div>
          </div>
          {(workerUser.disabilityAccommodations?.length > 0 || profile?.disabilityAccommodations?.length > 0) && (
            <p className="text-[11px] text-purple-800 leading-relaxed font-medium">
              <strong className="font-bold">Accommodations Needed:</strong>{' '}
              {(workerUser.disabilityAccommodations || profile?.disabilityAccommodations || []).join(', ')}
            </p>
          )}
        </div>
      )}

      {onNavigate && (
        <div className="pt-2 border-t border-slate-100">
          <Button
            variant="primary"
            fullWidth
            icon="message-square"
            onClick={() => openChatWithUser({
              id: workerUser.id || 'usr-wrk-1',
              name: workerUser.name || 'Sunita Sharma',
              role: 'worker',
              avatar: workerUser.avatar,
              profession: workerUser.profession || 'Master Tailor & Garment Designer'
            }, onNavigate)}
          >
            {t('chat.messageWorker') || 'Message Worker'}
          </Button>
        </div>
      )}
    </div>
  );
};
