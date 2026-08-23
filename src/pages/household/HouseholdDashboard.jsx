import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { OnDemandBookingModal } from '../../components/common/OnDemandBookingModal';
import { HouseholdCostEstimator } from '../../components/features/HouseholdCostEstimator';
import { SavedWorkersSection } from '../../components/features/SavedWorkersSection';
import { ON_DEMAND_SERVICES } from '../../data/mockData';

export const HouseholdDashboard = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('doorstep'); // 'doorstep' | 'custom' | 'calculator' | 'favorites'
  const [activeBookingService, setActiveBookingService] = useState(null);
  const [homeShieldModalOpen, setHomeShieldModalOpen] = useState(false);
  const [passActivated, setPassActivated] = useState(true);

  // Household Custom Budget Posts State
  const [householdOffers, setHouseholdOffers] = useState([
    {
      id: 'h-off-1',
      title: 'Fix Main DB Electric Switchboard & Fan Regulator',
      category: 'Electrician',
      offeredBudget: '₹450',
      area: 'Model Town, Sector 4, Rajpura',
      urgency: 'Immediate (< 1 hr)',
      postedTime: '15 mins ago',
      status: 'pending', // 'pending' | 'accepted'
      notes: 'Main switchboard sparking in bedroom 2. Need certified electrician.'
    },
    {
      id: 'h-off-2',
      title: 'Kitchen Sink Drain Leakage & New Tap Install',
      category: 'Plumber',
      offeredBudget: '₹350',
      area: 'Model Town, Sector 4, Rajpura',
      urgency: 'Today Slot',
      postedTime: '2 hrs ago',
      status: 'accepted',
      acceptedBy: {
        name: 'Ramesh Singh (Plumber)',
        phone: '+91 98765 88811',
        rating: 4.85,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      notes: 'Bring Teflon tape and extra 0.5 inch PVC pipe coupling.'
    }
  ]);

  // Form State for posting custom household requirement
  const [reqTitle, setReqTitle] = useState('');
  const [reqCategory, setReqCategory] = useState('Electrician');
  const [reqBudget, setReqBudget] = useState('₹500');
  const [reqUrgency, setReqUrgency] = useState('Immediate (< 1 hr)');
  const [reqNotes, setReqNotes] = useState('');
  const [postAlert, setPostAlert] = useState(false);

  const householdUser = {
    name: user?.name || 'Rahul Sharma',
    phone: user?.phone || '+91 98765 22222',
    area: user?.area || user?.city || 'Model Town, Sector 4, Rajpura',
    city: user?.city || 'Rajpura'
  };

  const activeBookings = [
    {
      id: 'bk-101',
      serviceName: 'Electrician (Switchboard Rewiring)',
      workerName: 'Manish Kumar',
      workerPhone: '+91 98765 44433',
      rating: 4.9,
      status: 'Assigned & On the Way',
      eta: '12 Mins',
      budget: '₹450',
      time: 'Today, 2:30 PM'
    }
  ];

  const handlePostHouseholdRequirement = (e) => {
    e.preventDefault();
    if (!reqTitle.trim()) return;

    const newOffer = {
      id: `h-off-${Date.now()}`,
      title: reqTitle.trim(),
      category: reqCategory,
      offeredBudget: reqBudget.startsWith('₹') ? reqBudget : `₹${reqBudget}`,
      area: householdUser.area,
      urgency: reqUrgency,
      postedTime: 'Just Now',
      status: 'pending',
      notes: reqNotes || 'Direct household doorstep work requirement.'
    };

    setHouseholdOffers([newOffer, ...householdOffers]);
    setPostAlert(true);
    setReqTitle('');
    setReqNotes('');

    setTimeout(() => {
      setPostAlert(false);
    }, 4000);
  };

  const handleBookFromEstimator = (categoryObj, totalEstimatedRate) => {
    const matchedService = ON_DEMAND_SERVICES.find((s) => s.categoryKey === selectedCategoryKey(categoryObj.name)) || ON_DEMAND_SERVICES[0];
    setActiveBookingService({
      ...matchedService,
      startingPrice: `₹${totalEstimatedRate}`
    });
  };

  const selectedCategoryKey = (catName) => {
    if (catName.includes('Electrician')) return 'electrician';
    if (catName.includes('Plumbing')) return 'plumber';
    if (catName.includes('Carpenter')) return 'carpenter';
    if (catName.includes('Paint')) return 'painter';
    if (catName.includes('Heavy')) return 'labour';
    return 'electrician';
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-900 pb-12">
      {/* Ultra-High Contrast Greenish-Bluish Banner with Animated Shining Rainbow Gold Text */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 text-white shadow-2xl overflow-hidden border-2 animate-shining-border">
        {/* Glow ambient radial lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 via-cyan-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-slate-900/90 text-teal-300 border border-teal-400/50 text-xs py-1 px-3 rounded-xl font-black shadow-sm flex items-center gap-1.5">
                {t('householdDashboard.portalBadge')}
              </span>
              {passActivated && (
                <span className="bg-emerald-400 text-slate-950 text-xs py-1 px-3.5 rounded-full font-black shadow-md shadow-emerald-400/40 flex items-center gap-1.5 border border-emerald-300">
                  {t('householdDashboard.shieldBadge')}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm leading-snug">
              {t('householdDashboard.welcomeBack')} <span className="text-shining-gold-rainbow font-black drop-shadow-md">{householdUser.name}</span> 👋
            </h1>

            <p className="text-xs sm:text-sm text-cyan-100 font-extrabold flex items-center gap-3 flex-wrap pt-0.5">
              <span className="flex items-center gap-1 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
                📍 <span className="text-white">{householdUser.area}</span>
              </span>
              <span className="text-teal-400 font-black">•</span>
              <span className="flex items-center gap-1 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
                📞 <span className="text-white">{householdUser.phone}</span>
              </span>
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveBookingService(ON_DEMAND_SERVICES[0])}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-400/30 transition-all scale-100 hover:scale-105 active:scale-95 border border-cyan-200"
            >
              <Icon name="zap" className="w-4 h-4 text-slate-950" />
              <span>{t('householdDashboard.bookDoorstep')}</span>
            </button>

            <button
              onClick={() => setHomeShieldModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-400/30 transition-all scale-100 hover:scale-105 active:scale-95 border border-emerald-200"
            >
              <Icon name="shield" className="w-4 h-4 text-slate-950" />
              <span>{t('householdDashboard.shieldBtn')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('householdDashboard.statActive')} value="1" subtext={t('householdDashboard.statActiveSubtext')} icon="clock" variant="primary" />
        <StatCard title={t('householdDashboard.statCompleted')} value="14" subtext={t('householdDashboard.statCompletedSubtext')} icon="check-circle" variant="emerald" />
        <StatCard title={t('householdDashboard.statOffers')} value={householdOffers.length.toString()} subtext={t('householdDashboard.statOffersSubtext')} icon="plus" variant="amber" />
        <StatCard title={t('householdDashboard.statFavorites')} value="3" subtext={t('householdDashboard.statFavoritesSubtext')} icon="heart" variant="sky" />
      </div>

      {/* DEDICATED HOUSEHOLD NAVIGATION TABS WITH ELECTRIC GRADIENTS */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('doorstep')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'doorstep'
              ? 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 text-white shadow-md shadow-fuchsia-600/25'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Icon name="home" className="w-4 h-4" />
          <span>{t('householdDashboard.tabDoorstep')}</span>
        </button>

        <button
          onClick={() => setActiveTab('custom')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'custom'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/25'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Icon name="plus" className="w-4 h-4 text-cyan-400" />
          <span>{t('householdDashboard.tabCustom')}</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'calculator'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Icon name="calculator" className="w-4 h-4 text-teal-400" />
          <span>{t('householdDashboard.tabCalculator')}</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'favorites'
              ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md shadow-amber-500/25'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Icon name="heart" className="w-4 h-4 text-rose-400" />
          <span>{t('householdDashboard.tabFavorites')}</span>
        </button>
      </div>

      {/* TAB CONTENT 1: DOORSTEP SERVICES & ACTIVE DISPATCH */}
      {activeTab === 'doorstep' && (
        <div className="space-y-8 animate-fade-in">
          {/* Active Dispatch Live Preview Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-600 animate-ping" />
                <span>{t('householdDashboard.activeLive')}</span>
              </h2>
              <Button size="sm" variant="ghost" onClick={() => onNavigate('/household/bookings')}>
                {t('householdDashboard.manageBookings')}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBookings.map((bk) => (
                <Card key={bk.id} borderVariant="indigo" className="p-5 space-y-4 bg-gradient-to-br from-white via-slate-50 to-fuchsia-50/20 border-fuchsia-200 shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">{bk.serviceName}</h3>
                      <p className="text-[11px] text-slate-500">{bk.time} • Ref: #{bk.id}</p>
                    </div>
                    <Badge variant="primary" className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-black animate-pulse">
                      {t('householdDashboard.enRoute')} ({bk.eta})
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 text-xs shadow-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
                        alt={bk.workerName}
                        className="w-10 h-10 rounded-xl object-cover border border-fuchsia-300"
                      />
                      <div>
                        <h4 className="font-extrabold text-slate-900">{bk.workerName}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">★ {bk.rating} • {t('householdDashboard.verifiedElectrician')}</p>
                      </div>
                    </div>
                    <span className="font-black text-emerald-700 text-base">{bk.budget}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-600 font-medium">{t('householdDashboard.doorstepEta')} <strong className="text-fuchsia-700 font-black">{bk.eta}</strong></span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" icon="phone" onClick={() => alert(`Calling ${bk.workerName} at ${bk.workerPhone}`)}>
                        {t('householdDashboard.call')}
                      </Button>
                      <Button size="sm" variant="primary" icon="clock" onClick={() => onNavigate('/household/bookings')} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
                        {t('householdDashboard.trackLive')}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Doorstep Service Booking Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900">{t('landing.onDemandTitle')}</h2>
                <p className="text-xs text-slate-500 font-medium">{t('landing.onDemandSubtitle')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ON_DEMAND_SERVICES.map((service) => (
                <Card
                  key={service.id}
                  borderVariant="indigo"
                  onClick={() => setActiveBookingService(service)}
                  className="p-4 space-y-3 bg-white hover:border-fuchsia-400 cursor-pointer transition-all shadow-xs hover:shadow-md group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-fuchsia-600 group-hover:to-pink-600 group-hover:text-white transition-all border border-fuchsia-100 shadow-xs">
                      <Icon name={service.icon} className="w-5 h-5" />
                    </div>
                    <Badge variant="success" className="text-[9px]">{t('householdDashboard.verifiedPro')}</Badge>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-xs text-slate-900 group-hover:text-fuchsia-600 transition-colors line-clamp-1">
                      {service.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-semibold">{t('householdDashboard.from')} {service.startingPrice} / {service.unit}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-fuchsia-600">
                    <span>{t('householdDashboard.bookDoorstepPro')}</span>
                    <span>→</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: HOUSEHOLD CUSTOM BUDGET POSTING */}
      {activeTab === 'custom' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-5 space-y-4">
              <Card borderVariant="indigo" className="p-6 space-y-5 bg-white shadow-md border-cyan-200">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100">
                    <Icon name="plus" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">{t('householdDashboard.postOfferTitle')}</h3>
                    <p className="text-[11px] text-slate-500">{t('householdDashboard.postOfferDesc')}</p>
                  </div>
                </div>

                {postAlert && (
                  <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-900 space-y-1 animate-scale-up">
                    <div className="flex items-center gap-2 font-bold text-cyan-700">
                      <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
                      <span>{t('householdDashboard.offerLive')}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      {t('householdDashboard.offerLiveDesc')}
                    </p>
                  </div>
                )}

                <form onSubmit={handlePostHouseholdRequirement} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('householdDashboard.repairTitle')}</label>
                    <input
                      type="text"
                      required
                      value={reqTitle}
                      onChange={(e) => setReqTitle(e.target.value)}
                      placeholder={t('householdDashboard.repairTitlePlaceholder')}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('householdDashboard.tradeCategory')}</label>
                      <select
                        value={reqCategory}
                        onChange={(e) => setReqCategory(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Electrician">Electrician</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="Painter">Painter</option>
                        <option value="Tailor">Tailor</option>
                        <option value="Daily Labour">Daily Labour</option>
                        <option value="Appliance Repair">Appliance Repair</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('householdDashboard.offeredBudget')}</label>
                      <input
                        type="text"
                        required
                        value={reqBudget}
                        onChange={(e) => setReqBudget(e.target.value)}
                        placeholder="e.g. ₹400"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-emerald-700 font-extrabold focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('householdDashboard.requiredUrgency')}</label>
                    <select
                      value={reqUrgency}
                      onChange={(e) => setReqUrgency(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Immediate (< 1 hr)">⚡ Rapid Immediate (&lt; 1 hr)</option>
                      <option value="Today Slot">📅 Today Slot</option>
                      <option value="Tomorrow">🗓️ Tomorrow</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('householdDashboard.repairNotes')}</label>
                    <textarea
                      rows={2}
                      value={reqNotes}
                      onChange={(e) => setReqNotes(e.target.value)}
                      placeholder="e.g. Please bring 32A breaker & spare wire tape..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" icon="plus" fullWidth className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-md">
                    {t('householdDashboard.publishOffer')}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Household Offers List Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Icon name="briefcase" className="w-4 h-4 text-cyan-600" />
                  <span>{t('householdDashboard.myActiveOffers')}</span>
                </h3>
                <Badge variant="indigo" className="text-xs bg-cyan-50 text-cyan-700 border-cyan-200">{householdOffers.length} {t('householdDashboard.activePosts')}</Badge>
              </div>

              <div className="space-y-4">
                {householdOffers.map((off) => (
                  <Card key={off.id} borderVariant={off.status === 'accepted' ? 'emerald' : 'amber'} className="p-5 space-y-4 bg-white shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-sm text-slate-900">{off.title}</h4>
                          <Badge variant="indigo">{off.category}</Badge>
                          {off.status === 'pending' ? (
                            <Badge variant="amber" className="bg-amber-50 text-amber-800 border-amber-200">
                              {t('householdDashboard.waitingForWorker')}
                            </Badge>
                          ) : (
                            <Badge variant="emerald" className="bg-emerald-50 text-emerald-800 border-emerald-200">
                              {t('householdDashboard.acceptedByWorker')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          📍 {off.area} • Posted {off.postedTime}
                        </p>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('householdDashboard.offeredBudgetLabel')}</span>
                        <span className="text-lg font-black text-emerald-700">{off.offeredBudget}</span>
                      </div>
                    </div>

                    {off.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        💡 <strong>Notes:</strong> {off.notes}
                      </p>
                    )}

                    {off.acceptedBy && (
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs">
                        <div className="flex items-center gap-3">
                          <img src={off.acceptedBy.avatar} alt={off.acceptedBy.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-slate-900 block">{off.acceptedBy.name}</span>
                            <span className="text-[10px] text-slate-500">★ {off.acceptedBy.rating} Verified Local Pro</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" icon="phone" onClick={() => alert(`Calling ${off.acceptedBy.name}`)}>
                          {t('householdDashboard.callWorker')}
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: HOUSEHOLD COST ESTIMATOR */}
      {activeTab === 'calculator' && (
        <div className="animate-fade-in">
          <HouseholdCostEstimator onBookService={handleBookFromEstimator} />
        </div>
      )}

      {/* TAB CONTENT 4: SAVED HOUSEHOLD PROS */}
      {activeTab === 'favorites' && (
        <div className="animate-fade-in">
          <SavedWorkersSection
            onNavigate={onNavigate}
            onRebook={(wrk) => {
              const matchedService = ON_DEMAND_SERVICES.find(s => s.name.toLowerCase().includes(wrk.trade.split(' ')[1]?.toLowerCase() || 'electrician')) || ON_DEMAND_SERVICES[0];
              setActiveBookingService(matchedService);
            }}
          />
        </div>
      )}

      {/* HOME CARE PROTECTION SHIELD MODAL */}
      {homeShieldModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-teal-500/50 shadow-[0_0_50px_rgba(45,212,191,0.3)] space-y-6 animate-scale-up relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={() => setHomeShieldModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-400 to-emerald-500 p-0.5 shadow-lg shadow-teal-500/30">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Icon name="shield" className="w-7 h-7 text-cyan-300" />
                </div>
              </div>
              <div>
                <Badge variant="emerald" className="bg-teal-500/30 text-teal-200 border-teal-400/40 text-[10px] mb-1">
                  {t('householdDashboard.shieldModalBadge')}
                </Badge>
                <h3 className="text-xl font-black text-white">{t('householdDashboard.shieldModalTitle')}</h3>
                <p className="text-xs text-teal-100/80">{t('householdDashboard.shieldModalDesc')}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-teal-500/30 space-y-1.5">
                <div className="flex items-center gap-2 font-black text-cyan-300">
                  <span>{t('householdDashboard.guarantee30')}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {t('householdDashboard.guarantee30Desc')}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-black text-emerald-300">
                  <span>{t('householdDashboard.escrowProtect')}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {t('householdDashboard.escrowProtectDesc')}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-black text-amber-300">
                  <span>{t('householdDashboard.priorityConcierge')}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {t('householdDashboard.priorityConciergeDesc')}
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                setPassActivated(true);
                setHomeShieldModalOpen(false);
              }}
              className="bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-500 text-slate-950 font-black py-3.5 shadow-lg shadow-teal-500/30 border-none"
            >
              {t('householdDashboard.keepShieldActive')}
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
