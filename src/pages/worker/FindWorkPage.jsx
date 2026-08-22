import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { useChat } from '../../context/ChatContext';
import { MOCK_OPPORTUNITIES, OPEN_WORK_OFFERS } from '../../data/mockData';

export const FindWorkPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('open-budget-offers'); // 'open-budget-offers' | 'ai-capacity'
  const [offersList, setOffersList] = useState(OPEN_WORK_OFFERS);
  const { openChatWithUser } = useChat();

  const handleWorkerAccept = (offerId) => {
    setOffersList((prev) =>
      prev.map((off) => {
        if (off.id === offerId) {
          return {
            ...off,
            status: 'accepted',
            acceptedBy: {
              workerName: 'You (Worker)',
              rating: 4.9,
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Work Discovery Marketplace</h1>
            <Badge variant="success">Choice-Based Matching</Badge>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Browse user-submitted budget offers & capacity matched work orders. Choose which orders to accept!
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl text-xs shadow-xs">
          <button
            onClick={() => setActiveTab('open-budget-offers')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'open-budget-offers'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            User Budget Offers ({offersList.filter((o) => o.status === 'pending').length} Open)
          </button>
          <button
            onClick={() => setActiveTab('ai-capacity')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'ai-capacity'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Capacity Matched ({MOCK_OPPORTUNITIES.length})
          </button>
        </div>
      </div>

      {/* OPEN BUDGET OFFERS MARKETPLACE */}
      {activeTab === 'open-budget-offers' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <Icon name="sparkles" className="w-4 h-4 text-emerald-600" />
              <span>Users have posted their requirements with custom budgets. You have full freedom to accept or decline.</span>
            </div>
          </div>

          <div className="space-y-4">
            {offersList.map((opp) => (
              <Card
                key={opp.id}
                borderVariant={
                  opp.status === 'accepted' ? 'emerald' : opp.status === 'declined' ? 'rose' : 'indigo'
                }
                className="p-6 space-y-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-slate-900">{opp.title}</h3>
                      <Badge variant="indigo">{opp.skillRequired}</Badge>
                      {opp.status === 'pending' && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                          🟡 Open for Acceptance
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Posted by <strong className="text-slate-800">{opp.requesterName}</strong> • {opp.city} ({opp.area}) • Urgency: <span className="text-amber-700 font-bold">{opp.urgency}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Offered Budget</span>
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
                        <Icon name="check-circle" className="w-4 h-4 text-emerald-600" /> You accepted this work order!
                      </span>
                    ) : opp.status === 'declined' ? (
                      <span className="text-rose-700 font-medium">You declined this offer.</span>
                    ) : (
                      <span>Review requirement and accept to confirm booking.</span>
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
                        Message Hirer
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleWorkerDecline(opp.id)}
                        className="text-rose-600 hover:bg-rose-50"
                      >
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        variant="primary"
                        icon="check"
                        onClick={() => handleWorkerAccept(opp.id)}
                      >
                        Accept Offer
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
                        Message Hirer
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        icon="arrow-right"
                        onClick={() => onNavigate('/worker/projects')}
                      >
                        View Active Project
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* AI CAPACITY MATCHED OPPORTUNITIES */}
      {activeTab === 'ai-capacity' && (
        <div className="space-y-4">
          {MOCK_OPPORTUNITIES.map((opp) => (
            <Card key={opp.id} borderVariant="emerald" className="p-6 space-y-4 bg-white shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900">{opp.title}</h3>
                    <Badge variant="success">{opp.matchScore}% Match</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{opp.businessName} • {opp.city} ({opp.distanceKm} km)</p>
                </div>
                <span className="text-base font-black text-emerald-700">{opp.budgetPerUnit}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">Quota: {opp.quota} • Deadline: {opp.deadlineDays} Days</span>
                <Button size="sm" variant="primary" icon="check" onClick={() => onNavigate('/worker/projects')}>
                  Accept Work Order
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
