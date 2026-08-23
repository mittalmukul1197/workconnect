import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { parseNaturalLanguageRequirementAsync } from '../../services/workDecomposer';
import { useAutoTranslate } from '../../hooks/useAutoTranslate';

export const PostWorkPage = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [nlPrompt, setNlPrompt] = useState('I need 2 labours for paint in my hall i can give them 700/day');
  const [parsed, setParsed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dynamicTrans = useAutoTranslate([parsed?.workType, parsed?.requiredSkill], i18n.language);

  const handleParse = async () => {
    setIsLoading(true);
    try {
      const res = await parseNaturalLanguageRequirementAsync(nlPrompt);
      setParsed(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAndMatch = () => {
    if (parsed) {
      try {
        localStorage.setItem('workconnect_active_job', JSON.stringify(parsed));
      } catch (e) {
        console.error('Error storing active job requirement:', e);
      }
    }
    onNavigate('/business/matches');
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-slate-900">{t('postWork.title')}</h1>
          <Badge variant="primary">{t('postWork.badge')}</Badge>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          {t('postWork.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card borderVariant="indigo" className="p-6 space-y-4 bg-white shadow-sm">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t('postWork.nlLabel')}</label>
            <textarea
              value={nlPrompt}
              onChange={(e) => setNlPrompt(e.target.value)}
              rows={4}
              className="w-full p-3.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
            />
          </div>

          <Button variant="primary" size="md" icon="sparkles" onClick={handleParse} fullWidth disabled={isLoading}>
            {isLoading ? t('postWork.extractingBtn') : t('postWork.extractBtn')}
          </Button>

          {/* Prompt Presets for Quick Testing */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t('postWork.quickPresets')}</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setNlPrompt('I need 2 labours for paint in my hall i can give them 700/day')}
                className="text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-md"
              >
                🎨 2 Labours Painting (700/day)
              </button>
              <button
                onClick={() => setNlPrompt('Mujhe 20 solar panels install karwane hain 3 din mein')}
                className="text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-md"
              >
                ⚡ 20 Solar Panels (3 days)
              </button>
              <button
                onClick={() => setNlPrompt('Mujhe 100 kurtis stitch karwani hain aur 2 workers chahiye')}
                className="text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-md"
              >
                🧵 100 Kurtis (2 workers)
              </button>
            </div>
          </div>
        </Card>

        <div>
          {parsed ? (
            <Card borderVariant={parsed.needsClarification ? 'rose' : 'emerald'} className="p-6 space-y-4 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs text-indigo-700 uppercase">{t('postWork.extractedSpecs')}</span>
                <Badge variant={parsed.needsClarification ? 'secondary' : 'success'}>
                  {parsed.engineName || (parsed.needsClarification ? t('postWork.needsClarification') : t('postWork.aiVerified'))}
                </Badge>
              </div>

              {parsed.needsClarification && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 font-medium">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Icon name="alert-circle" className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('postWork.clarificationAlert')}</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    {t('postWork.clarificationDesc')}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">{t('postWork.workType')}</span>
                  <p className="font-bold text-slate-900 mt-0.5">{dynamicTrans[parsed.workType] || parsed.workType}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">{t('postWork.requiredSkill')}</span>
                  <p className={`font-bold mt-0.5 ${parsed.needsClarification ? 'text-amber-700' : 'text-indigo-700'}`}>
                    {dynamicTrans[parsed.requiredSkill || parsed.skillName] || parsed.requiredSkill || parsed.skillName}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">{t('postWork.workersNeeded')}</span>
                  <p className="font-bold text-purple-700 mt-0.5">
                    {parsed.workersNeeded ? `${parsed.workersNeeded} ${t('postWork.workers')}` : t('postWork.notSpecified')}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">{t('postWork.totalQuota')}</span>
                  <p className="font-bold text-emerald-700 mt-0.5">
                    {parsed.totalQuantity ? `${parsed.totalQuantity} ${parsed.unitLabel || t('postWork.units')}` : t('postWork.notSpecified')}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">{t('postWork.deadlineVelocity')}</span>
                  <p className="font-bold text-amber-700 mt-0.5">
                    {parsed.deadlineDays ? `${parsed.deadlineDays} ${t('postWork.days')}` : t('postWork.notSpecified')}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">{t('postWork.offeredRate')}</span>
                  <p className="font-bold text-blue-700 mt-0.5">
                    {parsed.suggestedRate ? `₹${parsed.suggestedRate} ${parsed.rateUnit ? parsed.rateUnit : ''}` : t('postWork.negotiable')}
                  </p>
                </div>
              </div>

              <Button
                variant={parsed.needsClarification ? 'outline' : 'secondary'}
                size="lg"
                icon="arrow-right"
                iconPosition="right"
                onClick={handleConfirmAndMatch}
                fullWidth
              >
                {t('postWork.findWorkers')}
              </Button>
            </Card>
          ) : (
            <div className="p-10 rounded-2xl border border-dashed border-slate-300 text-center space-y-2 text-slate-500 text-xs bg-white">
              <Icon name="sparkles" className="w-8 h-8 mx-auto text-indigo-500" />
              <p>{t('postWork.emptyState')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
