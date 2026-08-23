import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';

export const WorkerProfilePage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const worker = {
    name: user?.name || 'Sunita Sharma',
    email: user?.email || 'sunita@demo.com',
    phone: user?.phone || '+91 98765 11111',
    profession: user?.profession || 'Master Tailor & Designer',
    city: user?.city || 'Rajpura',
    address: user?.address || 'House #42, Model Town, Rajpura, Punjab',
    experienceYears: user?.experienceYears || 6,
    dailyCapacity: user?.dailyCapacity || '30 pieces/day',
    expectedRate: user?.expectedRate || '₹700/day (or ₹35/piece)',
    hasDisability: user?.hasDisability || false,
    disabilityType: user?.disabilityType || (user?.disabilityTypes?.join(', ') || 'Locomotor / Physical Disability'),
    disabilityAccommodations: user?.accessibilityNeeds || user?.disabilityAccommodations || ['Wheelchair accessible workplace', 'Flexible working hours'],
    additionalAccessibilityNotes: user?.additionalAccessibilityNotes || 'Requires step-free ramp access at ground level or elevator.',
    idVerified: user?.idVerified || 'Verified (Aadhaar KYC Completed)'
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl text-slate-900 pb-12 mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 text-white shadow-xl border-2 animate-shining-border">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 p-0.5 shadow-lg shadow-emerald-400/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400 font-black text-2xl">
              {worker.name.charAt(0)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white">{worker.name}</h1>
              <Badge variant="emerald" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 text-xs">
                {t('workerProfile.badge')}
              </Badge>
            </div>
            <p className="text-xs text-cyan-200/80 font-semibold">{worker.profession} • {worker.city}</p>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          icon="shield-check"
          onClick={() => onNavigate('/worker/profile')}
          className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black shadow-lg shadow-emerald-400/30 border border-emerald-200 text-xs px-5 py-2.5 rounded-2xl shrink-0"
        >
          {t('workerProfile.viewPassport')}
        </Button>
      </div>

      {/* Platform Fixed Credential Notice Bar */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-semibold flex items-center gap-3 shadow-xs">
        <Icon name="lock" className="w-5 h-5 text-amber-600 shrink-0" />
        <p className="text-[11px] leading-relaxed text-amber-950">
          <strong className="font-extrabold text-amber-900">{t('workerProfile.authNotice')}</strong> {t('workerProfile.authDesc')}
        </p>
      </div>

      <Card borderVariant="emerald" className="p-6 sm:p-8 space-y-6 bg-white shadow-md rounded-3xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Icon name="user" className="w-5 h-5 text-emerald-600" />
            <span>{t('workerProfile.title')}</span>
          </h2>
          <Badge variant="indigo" className="text-xs font-extrabold px-3 py-1">
            {worker.idVerified}
          </Badge>
        </div>

        {/* Read-Only Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">{t('workerProfile.legalName')}</span>
            <p className="font-extrabold text-slate-900 text-sm">{worker.name}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">{t('workerProfile.tradeName')}</span>
            <p className="font-extrabold text-emerald-700 text-sm">{worker.profession}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">{t('workerProfile.contactPhone')}</span>
            <p className="font-extrabold text-slate-900">{worker.phone}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">{t('workerProfile.verifiedEmail')}</span>
            <p className="font-extrabold text-slate-900">{worker.email}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">{t('workerProfile.dailyCapacity')}</span>
            <p className="font-extrabold text-emerald-700">{worker.dailyCapacity}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">{t('workerProfile.workRate')}</span>
            <p className="font-extrabold text-emerald-700">{worker.expectedRate}</p>
          </div>

          <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">{t('workerProfile.doorstepAddress')}</span>
            <p className="font-extrabold text-slate-900">{worker.address}</p>
          </div>
        </div>

        {/* FIXED DISABILITY & ACCESSIBILITY STATUS SECTION */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-purple-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-200/60 pb-3">
            <div>
              <h3 className="font-extrabold text-xs uppercase text-purple-950 tracking-wider flex items-center gap-2">
                <Icon name="shield-check" className="w-4 h-4 text-purple-600" />
                <span>{t('workerProfile.disabilityRecord')}</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {t('workerProfile.disabilityRecordDesc')}
              </p>
            </div>

            {worker.hasDisability ? (
              <Badge variant="purple" className="text-xs px-3 py-1 font-extrabold">
                {t('workerProfile.pwdBadge')}
              </Badge>
            ) : (
              <Badge variant="success" className="text-xs px-3 py-1 font-extrabold">
                {t('workerProfile.abled')}
              </Badge>
            )}
          </div>

          {worker.hasDisability ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 bg-purple-100/70 p-3 rounded-xl border border-purple-200">
                <Icon name="check-circle" className="w-4 h-4 text-purple-700 shrink-0" />
                <span className="font-extrabold text-purple-950">
                  {t('workerProfile.verifiedCategory')} {worker.disabilityType}
                </span>
              </div>

              {worker.disabilityAccommodations?.length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-bold block text-slate-700 text-[11px] uppercase tracking-wider">
                    {t('workerProfile.accommodations')}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {worker.disabilityAccommodations.map((acc, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-purple-100 text-purple-900 text-xs font-bold border border-purple-300 shadow-2xs">
                        ✓ {acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {worker.additionalAccessibilityNotes && (
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{t('workerProfile.additionalNotes')}</span>
                  <p className="text-xs text-slate-700 font-medium italic">"{worker.additionalAccessibilityNotes}"</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-600 font-medium">
              {t('workerProfile.noDisability')}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};
