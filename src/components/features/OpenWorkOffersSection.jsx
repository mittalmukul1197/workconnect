import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Icon } from '../common/Icon';
import { SectionHeading } from '../common/SectionHeading';
import { WorkConnectEscrowVault } from './WorkConnectEscrowVault';
import { OPEN_WORK_OFFERS } from '../../data/mockData';

export const OpenWorkOffersSection = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [offers, setOffers] = useState(OPEN_WORK_OFFERS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeEscrowOffer, setActiveEscrowOffer] = useState(null);

  // Form State for User submitting requirement & budget
  const [title, setTitle] = useState('');
  const [skillRequired, setSkillRequired] = useState('Electrician');
  const [offeredBudget, setOfferedBudget] = useState('₹600');
  const [cityArea, setCityArea] = useState('Rajpura, Sector 4');
  const [urgency, setUrgency] = useState('Immediate (< 1 hr)');
  const [notes, setNotes] = useState('');
  const [postedSuccessAlert, setPostedSuccessAlert] = useState(false);
  const [isSimulatingAccept, setIsSimulatingAccept] = useState(false);

  const handlePostOffer = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newOffer = {
      id: `off-${Date.now()}`,
      title: title.trim(),
      requesterName: 'You (Local Client/Business)',
      requesterRole: 'Requester',
      skillRequired,
      offeredBudget: offeredBudget.startsWith('₹') ? offeredBudget : `₹${offeredBudget}`,
      unit: 'custom budget offer',
      city: cityArea.split(',')[0] || 'Rajpura',
      area: cityArea,
      urgency,
      postedTime: 'Just Now',
      status: 'pending',
      notes: notes || 'Budget work requirement posted directly by client.'
    };

    setOffers([newOffer, ...offers]);
    setPostedSuccessAlert(true);
    setTitle('');
    setNotes('');

    setTimeout(() => {
      setPostedSuccessAlert(false);
    }, 4500);
  };

  const handleAcceptOffer = (offerId) => {
    setIsSimulatingAccept(true);
    setTimeout(() => {
      setOffers((prev) =>
        prev.map((o) =>
          o.id === offerId
            ? {
                ...o,
                status: 'accepted',
                acceptedBy: {
                  workerName: 'Sunita Sharma (Master Tailor)',
                  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
                  acceptedTime: 'Just Now'
                }
              }
            : o
        )
      );
      setIsSimulatingAccept(false);
    }, 600);
  };

  const handleDeclineOffer = (offerId) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'declined' } : o))
    );
  };

  const filteredOffers = offers.filter((o) => {
    if (activeFilter === 'pending') return o.status === 'pending';
    if (activeFilter === 'accepted') return o.status === 'accepted';
    return true;
  });

  const skillsList = [
    'Electrician',
    'Plumber',
    'Carpenter',
    'Tailor & Stitching',
    'Daily Labour',
    'Painter & Waterproofing',
    'Mason & Civil',
    'Welder & Fabricator',
    'AC & Appliance Repair',
    'Salon & Personal Care'
  ];

  return (
    <section id="budget-offers-section" className="space-y-8 py-8 animate-fade-in text-slate-900">
      <SectionHeading
        badge="REVERSE WORKPLACE MARKETPLACE"
        title={t('offers.title')}
        subtitle={t('offers.subtitle')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form to Post Work & Budget Offer (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card borderVariant="indigo" className="p-6 space-y-5 bg-white shadow-md">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Icon name="plus" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{t('offers.postNewOffer')}</h3>
                <p className="text-[11px] text-slate-500">{t('offers.subtitle')}</p>
              </div>
            </div>

            {postedSuccessAlert && (
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 space-y-1 animate-scale-up">
                <div className="flex items-center gap-2 font-bold text-indigo-700">
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
                  <span>Work Requirement Posted Successfully!</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Your custom budget offer is live. Workers can now review and accept in real time.
                </p>
              </div>
            )}

            <form onSubmit={handlePostOffer} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('offers.userNeeds')} *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Need 2 Electricians for Switchboard Rewiring"
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('common.details')} *</label>
                  <select
                    value={skillRequired}
                    onChange={(e) => setSkillRequired(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                  >
                    {skillsList.map((sk) => (
                      <option key={sk} value={sk}>{sk}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('offers.offeredBudget')} *</label>
                  <input
                    type="text"
                    required
                    value={offeredBudget}
                    onChange={(e) => setOfferedBudget(e.target.value)}
                    placeholder="e.g. ₹600 or ₹30/pc"
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-emerald-700 font-bold placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('common.area')} *</label>
                  <input
                    type="text"
                    value={cityArea}
                    onChange={(e) => setCityArea(e.target.value)}
                    placeholder="e.g. Rajpura, Sector 4"
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Urgency</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Immediate (< 1 hr)">⚡ Immediate (&lt; 1 hr)</option>
                    <option value="Today Slot">📅 Today Slot</option>
                    <option value="Within 2-3 Days">🗓️ Within 2-3 Days</option>
                  </select>
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" icon="plus" fullWidth>
                {t('offers.postNewOffer')}
              </Button>
            </form>
          </Card>
        </div>

        {/* Right Column: Active Offers Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Icon name="briefcase" className="w-4 h-4 text-indigo-600" />
              <span>{t('offers.title')}</span>
            </h4>

            <div className="flex items-center gap-1 text-xs bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${activeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {t('common.viewAll')} ({offers.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('pending')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${activeFilter === 'pending' ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {t('offers.statusWaiting')} ({offers.filter((o) => o.status === 'pending').length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('accepted')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${activeFilter === 'accepted' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {t('offers.statusAccepted')} ({offers.filter((o) => o.status === 'accepted').length})
              </button>
            </div>
          </div>

          <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
            {filteredOffers.map((offer) => (
              <Card
                key={offer.id}
                borderVariant={
                  offer.status === 'accepted' ? 'emerald' : offer.status === 'declined' ? 'rose' : 'amber'
                }
                className="p-5 space-y-4 bg-white shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-slate-900">{offer.title}</h4>
                      <Badge variant="indigo">{offer.skillRequired}</Badge>
                      {offer.status === 'pending' && (
                        <Badge variant="amber" className="bg-amber-50 text-amber-800 border-amber-200">
                          ⏳ Waiting for Worker Acceptance
                        </Badge>
                      )}
                      {offer.status === 'accepted' && (
                        <Badge variant="emerald" className="bg-emerald-50 text-emerald-800 border-emerald-200">
                          ✅ Accepted by {offer.acceptedBy?.workerName || 'Worker'}
                        </Badge>
                      )}
                      {offer.status === 'declined' && (
                        <Badge variant="rose" className="bg-rose-50 text-rose-800 border-rose-200">
                          ❌ Declined
                        </Badge>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {t('offers.postedBy')} <strong className="text-slate-800">{offer.requesterName}</strong> • {offer.city} ({offer.area})
                    </p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('offers.offeredBudget')}</span>
                    <span className="text-lg font-black text-emerald-700">{offer.offeredBudget}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="emerald" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      🛡️ Platform Escrow Protected
                    </Badge>
                    <span className="text-[11px] text-slate-500 font-medium">Dual-Approval Required</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {offer.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeclineOffer(offer.id)}
                      >
                        {t('offers.declineButton')}
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="primary"
                      icon="shield"
                      onClick={() => onNavigate && onNavigate(`/household/escrow/${offer.id}`)}
                    >
                      Manage Escrow & Sign Deal
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
