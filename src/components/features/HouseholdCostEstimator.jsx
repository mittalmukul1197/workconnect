import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Icon } from '../common/Icon';

export const HouseholdCostEstimator = ({ onBookService }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('electrician');
  const [quantity, setQuantity] = useState(2);
  const [urgency, setUrgency] = useState('today');
  const [materialsNeeded, setMaterialsNeeded] = useState(true);

  const categories = {
    electrician: {
      name: t('householdEstimator.electrician'),
      icon: 'zap',
      unitLabel: t('householdEstimator.pointsFixtures'),
      basePricePerUnit: 180,
      visitFee: 150,
      estimatedMinutesPerUnit: 25,
      suggestedTitle: 'Electrical Wiring & Switchboard Repair'
    },
    plumber: {
      name: t('householdEstimator.plumber'),
      icon: 'droplet',
      unitLabel: t('householdEstimator.tapsLeaks'),
      basePricePerUnit: 150,
      visitFee: 120,
      estimatedMinutesPerUnit: 30,
      suggestedTitle: 'Plumbing Tap Leak Repair & Fixtures'
    },
    carpenter: {
      name: t('householdEstimator.carpenter'),
      icon: 'hammer',
      unitLabel: t('householdEstimator.furnitureItemsLocks'),
      basePricePerUnit: 250,
      visitFee: 180,
      estimatedMinutesPerUnit: 45,
      suggestedTitle: 'Woodwork Repair & Lock Installation'
    },
    painter: {
      name: t('householdEstimator.painter'),
      icon: 'brush',
      unitLabel: t('householdEstimator.wallsRooms'),
      basePricePerUnit: 350,
      visitFee: 200,
      estimatedMinutesPerUnit: 60,
      suggestedTitle: 'Single Room Touchup & Wall Paint'
    },
    labour: {
      name: t('householdEstimator.labour'),
      icon: 'hard-hat',
      unitLabel: t('householdEstimator.helpersNeeded'),
      basePricePerUnit: 550,
      visitFee: 100,
      estimatedMinutesPerUnit: 120,
      suggestedTitle: 'Manual Shifting & Storage Room Helper'
    }
  };

  const currentCat = categories[selectedCategory];

  const subtotal = currentCat.basePricePerUnit * quantity;
  const visitFee = currentCat.visitFee;
  const materialEst = materialsNeeded ? Math.round(subtotal * 0.35) : 0;
  const urgencyMultiplier = urgency === 'immediate' ? 1.25 : 1.0;
  const totalEstimate = Math.round((subtotal + visitFee + materialEst) * urgencyMultiplier);
  const totalTimeMinutes = currentCat.estimatedMinutesPerUnit * quantity;

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white rounded-3xl border border-indigo-500/30 shadow-xl overflow-hidden relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-indigo-800/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Icon name="calculator" className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight text-white">{t('householdEstimator.title')}</h3>
            <p className="text-xs text-indigo-200 font-medium">{t('householdEstimator.subtitle')}</p>
          </div>
        </div>

        <Badge variant="indigo" className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30">
          {t('householdEstimator.badge')}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-indigo-200 uppercase tracking-wider">{t('householdEstimator.selectService')}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(categories).map(([key, cat]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedCategory(key)}
                  className={`p-3 rounded-xl border text-left flex flex-col items-start gap-2 transition-all ${
                    selectedCategory === key
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30 font-bold scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-indigo-500/50 hover:bg-slate-800'
                  }`}
                >
                  <Icon name={cat.icon} className="w-5 h-5" />
                  <span className="text-xs leading-snug">{cat.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-indigo-200 uppercase tracking-wider">{currentCat.unitLabel}</label>
                <span className="font-extrabold text-indigo-400 text-sm">{quantity}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-indigo-200 uppercase tracking-wider">{t('householdEstimator.timeline')}</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="today">{t('householdEstimator.todaySlot')}</option>
                <option value="immediate">{t('householdEstimator.urgentSos')}</option>
                <option value="scheduled">{t('householdEstimator.scheduledNextDay')}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <input
              type="checkbox"
              id="materials"
              checked={materialsNeeded}
              onChange={(e) => setMaterialsNeeded(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
            />
            <label htmlFor="materials" className="cursor-pointer">
              {t('householdEstimator.includeMaterials')}
            </label>
          </div>
        </div>

        {/* Right Output Summary Card */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950 border border-indigo-500/40 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-300">{t('householdEstimator.breakdownTitle')}</span>
            <div className="space-y-2 text-xs text-slate-300 border-b border-slate-800 pb-3">
              <div className="flex justify-between">
                <span>{t('householdEstimator.laborCost', { count: quantity, rate: currentCat.basePricePerUnit })}</span>
                <span className="font-bold text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('householdEstimator.visitFee')}</span>
                <span className="font-bold text-white">₹{visitFee}</span>
              </div>
              {materialsNeeded && (
                <div className="flex justify-between text-indigo-300">
                  <span>{t('householdEstimator.spareParts')}</span>
                  <span className="font-bold text-indigo-200">₹{materialEst}</span>
                </div>
              )}
              {urgency === 'immediate' && (
                <div className="flex justify-between text-amber-400">
                  <span>{t('householdEstimator.urgentCharge')}</span>
                  <span className="font-bold">+25%</span>
                </div>
              )}
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-xs text-slate-400 block font-medium">{t('householdEstimator.totalEstimate')}</span>
                <span className="text-2xl font-black text-emerald-400">₹{totalEstimate}</span>
              </div>
              <span className="text-xs text-indigo-300 font-bold bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-800">
                {t('householdEstimator.estimatedTime', { mins: totalTimeMinutes })}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            icon="sparkles"
            fullWidth
            onClick={() => onBookService && onBookService(currentCat, totalEstimate)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20"
          >
            {t('householdEstimator.bookNowRate', { amount: totalEstimate })}
          </Button>
        </div>
      </div>
    </Card>
  );
};
