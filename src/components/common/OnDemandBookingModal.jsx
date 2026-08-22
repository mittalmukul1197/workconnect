import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icon';
import { Button } from './Button';
import { Badge } from './Badge';
import { ON_DEMAND_SERVICES } from '../../data/mockData';

export const OnDemandBookingModal = ({ service, onClose, onNavigate }) => {
  const { t } = useTranslation();

  // Active Selected Service State (defaults to passed service or Electrician)
  const [currentService, setCurrentService] = useState(
    service || ON_DEMAND_SERVICES[0]
  );

  const [selectedTask, setSelectedTask] = useState(
    currentService.popularTasks?.[0] || 'Complete Repair Work'
  );
  const [urgency, setUrgency] = useState('instant');
  const [workerCount, setWorkerCount] = useState(1);
  const [address, setAddress] = useState('Model Town, Sector 4, Rajpura, Punjab');
  const [notes, setNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Switch Category handler
  const handleSelectCategory = (s) => {
    setCurrentService(s);
    setSelectedTask(s.popularTasks?.[0] || 'Complete Repair Work');
  };

  const basePriceNum = parseInt(currentService.startingPrice.replace(/[^0-9]/g, '')) || 400;
  const totalPrice = basePriceNum * workerCount * (urgency === 'instant' ? 1.15 : 1.0);

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border border-indigo-200 rounded-3xl shadow-2xl text-slate-900 my-auto max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header - Vibrant Meaningful Title for All Trade Categories */}
        <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 text-white shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Icon name={currentService.icon} className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-base text-white">Doorstep Trade Service Dispatch</h3>
                  <Badge variant="indigo" className="bg-indigo-500/30 text-indigo-200 border-indigo-400/40 text-[10px]">
                    Verified Artisans
                  </Badge>
                </div>
                <p className="text-xs text-indigo-200/80 font-medium">
                  Active Category: <strong className="text-white">{currentService.name}</strong> ({currentService.startingPrice} / {currentService.unit})
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>
          </div>

          {/* Trade Category Switcher Bar (All 8 Categories Accessible) */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 relative z-10">
            {ON_DEMAND_SERVICES.map((s) => {
              const isSelected = currentService.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectCategory(s)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30 scale-105'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon name={s.icon} className="w-3.5 h-3.5" />
                  <span>{s.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body */}
        {!bookingConfirmed ? (
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
            {/* Live Availability Banner */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>{currentService.availableCount} {currentService.name.split(' ')[0]} Professionals Online Nearby</span>
              </div>
              <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                ETA: {currentService.avgResponseTime}
              </span>
            </div>

            {/* Step 1: Select Popular Tasks for Selected Trade */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px]">
                  1. SELECT SPECIFIC SERVICE TASK ({currentService.name.split(' ')[0]})
                </label>
                <span className="text-[10px] text-indigo-600 font-bold">Select one option</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentService.popularTasks.map((task) => (
                  <button
                    key={task}
                    type="button"
                    onClick={() => setSelectedTask(task)}
                    className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                      selectedTask === task
                        ? 'bg-indigo-50/80 border-indigo-500 text-indigo-900 font-extrabold shadow-xs scale-[1.01]'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{task}</span>
                      {selectedTask === task && <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Urgency & Workers Needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px]">Required Timeline</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 font-medium focus:outline-none focus:border-indigo-500"
                >
                  <option value="instant">⚡ Rapid Immediate (&lt; 30 Mins)</option>
                  <option value="today">📅 Today Slot (Within 4 hrs)</option>
                  <option value="tomorrow">🗓️ Tomorrow Morning</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px]">Technicians Needed</label>
                <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-50 border border-slate-300">
                  <button
                    type="button"
                    onClick={() => setWorkerCount(Math.max(1, workerCount - 1))}
                    className="w-8 h-8 rounded-lg bg-white text-slate-800 font-extrabold hover:bg-slate-200 border border-slate-200"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-sm text-indigo-700">{workerCount}</span>
                  <button
                    type="button"
                    onClick={() => setWorkerCount(workerCount + 1)}
                    className="w-8 h-8 rounded-lg bg-white text-slate-800 font-extrabold hover:bg-slate-200 border border-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Location / Address */}
            <div className="space-y-1.5">
              <label className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px]">Doorstep Service Address</label>
              <div className="relative">
                <Icon name="map-pin" className="w-4 h-4 text-indigo-600 absolute left-3 top-3" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full street address..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Price Breakdown Footer */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between border border-indigo-800/60 shadow-lg">
              <div>
                <span className="text-[10px] uppercase text-indigo-300 font-extrabold tracking-wider block">Estimated Total</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-emerald-400">₹{Math.round(totalPrice)}</span>
                  <span className="text-[10px] text-slate-400">({workerCount} Pro • {urgency === 'instant' ? 'Rapid' : 'Standard'})</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                icon="check"
                onClick={handleConfirmBooking}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black shadow-md shadow-emerald-500/20 py-2.5 px-4"
              >
                Confirm Artisan Booking
              </Button>
            </div>
          </div>
        ) : (
          /* Confirmation State */
          <div className="p-8 text-center space-y-6 animate-scale-up">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Icon name="check-circle" className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <Badge variant="success" className="px-3 py-1 text-xs">Doorstep Artisan Assigned & On The Way!</Badge>
              <h3 className="text-2xl font-black text-slate-900">Booking Confirmed</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Assigned <strong className="text-slate-900">{currentService.name.split(' ')[0]}</strong> for <span className="text-indigo-700 font-extrabold">{selectedTask}</span>.
              </p>
              <p className="text-xs text-emerald-700 font-bold pt-1">
                🛡️ Payment locked in WorkConnect Escrow Vault until doorstep completion.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon="x"
              fullWidth
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Close & View Live Progress
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
