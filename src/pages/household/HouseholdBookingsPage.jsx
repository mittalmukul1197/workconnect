import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { OnDemandBookingModal } from '../../components/common/OnDemandBookingModal';
import { WorkConnectEscrowVault } from '../../components/features/WorkConnectEscrowVault';
import { ON_DEMAND_SERVICES } from '../../data/mockData';

export const HouseholdBookingsPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'active' | 'completed'
  const [activeBookingService, setActiveBookingService] = useState(null);
  const [selectedEscrowBooking, setSelectedEscrowBooking] = useState(null);
  const [liveMapBooking, setLiveMapBooking] = useState(null);
  const [ratingModalBooking, setRatingModalBooking] = useState(null);
  const [otpVisibleId, setOtpVisibleId] = useState(null);

  // Rating & Tip State
  const [starRating, setStarRating] = useState(5);
  const [tipAmount, setTipAmount] = useState(50);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmittedId, setReviewSubmittedId] = useState(null);

  // Live Map Simulation State - Slow & Realistic Decay
  const [workerDistance, setWorkerDistance] = useState(1.4);
  const [workerEta, setWorkerEta] = useState(12);
  const [mapMode, setMapMode] = useState('cyber'); // 'cyber' | 'satellite' | 'heatmap'
  const [driverAlerted, setDriverAlerted] = useState(false);

  useEffect(() => {
    let interval;
    let stepCount = 0;
    if (liveMapBooking) {
      interval = setInterval(() => {
        stepCount += 1;
        setWorkerDistance((prev) => {
          if (prev <= 0.15) return 0.15;
          return parseFloat((prev - 0.03).toFixed(2));
        });
        if (stepCount % 2 === 0) {
          setWorkerEta((prev) => (prev > 2 ? prev - 1 : 2));
        }
      }, 7000); // 7 seconds per tick so decay is slow and realistic
    } else {
      setWorkerDistance(1.4);
      setWorkerEta(12);
    }
    return () => clearInterval(interval);
  }, [liveMapBooking]);

  const bookingsList = [
    {
      id: 'bk-101',
      serviceName: 'Electrician (Switchboard & Fan Rewiring)',
      category: 'Electrician',
      workerName: 'Manish Kumar',
      workerPhone: '+91 98765 44433',
      rating: 4.9,
      status: 'Assigned & En Route',
      currentStep: 3, // 1: Confirmed, 2: Dispatched, 3: En Route, 4: Work in progress, 5: Completed
      eta: `${workerEta} Mins`,
      distance: `${workerDistance} km away`,
      date: 'Today, 2:30 PM',
      budget: '₹450',
      address: user?.address || 'Model Town, Sector 4, Rajpura',
      otp: '7842',
      escrowStatus: 'Locked in WorkConnect Vault 🔒',
      workerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'bk-102',
      serviceName: 'Plumber (Tap Leakage & Sink Fitting)',
      category: 'Plumber',
      workerName: 'Ramesh Singh',
      workerPhone: '+91 98765 88811',
      rating: 4.85,
      status: 'Completed',
      currentStep: 5,
      eta: 'Completed',
      distance: 'Arrived',
      date: '20 Aug 2026, 11:00 AM',
      budget: '₹350',
      address: user?.address || 'Model Town, Sector 4, Rajpura',
      otp: '9120',
      escrowStatus: 'Released to Worker 🟢',
      workerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'bk-103',
      serviceName: 'Carpenter (Door Lock & Fitting Repair)',
      category: 'Carpenter',
      workerName: 'Gurpreet Singh',
      workerPhone: '+91 98765 77722',
      rating: 4.9,
      status: 'Completed',
      currentStep: 5,
      eta: 'Completed',
      distance: 'Arrived',
      date: '18 Aug 2026, 4:00 PM',
      budget: '₹500',
      address: user?.address || 'Model Town, Sector 4, Rajpura',
      otp: '3341',
      escrowStatus: 'Released to Worker 🟢',
      workerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    }
  ];

  const filteredBookings = bookingsList.filter((bk) => {
    if (filterTab === 'active') return bk.status !== 'Completed';
    if (filterTab === 'completed') return bk.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in text-slate-900 pb-12">
      {/* Unique Cosmic Aurora Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-teal-950 text-white shadow-2xl overflow-hidden border-2 animate-shining-border">
        {/* Glow ambient radial lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/25 via-emerald-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-slate-900/90 text-cyan-300 border border-cyan-400/50 text-xs py-1 px-3 rounded-xl font-black shadow-xs flex items-center gap-1.5">
                ⚡ Doorstep Service Manager
              </span>
              <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-xs py-1 px-3 rounded-xl font-bold">
                🛡️ Live Escrow Protected
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm leading-snug">
              {t('householdBookings.title')}
            </h1>
            <p className="text-xs sm:text-sm text-cyan-100 font-medium leading-relaxed">
              {t('householdBookings.subtitle')}
            </p>
          </div>

          <button
            onClick={() => setActiveBookingService(ON_DEMAND_SERVICES[0])}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-cyan-400/30 transition-all scale-100 hover:scale-105 active:scale-95 border border-cyan-200 shrink-0"
          >
            <Icon name="plus" className="w-4 h-4 text-slate-950" />
            <span>{t('householdBookings.newBooking')}</span>
          </button>
        </div>
      </div>

      {/* Interactive Navigation Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              filterTab === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t('householdBookings.filterAll')} ({bookingsList.length})
          </button>
          <button
            onClick={() => setFilterTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              filterTab === 'active'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            ⚡ {t('householdBookings.filterActive')} ({bookingsList.filter((b) => b.status !== 'Completed').length})
          </button>
          <button
            onClick={() => setFilterTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              filterTab === 'completed'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            ✅ {t('householdBookings.filterCompleted')} ({bookingsList.filter((b) => b.status === 'Completed').length})
          </button>
        </div>

        <span className="text-xs text-slate-500 font-semibold px-2">
          Showing {filteredBookings.length} Doorstep Service Orders
        </span>
      </div>

      {/* Bookings Stream */}
      <div className="space-y-6">
        {filteredBookings.map((bk) => (
          <Card
            key={bk.id}
            borderVariant={bk.status === 'Completed' ? 'emerald' : 'indigo'}
            className="p-6 space-y-6 bg-white shadow-md border-indigo-100 rounded-3xl hover:shadow-lg transition-all"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-black text-lg text-slate-900">{bk.serviceName}</h3>
                  <Badge variant={bk.status === 'Completed' ? 'success' : 'primary'} className="font-extrabold">
                    {bk.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Order Ref: <strong className="text-slate-700">#{bk.id}</strong> • Scheduled: {bk.date}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[10px] uppercase text-slate-400 font-extrabold block">Total Service Fee</span>
                <span className="text-2xl font-black text-emerald-700">{bk.budget}</span>
              </div>
            </div>

            {/* Interactive Timeline Stepper */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Doorstep Progress Tracker
              </span>

              <div className="grid grid-cols-5 gap-1 relative">
                {[
                  { step: 1, label: 'Artisan Assigned' },
                  { step: 2, label: 'Artisan Departing' },
                  { step: 3, label: 'On The Way' },
                  { step: 4, label: 'Work In Progress' },
                  { step: 5, label: 'Service Completed' }
                ].map((s) => {
                  const isDone = bk.currentStep >= s.step;
                  const isCurrent = bk.currentStep === s.step;
                  return (
                    <div key={s.step} className="flex flex-col items-center text-center gap-1.5 z-10">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                          isDone
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                            : isCurrent
                            ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 animate-pulse'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isDone ? '✓' : s.step}
                      </div>
                      <span
                        className={`text-[10px] font-bold ${
                          isDone ? 'text-emerald-700' : isCurrent ? 'text-indigo-600' : 'text-slate-400'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Worker Details & Location Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/60 to-purple-50/60 border border-indigo-100 space-y-3">
                <span className="text-[10px] font-extrabold uppercase text-indigo-700 tracking-wider block">
                  Assigned Doorstep Worker
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={bk.workerAvatar}
                    alt={bk.workerName}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-200 shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-slate-900">{bk.workerName}</h4>
                      <span className="text-amber-700 font-extrabold text-xs">★ {bk.rating}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{bk.workerPhone}</p>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block mt-1">
                      Verified Work Passport & Anti-Scam ID
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    icon="message-square"
                    onClick={() => onNavigate && onNavigate('/messages')}
                    className="text-xs font-bold"
                  >
                    {t('householdBookings.callWorker')}
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block">
                    {t('householdBookings.otpInstruction')}
                  </span>
                  <p className="text-xs font-bold text-slate-900 mt-1">{bk.address}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  {/* Security OTP Toggle */}
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">{t('householdBookings.securityOtp')}</span>
                    {otpVisibleId === bk.id ? (
                      <span className="text-lg font-black tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                        {bk.otp}
                      </span>
                    ) : (
                      <button
                        onClick={() => setOtpVisibleId(bk.id)}
                        className="text-xs font-extrabold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        <Icon name="shield" className="w-3.5 h-3.5" />
                        {t('householdBookings.showOtp')}
                      </button>
                    )}
                  </div>

                  {bk.status !== 'Completed' && (
                    <Button
                      size="sm"
                      variant="primary"
                      icon="search"
                      onClick={() => setLiveMapBooking(bk)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                    >
                      {t('householdBookings.trackLive')}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                  {t('householdBookings.escrowSection')} <strong className="text-slate-900">{bk.escrowStatus}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  icon="shield"
                  onClick={() => onNavigate && onNavigate(`/household/escrow/${bk.id}`)}
                  className="font-bold border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  {t('householdBookings.viewEscrow')}
                </Button>

                {bk.status === 'Completed' ? (
                  <>
                    <Button
                      size="sm"
                      variant="primary"
                      icon="sparkles"
                      onClick={() => setRatingModalBooking(bk)}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold"
                    >
                      {reviewSubmittedId === bk.id ? t('householdBookings.reviewSubmitted') : t('householdBookings.rateWorker')}
                    </Button>

                    <Button
                      size="sm"
                      variant="secondary"
                      icon="zap"
                      onClick={() => {
                        const matched = ON_DEMAND_SERVICES.find(s => s.categoryKey === bk.category.toLowerCase()) || ON_DEMAND_SERVICES[0];
                        setActiveBookingService(matched);
                      }}
                      className="font-bold"
                    >
                      {t('householdDashboard.bookDoorstepPro')}
                    </Button>
                  </>
                ) : (
                  <Badge variant="amber" className="px-3 py-1">
                    En Route Dispatch Active
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* SHINING ULTRA-MODERN LIVE GPS MAP TRACKING MODAL */}
      {liveMapBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="w-full max-w-3xl bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-500/50 shadow-[0_0_60px_rgba(99,102,241,0.35)] space-y-6 animate-scale-up relative overflow-hidden">
            {/* Ambient Background Glow Orbs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-900/60 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/30 animate-logo-pulse">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Icon name="navigation" className="w-6 h-6 text-emerald-400 animate-pulse" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-indigo-300 tracking-tight">
                      {t('householdBookings.liveTracking')}
                    </h3>
                    <Badge variant="emerald" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 text-[10px] py-0.5 animate-pulse">
                      📡 5G Active Telemetry
                    </Badge>
                  </div>
                  <p className="text-xs text-indigo-200/80 font-medium">Real-time worker movement simulation to your doorstep</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Map Mode Selector */}
                <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
                  <button
                    onClick={() => setMapMode('cyber')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${mapMode === 'cyber' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
                  >
                    {t('householdBookings.mapMode')} Cyber
                  </button>
                  <button
                    onClick={() => setMapMode('satellite')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${mapMode === 'satellite' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
                  >
                    Satellite
                  </button>
                </div>

                <button
                  onClick={() => setLiveMapBooking(null)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Icon name="x" className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Glowing Map Canvas Viewport */}
            <div className={`relative h-72 rounded-3xl border-2 transition-all overflow-hidden flex flex-col justify-between p-5 text-white radar-grid-bg ${
              mapMode === 'satellite'
                ? 'bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 border-teal-500/50 shadow-inner'
                : 'bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 border-indigo-500/50 shadow-inner'
            }`}>
              {/* Rotating Radar Scanner Sweep Effect in background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 via-emerald-500/5 to-transparent rounded-full pointer-events-none animate-radar-sweep opacity-40" />

              {/* Top Telemetry Header Bar */}
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-2">
                <div className="bg-slate-900/90 backdrop-blur-xl p-3.5 rounded-2xl border border-indigo-500/30 shadow-xl space-y-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={liveMapBooking.workerAvatar}
                      alt={liveMapBooking.workerName}
                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-400 shadow-md"
                    />
                    <div>
                      <span className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-wider block">Technician En Route</span>
                      <h4 className="font-extrabold text-sm text-white leading-tight">{liveMapBooking.workerName}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-emerald-400 font-black text-xs bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
                      {t('householdBookings.eta')} {workerEta} Mins ({workerDistance} km away)
                    </span>
                    <span className="text-indigo-300 text-[10px] font-bold">🚀 24 km/h</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 backdrop-blur-xl p-3 rounded-2xl border border-slate-800 text-xs text-right space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Destination Address</span>
                  <p className="font-bold text-white max-w-[180px] text-[11px] truncate">🏠 {liveMapBooking.address}</p>
                  <span className="text-[10px] text-emerald-400 font-bold block">Sector 4 GT Boulevard</span>
                </div>
              </div>

              {/* Glowing Route Progress Stream */}
              <div className="relative z-10 my-auto px-6 space-y-2">
                <div className="relative h-4 w-full bg-slate-900/90 rounded-full border border-indigo-500/40 p-0.5 overflow-hidden shadow-inner">
                  {/* Glowing Animated Route Gradient Bar */}
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 via-purple-500 to-indigo-500 animate-route-flow transition-all duration-1000 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                    style={{ width: `${Math.min(98, Math.max(12, ((1.8 - workerDistance) / 1.8) * 100))}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-300 font-bold">
                  <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>🏭 Service Hub</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-indigo-950/90 px-3 py-1 rounded-lg border border-indigo-500/40 text-amber-300 font-black animate-pulse">
                    <span>🛵 {t('householdBookings.workerDistance')} ({workerDistance} km)</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>🏠 {t('householdProfile.doorstepAddress')}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Security & Quick Call Telemetry */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs bg-slate-900/95 backdrop-blur-xl p-3 rounded-2xl border border-indigo-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-300 font-medium">{t('householdBookings.securityOtp')}</span>
                  <span className="text-base font-black text-amber-300 bg-amber-950/80 px-3 py-0.5 rounded-lg border border-amber-600/50 tracking-widest shadow-inner">
                    {liveMapBooking.otp}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setDriverAlerted(true);
                      setTimeout(() => setDriverAlerted(false), 3000);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      driverAlerted
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black animate-bounce'
                        : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                    }`}
                  >
                    {driverAlerted ? t('householdBookings.driverAlerted') : t('householdBookings.alertDriver')}
                  </button>

                  <Button
                    size="sm"
                    variant="primary"
                    icon="message-square"
                    onClick={() => {
                      setLiveMapBooking(null);
                      onNavigate && onNavigate('/messages');
                    }}
                    className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-black border-none shadow-md shadow-cyan-400/20 text-xs px-3 py-1.5"
                  >
                    {t('householdBookings.callWorker')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Dismiss Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setLiveMapBooking(null)}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-3.5 rounded-2xl shadow-xl shadow-indigo-600/30 border border-indigo-400/30"
            >
              {t('common.close')}
            </Button>
          </div>
        </div>
      )}

      {/* RATING & TIP MODAL */}
      {ratingModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-5 animate-scale-up relative">
            <button
              onClick={() => setRatingModalBooking(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full mx-auto p-1 bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-black">
                ⭐
              </div>
              <h3 className="text-xl font-black text-slate-900">{t('householdBookings.ratingTitle')} {ratingModalBooking.workerName}</h3>
              <p className="text-xs text-slate-500 font-medium">{t('householdBookings.ratingDesc')}</p>
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setStarRating(star)}
                  className={`text-2xl transition-all ${star <= starRating ? 'scale-110 text-amber-500' : 'text-slate-300'}`}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">{t('householdBookings.addTip')}</label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 20, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTipAmount(amt)}
                    className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${
                      tipAmount === amt
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {amt === 0 ? 'No Tip' : `+₹${amt}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">{t('householdBookings.reviewComment')}</label>
              <textarea
                rows={2}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder={t('householdBookings.reviewPlaceholder')}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                setReviewSubmittedId(ratingModalBooking.id);
                setRatingModalBooking(null);
                alert(`Thank you! Rated ${starRating} Stars with ₹${tipAmount} tip for ${ratingModalBooking.workerName}.`);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              {t('householdBookings.submitReview')} (₹{tipAmount})
            </Button>
          </div>
        </div>
      )}

      {/* ON-DEMAND BOOKING MODAL */}
      {activeBookingService && (
        <OnDemandBookingModal
          service={activeBookingService}
          onClose={() => setActiveBookingService(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
