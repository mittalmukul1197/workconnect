import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { OnDemandBookingModal } from '../../components/common/OnDemandBookingModal';
import { ON_DEMAND_SERVICES } from '../../data/mockData';

export const HouseholdBookingsPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeBookingService, setActiveBookingService] = useState(null);

  const bookingsList = [
    {
      id: 'bk-101',
      serviceName: 'Electrician (Switchboard Rewiring)',
      category: 'Electrician',
      workerName: 'Manish Kumar',
      workerPhone: '+91 98765 44433',
      rating: 4.9,
      status: 'Assigned & On the Way',
      date: 'Today, 2:30 PM',
      budget: '₹450',
      address: user?.address || 'Model Town, Sector 4, Rajpura'
    },
    {
      id: 'bk-102',
      serviceName: 'Plumber (Tap Leak & Pipe Repair)',
      category: 'Plumber',
      workerName: 'Ramesh Singh',
      workerPhone: '+91 98765 88811',
      rating: 4.8,
      status: 'Completed',
      date: '20 Aug 2026',
      budget: '₹350',
      address: user?.address || 'Model Town, Sector 4, Rajpura'
    },
    {
      id: 'bk-103',
      serviceName: 'Carpenter (Door Lock & Fitting)',
      category: 'Carpenter',
      workerName: 'Gurpreet Singh',
      workerPhone: '+91 98765 77722',
      rating: 4.9,
      status: 'Completed',
      date: '18 Aug 2026',
      budget: '₹500',
      address: user?.address || 'Model Town, Sector 4, Rajpura'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-indigo-200 bg-white shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Household Bookings & Orders</h1>
          <p className="text-xs text-slate-500 font-medium">Track active doorstep worker dispatches and service history</p>
        </div>

        <Button
          variant="primary"
          icon="plus"
          onClick={() => setActiveBookingService(ON_DEMAND_SERVICES[0])}
        >
          Book New Doorstep Service
        </Button>
      </div>

      <div className="space-y-4">
        {bookingsList.map((bk) => (
          <Card key={bk.id} borderVariant={bk.status === 'Completed' ? 'emerald' : 'indigo'} className="p-6 space-y-4 bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-900">{bk.serviceName}</h3>
                  <Badge variant={bk.status === 'Completed' ? 'success' : 'primary'}>{bk.status}</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Order Ref: #{bk.id} • Scheduled: {bk.date}</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase text-slate-400 font-bold block">{t('common.budget')}</span>
                <span className="text-lg font-black text-emerald-700">{bk.budget}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Assigned Local Worker</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{bk.workerName}</span>
                  <span className="text-amber-700 font-bold">★ {bk.rating}</span>
                </div>
                <p className="text-slate-500">{bk.workerPhone}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">{t('onDemand.step2')}</span>
                <p className="font-medium text-slate-800">{bk.address}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

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
