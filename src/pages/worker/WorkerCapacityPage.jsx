import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';

export const WorkerCapacityPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [capacity, setCapacity] = useState(30);
  const [availableToday, setAvailableToday] = useState(25);
  const [radius, setRadius] = useState(12);
  const [rate, setRate] = useState('₹30');
  const [isAvailableNow, setIsAvailableNow] = useState(true);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSaveCapacity = (e) => {
    e.preventDefault();
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl text-slate-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-emerald-200 bg-white shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">{t('workerCapacity.title')}</h1>
            <Badge variant={isAvailableNow ? 'success' : 'neutral'}>
              {isAvailableNow ? t('workerCapacity.activeAvailable') : t('workerCapacity.busyOffline')}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t('workerCapacity.subtitle')}
          </p>
        </div>

        <Button
          variant={isAvailableNow ? 'outline' : 'secondary'}
          size="sm"
          onClick={() => setIsAvailableNow(!isAvailableNow)}
        >
          {isAvailableNow ? t('workerCapacity.setOffline') : t('workerCapacity.setAvailableNow')}
        </Button>
      </div>

      {savedAlert && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 font-bold animate-scale-up">
          <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
          <span>{t('workerCapacity.savedAlert')}</span>
        </div>
      )}

      <Card borderVariant="emerald" className="p-6 space-y-5 bg-white shadow-sm rounded-3xl">
        <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Icon name="zap" className="w-5 h-5 text-emerald-600" />
          <span>{t('workerCapacity.productionCapacity')}</span>
        </h3>

        <form onSubmit={handleSaveCapacity} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={t('workerCapacity.maxDailyCapacity')}
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value, 10) || 0)}
            />
            <Input
              label={t('workerCapacity.openSlotsToday')}
              type="number"
              value={availableToday}
              onChange={(e) => setAvailableToday(parseInt(e.target.value, 10) || 0)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={t('workerCapacity.preferredRadius')}
              type="number"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value, 10) || 0)}
            />
            <Input
              label={t('workerCapacity.baseRateUnit')}
              type="text"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-slate-600">
            <span className="text-[10px] uppercase font-bold text-slate-400">{t('workerCapacity.liveSummaryTitle')}</span>
            <p className="font-medium">
              {t('workerCapacity.liveSummaryDesc', { slots: availableToday, rate, radius })}
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="secondary" size="lg" icon="check">
              {t('workerCapacity.publishCapacity')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
