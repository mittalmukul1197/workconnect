import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icon';
import { Button } from './Button';
import { Badge } from './Badge';

export const OnDemandBookingModal = ({ service, onClose, onNavigate }) => {
  const { t } = useTranslation();
  const [selectedTask, setSelectedTask] = useState(service?.popularTasks?.[0] || '');
  const [urgency, setUrgency] = useState('instant');
  const [workerCount, setWorkerCount] = useState(1);
  const [address, setAddress] = useState('Model Town, Sector 4, Rajpura, Punjab');
  const [notes, setNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!service) return null;

  const basePriceNum = parseInt(service.startingPrice.replace(/[^0-9]/g, '')) || 400;
  const totalPrice = basePriceNum * workerCount * (urgency === 'instant' ? 1.1 : 1.0);

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl text-slate-900 my-auto max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
              <Icon name={service.icon} className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">{service.name}</h3>
                <Badge variant="success">On-Demand</Badge>
              </div>
              <p className="text-[11px] text-slate-500">{t('onDemand.ratePerVisit')} <span className="text-emerald-700 font-bold">{service.startingPrice}</span> / {service.unit}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!bookingConfirmed ? (
          <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Live Availability Banner */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{service.availableCount} {service.name.split(' ')[0]}s Online Nearby</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">ETA: {service.avgResponseTime}</span>
            </div>

            {/* Step 1: Select Specific Task */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t('onDemand.step1')}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.popularTasks.map((task) => (
                  <button
                    key={task}
                    onClick={() => setSelectedTask(task)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      selectedTask === task
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-800 font-bold shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{task}</span>
                      {selectedTask === task && <Icon name="check-circle" className="w-3.5 h-3.5 text-indigo-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Urgency & Workers needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Urgency</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                >
                  <option value="instant">⚡ Immediate (&lt; 30 Mins)</option>
                  <option value="today">📅 Today Slot (Within 4 hrs)</option>
                  <option value="tomorrow">🗓️ Tomorrow Morning</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t('onDemand.selectWorker')}</label>
                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-300">
                  <button
                    type="button"
                    onClick={() => setWorkerCount(Math.max(1, workerCount - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold hover:bg-slate-200"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-xs text-indigo-700">{workerCount}</span>
                  <button
                    type="button"
                    onClick={() => setWorkerCount(workerCount + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Location / Address */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t('onDemand.step2')}</label>
              <div className="relative">
                <Icon name="map-pin" className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Price Breakdown Footer */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">{t('common.budget')}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-emerald-700">₹{Math.round(totalPrice)}</span>
                </div>
              </div>
              <Button
                variant="primary"
                size="md"
                icon="check"
                onClick={handleConfirmBooking}
              >
                {t('onDemand.confirmBooking')}
              </Button>
            </div>
          </div>
        ) : (
          /* Confirmation State */
          <div className="p-8 text-center space-y-6 animate-scale-up">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Icon name="check-circle" className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <Badge variant="success">Booking Dispatched!</Badge>
              <h3 className="text-2xl font-black text-slate-900">{t('onDemand.confirmBooking')}</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Assigned worker for <span className="text-indigo-700 font-semibold">{selectedTask}</span>.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon="x"
              fullWidth
              onClick={onClose}
            >
              {t('common.close')}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
