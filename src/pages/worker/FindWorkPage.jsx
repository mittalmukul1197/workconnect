import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { useEscrow } from '../../context/EscrowContext';
import { MOCK_OPPORTUNITIES, OPEN_WORK_OFFERS } from '../../data/mockData';
import { rankJobsForWorker } from '../../services/matchingEngine';

export const FindWorkPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { openChatWithUser } = useChat();
  const { agreeAsWorker } = useEscrow();

  const [activeTab, setActiveTab] = useState('ai-capacity'); // 'ai-capacity' | 'open-budget-offers'
  const [offersList, setOffersList] = useState(OPEN_WORK_OFFERS);

  // Authenticated Worker Profile Fallback
  const currentWorker = user || {
    id: 'usr-wrk-1',
    name: 'Sunita Sharma',
    profession: 'Master Tailor & Garment Designer',
    primarySkill: 'Stitching',
    skillsList: ['Stitching', 'Alterations', 'Embroidery'],
    city: 'Rajpura',
    experienceYears: 6,
    dailyCapacity: '30 pieces/day',
    expectedRate: '₹25 / piece',
    hasDisability: false,
    disabilityAccommodations: []
  };

  // Dynamically Rank Jobs for the Logged-In Worker
  const rankedOpportunities = rankJobsForWorker(currentWorker, MOCK_OPPORTUNITIES);
  const rankedOffers = rankJobsForWorker(currentWorker, offersList);

  const handleWorkerAccept = (offerId) => {
    agreeAsWorker(offerId || 'proj-501');
    setOffersList((prev) =>
      prev.map((off) => {
        if (off.id === offerId) {
          return {
            ...off,
            status: 'accepted',
            acceptedBy: {
              workerName: `${currentWorker.name} (You)`,
              rating: currentWorker.rating || 4.9,
              avatar: currentWorker.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
              acceptedTime: 'Just Now'
            }
          };
        }
        return off;
      })
    );
  };

  const handleWorkerDecline = (offerId) => {
    setOffersList((prev) =>
      prev.map((off) => (off.id === offerId ? { ...off, status: 'declined' } : off))
    );
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">{t('findWork.title')}</h1>
            <Badge variant="success">{t('findWork.badge')}</Badge>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {t('findWork.subtitle')} <strong className="text-slate-900">{currentWorker.name}</strong> ({currentWorker.profession || currentWorker.primarySkill || 'Artisan'})
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl text-xs shadow-xs">
          <button
            onClick={() => setActiveTab('ai-capacity')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'ai-capacity'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('findWork.aiTab')} ({rankedOpportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('open-budget-offers')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'open-budget-offers'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('findWork.budgetTab')} ({rankedOffers.filter((o) => o.status === 'pending').length} {t('findWork.open')})
          </button>
        </div>
      </div>

      {/* AI CAPACITY & SKILL MATCHED OPPORTUNITIES */}
      {activeTab === 'ai-capacity' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-indigo-50 border border-emerald-200 text-xs text-slate-800 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2 font-medium">
              <Icon name="sparkles" className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {t('findWork.aiMatchedInfo')} ({currentWorker.primarySkill || 'Trade'} • {currentWorker.dailyCapacity || 'Capacity'} • {currentWorker.city || 'Location'}).
              </span>
            </div>
            {currentWorker.hasDisability && (
              <Badge variant="purple" className="text-[10px] shrink-0">{t('findWork.pwdFilter')}</Badge>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {rankedOpportunities.map((opp, idx) => {
              const match = opp.match || {};
              const isBest = idx === 0;

              return (
                <Card
                  key={opp.id}
                  borderVariant={isBest ? 'emerald' : 'indigo'}
                  className="p-6 space-y-4 bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-base text-slate-900">{opp.title}</h3>
                        <Badge variant={isBest ? 'success' : 'indigo'}>{match.totalScore}% {t('findWork.inclusivePreference')}</Badge>
                        {match.isInclusivePreference && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                            {t('findWork.inclusiveWorkplace')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Posted by <strong className="text-slate-800">{opp.businessName}</strong> • {opp.city} ({opp.distanceKm} km away) • Quota: <strong className="text-indigo-700">{opp.quota}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('findWork.payRate')}</span>
                      <span className="text-lg font-black text-emerald-700">{opp.budgetPerUnit}</span>
                    </div>
                  </div>

                  {/* Why Recommended Reasons */}
                  {match.reasons && match.reasons.length > 0 && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t('findWork.whyRecommended')}</span>
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {match.reasons.map((r, i) => (
                          <span key={i} className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                            <Icon name="check-circle" className="w-3 h-3 text-emerald-600" />
                            <span>{r}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 font-medium">{t('findWork.deadline')} <strong className="text-slate-800">{opp.deadlineDays} {t('findWork.daysLabel')}</strong></span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        icon="message-square"
                        onClick={() => openChatWithUser({
                          id: 'usr-bus-1',
                          name: opp.businessName,
                          role: 'business',
                          profession: opp.title
                        }, onNavigate)}
                      >
                        {t('findWork.messageEmployer')}
                      </Button>
                      <Button size="sm" variant="primary" icon="check" onClick={() => onNavigate('/worker/projects')}>
                        {t('findWork.acceptWork')}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* OPEN BUDGET OFFERS MARKETPLACE */}
      {activeTab === 'open-budget-offers' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <Icon name="sparkles" className="w-4 h-4 text-emerald-600" />
              <span>{t('findWork.budgetOffersInfo')}</span>
            </div>
          </div>

          <div className="space-y-4">
            {rankedOffers.map((opp) => {
              const match = opp.match || {};
              return (
                <Card
                  key={opp.id}
                  borderVariant={
                    opp.status === 'accepted' ? 'emerald' : opp.status === 'declined' ? 'rose' : 'indigo'
                  }
                  className="p-6 space-y-4 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-base text-slate-900">{opp.title}</h3>
                        <Badge variant="indigo">{match.totalScore}% {t('findWork.inclusivePreference')}</Badge>
                        <Badge variant="primary">{opp.skillRequired}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {t('findWork.postedBy')} <strong className="text-slate-800">{opp.requesterName}</strong> • {opp.city} ({opp.area}) • {t('findWork.urgency')} <span className="text-amber-700 font-bold">{opp.urgency}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('findWork.offeredBudget')}</span>
                      <span className="text-lg font-black text-emerald-700">{opp.offeredBudget}</span>
                    </div>
                  </div>

                  {opp.notes && (
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 italic">
                      "{opp.notes}"
                    </p>
                  )}

                  {/* Worker Choice Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="text-xs text-slate-600">
                      {opp.status === 'accepted' ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                          <Icon name="check-circle" className="w-4 h-4 text-emerald-600" /> {t('findWork.accepted')}
                        </span>
                      ) : opp.status === 'declined' ? (
                        <span className="text-rose-700 font-medium">{t('findWork.declined')}</span>
                      ) : (
                        <span>{t('findWork.reviewAndAccept')}</span>
                      )}
                    </div>

                    {opp.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          icon="message-square"
                          onClick={() => openChatWithUser({
                            id: opp.requesterId || 'usr-bus-1',
                            name: opp.requesterName || 'Crafted Threads Boutique',
                            role: 'business',
                            profession: opp.title || 'Hirer'
                          }, onNavigate)}
                        >
                          {t('findWork.messageHirer')}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleWorkerDecline(opp.id)}
                          className="text-rose-600 hover:bg-rose-50"
                        >
                          {t('findWork.decline')}
                        </Button>
                        <Button
                          size="sm"
                          variant="primary"
                          icon="check"
                          onClick={() => handleWorkerAccept(opp.id)}
                        >
                          {t('findWork.accept')}
                        </Button>
                      </div>
                    )}

                    {opp.status === 'accepted' && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          icon="message-square"
                          onClick={() => openChatWithUser({
                            id: opp.requesterId || 'usr-bus-1',
                            name: opp.requesterName || 'Crafted Threads Boutique',
                            role: 'business',
                            profession: opp.title || 'Hirer'
                          }, onNavigate)}
                        >
                          {t('findWork.messageHirer')}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          icon="arrow-right"
                          onClick={() => onNavigate('/worker/projects')}
                        >
                          {t('findWork.viewProject')}
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
