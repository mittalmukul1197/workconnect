import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { OnDemandBookingModal } from '../../components/common/OnDemandBookingModal';
import { OpenWorkOffersSection } from '../../components/features/OpenWorkOffersSection';
import { ON_DEMAND_SERVICES } from '../../data/mockData';

export const HouseholdDashboard = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [activeBookingService, setActiveBookingService] = useState(null);

  const householdUser = {
    name: user?.name || 'Rahul Sharma',
    phone: user?.phone || '+91 98765 22222',
    area: user?.area || user?.city || 'Model Town, Rajpura',
    city: user?.city || 'Rajpura'
  };

  const activeBookings = [
    {
      id: 'bk-101',
      serviceName: 'Electrician (Switchboard & Fan Repair)',
      workerName: 'Manish Kumar',
      workerPhone: '+91 98765 44433',
      rating: 4.9,
      status: 'Assigned & On the Way',
      eta: '12 Mins',
      budget: '₹450',
      time: 'Today, 2:30 PM'
    },
    {
      id: 'bk-102',
      serviceName: 'Plumber (Tap & Sink Fitting)',
      workerName: 'Ramesh Singh',
      workerPhone: '+91 98765 88811',
      rating: 4.8,
      status: 'Work Completed',
      eta: 'Completed',
      budget: '₹350',
      time: 'Yesterday'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-900">
      {/* Welcome Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-6 rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-white to-emerald-50 shadow-sm overflow-hidden">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 truncate">
              {t('business.welcome')}, {householdUser.name} 👋
            </h1>
            <Badge variant="indigo" className="shrink-0">Household Client</Badge>
          </div>
          <p className="text-xs text-slate-600 font-medium flex items-center gap-2 pt-0.5 flex-wrap">
            <span>📍 {householdUser.area}</span>
            <span>•</span>
            <span>📞 {householdUser.phone}</span>
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto shrink-0">
          <Button
            size="md"
            variant="primary"
            icon="sparkles"
            onClick={() => setActiveBookingService(ON_DEMAND_SERVICES[0])}
            className="w-full sm:w-auto shadow-md shadow-indigo-600/20 whitespace-nowrap"
          >
            Book Trade Service
          </Button>
          <Button
            size="md"
            variant="secondary"
            icon="plus"
            onClick={() => {
              const el = document.getElementById('budget-offers-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto whitespace-nowrap"
          >
            + Post Custom Offer
          </Button>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Bookings" value="1" subtext="Worker en route (ETA 12m)" icon="clock" variant="primary" />
        <StatCard title="Completed Services" value="14" subtext="100% satisfaction rate" icon="check-circle" variant="emerald" />
        <StatCard title="Posted Budget Offers" value="3" subtext="2 accepted by workers" icon="plus" variant="amber" />
        <StatCard title="Favorite Workers" value="5" subtext="Verified local pros" icon="users" variant="sky" />
      </div>

      {/* QUICK ON-DEMAND DOORSTEP SERVICES GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">{t('landing.onDemandTitle')}</h2>
            <p className="text-xs text-slate-500 font-medium">{t('landing.onDemandSubtitle')}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('/household/bookings')}>
            {t('common.viewAll')} →
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ON_DEMAND_SERVICES.slice(0, 8).map((service) => (
            <Card
              key={service.id}
              borderVariant="indigo"
              onClick={() => setActiveBookingService(service)}
              className="p-4 space-y-3 bg-white hover:border-indigo-400 cursor-pointer transition-all shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-indigo-100 shadow-xs">
                  <Icon name={service.icon} className="w-5 h-5" />
                </div>
                <Badge variant="success" className="text-[9px]">Online</Badge>
              </div>

              <div>
                <h3 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">{service.name}</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">{service.startingPrice} / {service.unit}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-indigo-600">
                <span>Book Now</span>
                <span>→</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ACTIVE BOOKINGS FEED */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900">Active Doorstep Service Bookings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeBookings.map((bk) => (
            <Card key={bk.id} borderVariant={bk.status.includes('Way') ? 'indigo' : 'emerald'} className="p-5 space-y-4 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{bk.serviceName}</h3>
                  <p className="text-[11px] text-slate-500">{bk.time} • Ref: #{bk.id}</p>
                </div>
                <Badge variant={bk.status.includes('Way') ? 'primary' : 'success'}>
                  {bk.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-xs">
                    {bk.workerName[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{bk.workerName}</h4>
                    <p className="text-[10px] text-slate-500">★ {bk.rating} • Verified Local Pro</p>
                  </div>
                </div>
                <span className="font-black text-emerald-700 text-sm">{bk.budget}</span>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-slate-500 font-medium">ETA: <strong className="text-indigo-600 font-bold">{bk.eta}</strong></span>
                <Button size="sm" variant="outline" icon="phone">
                  Call Worker ({bk.workerPhone})
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* REVERSE BUDGET WORK OFFERS SECTION FOR HOUSEHOLD CLIENT */}
      <OpenWorkOffersSection onNavigate={onNavigate} />

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
