import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Icon } from '../common/Icon';

export const SavedWorkersSection = ({ onNavigate, onRebook }) => {
  const { t } = useTranslation();
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
            <span>{t('savedWorkers.title')}</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">{t('savedWorkers.subtitle')}</p>
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
                  {t('savedWorkers.doorstepVisitsCompleted', { count: wrk.completedJobsForUser })}
                </Badge>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{t('savedWorkers.standardRate')}</span>
              <span className="text-emerald-700">{wrk.rate}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                size="sm"
                variant="outline"
                icon="message-square"
                onClick={() => onNavigate && onNavigate('/messages')}
                className="text-xs py-2 font-bold"
                title={t('savedWorkers.messageWorker')}
              >
                {t('savedWorkers.messageWorker')}
              </Button>
              <Button
                size="sm"
                variant="primary"
                icon="zap"
                onClick={() => onRebook && onRebook(wrk)}
                className="text-xs py-2 bg-indigo-600 hover:bg-indigo-700 shadow-xs font-bold"
              >
                {t('savedWorkers.reHire')}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
