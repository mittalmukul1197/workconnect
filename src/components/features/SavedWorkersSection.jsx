import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Icon } from '../common/Icon';

export const SavedWorkersSection = ({ onNavigate, onRebook }) => {
  const [favoriteWorkers, setFavoriteWorkers] = useState([
    {
      id: 'wrk-101',
      name: 'Manish Kumar',
      trade: 'Senior Electrician & Wiring Master',
      phone: '+91 98765 44433',
      rating: 4.9,
      completedJobsForUser: 4,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      badge: 'Favorite Technician',
      locality: 'Model Town, Rajpura',
      rate: '₹399 / visit'
    },
    {
      id: 'wrk-102',
      name: 'Ramesh Singh',
      trade: 'Plumbing & Bathroom Fitting Specialist',
      phone: '+91 98765 88811',
      rating: 4.85,
      completedJobsForUser: 3,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      badge: 'Top Rated Plumber',
      locality: 'Sector 4, Rajpura',
      rate: '₹349 / visit'
    },
    {
      id: 'wrk-103',
      name: 'Sunita Sharma',
      trade: 'Master Tailor & Suit Alterations',
      phone: '+91 98765 22211',
      rating: 4.95,
      completedJobsForUser: 6,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      badge: 'Master Artisan',
      locality: 'Model Town, Rajpura',
      rate: '₹25 / piece'
    }
  ]);

  const [activeCallingWorker, setActiveCallingWorker] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Icon name="heart" className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>My Favorite Household Artisans</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">Rehire verified local trade pros who have previously served your doorstep</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favoriteWorkers.map((wrk) => (
          <Card key={wrk.id} borderVariant="indigo" className="p-5 space-y-4 bg-white shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start gap-3">
              <img
                src={wrk.avatar}
                alt={wrk.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-200 shadow-xs"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-extrabold text-sm text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                    {wrk.name}
                  </h3>
                  <span className="text-amber-700 font-extrabold text-xs flex items-center gap-0.5 shrink-0">
                    ★ {wrk.rating}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">{wrk.trade}</p>
                <Badge variant="indigo" className="text-[9px] mt-1 bg-indigo-50 text-indigo-700 border-indigo-200">
                  {wrk.completedJobsForUser} Doorstep Visits Completed
                </Badge>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Standard Rate:</span>
              <span className="text-emerald-700">{wrk.rate}</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <Button
                size="sm"
                variant="outline"
                icon="phone"
                onClick={() => setActiveCallingWorker(wrk)}
                className="text-[11px] px-2 py-1.5"
                title="Call Worker"
              >
                Call
              </Button>
              <Button
                size="sm"
                variant="outline"
                icon="message-square"
                onClick={() => onNavigate && onNavigate('/messages')}
                className="text-[11px] px-2 py-1.5"
                title="Chat Worker"
              >
                Chat
              </Button>
              <Button
                size="sm"
                variant="primary"
                icon="zap"
                onClick={() => onRebook && onRebook(wrk)}
                className="text-[11px] px-2 py-1.5 bg-indigo-600 hover:bg-indigo-700 shadow-xs"
              >
                Re-Hire
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Simulated Call Modal */}
      {activeCallingWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 to-indigo-950 text-white rounded-3xl p-6 border border-indigo-500/40 shadow-2xl text-center space-y-6 animate-scale-up">
            <div className="w-20 h-20 rounded-full mx-auto p-1 bg-gradient-to-tr from-indigo-500 to-emerald-400 animate-pulse">
              <img
                src={activeCallingWorker.avatar}
                alt={activeCallingWorker.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Calling Local Artisan...</span>
              <h3 className="text-xl font-black text-white">{activeCallingWorker.name}</h3>
              <p className="text-xs text-slate-400">{activeCallingWorker.phone}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-emerald-400 font-semibold">
              🔊 Live WorkConnect VoIP Doorstep Dispatch Line Connected
            </div>

            <Button
              variant="secondary"
              fullWidth
              onClick={() => setActiveCallingWorker(null)}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold border-none"
            >
              End Call
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
