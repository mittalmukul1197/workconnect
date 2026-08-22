import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { WorkConnectEscrowVault } from '../../components/features/WorkConnectEscrowVault';

export const HouseholdEscrowPage = ({ dealId = 'bk-101', onNavigate }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const dealDetailsMap = {
    'bk-101': {
      title: 'Electrician (Switchboard & Fan Rewiring)',
      category: 'Electrician',
      businessName: user?.name || 'Rahul Sharma (Household Client)',
      workerName: 'Manish Kumar (Master Electrician)',
      amount: '₹450',
      unitDetails: 'Electrician • Doorstep Service • Ref: bk-101'
    },
    'bk-102': {
      title: 'Plumber (Tap Leakage & Sink Fitting)',
      category: 'Plumber',
      businessName: user?.name || 'Rahul Sharma (Household Client)',
      workerName: 'Ramesh Singh (Plumber)',
      amount: '₹350',
      unitDetails: 'Plumber • Doorstep Service • Ref: bk-102'
    },
    'bk-103': {
      title: 'Carpenter (Door Lock & Fitting Repair)',
      category: 'Carpenter',
      businessName: user?.name || 'Rahul Sharma (Household Client)',
      workerName: 'Gurpreet Singh (Carpenter)',
      amount: '₹500',
      unitDetails: 'Carpenter • Doorstep Service • Ref: bk-103'
    },
    'h-off-1': {
      title: 'Fix Main DB Electric Switchboard & Fan Regulator',
      category: 'Electrician',
      businessName: user?.name || 'Rahul Sharma (Household Client)',
      workerName: 'Manish Kumar (Master Electrician)',
      amount: '₹450',
      unitDetails: 'Electrician • Custom Budget Offer • Ref: h-off-1'
    }
  };

  const currentDeal = dealDetailsMap[dealId] || {
    title: 'Doorstep Service Deal Sign-Off',
    category: 'Trade Service',
    businessName: user?.name || 'Rahul Sharma (Household Client)',
    workerName: 'Verified Local Technician',
    amount: '₹450',
    unitDetails: `Service Ref: ${dealId}`
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 pb-16 max-w-6xl mx-auto">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-500/30">
        <div className="space-y-1">
          <button
            onClick={() => onNavigate && onNavigate('/household/bookings')}
            className="flex items-center gap-1.5 text-xs font-extrabold text-cyan-300 hover:text-amber-300 transition-colors mb-2"
          >
            <span>← Back to My Household Bookings</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white">Full-Screen Platform Escrow Vault</h1>
            <Badge variant="emerald" className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              100% Anti-Scam Active
            </Badge>
          </div>
          <p className="text-xs text-indigo-200/80 font-medium">
            Spacious mutual agreement portal for dual sign-off and scam-free escrow settlement
          </p>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('/household/bookings')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 border border-emerald-300 transition-all scale-100 hover:scale-105 active:scale-95 shrink-0"
        >
          <Icon name="arrow-left" className="w-4 h-4 text-slate-950" />
          <span>Return to Bookings</span>
        </button>
      </div>

      {/* Full-Screen Escrow Component */}
      <WorkConnectEscrowVault
        dealId={dealId}
        dealTitle={currentDeal.title}
        businessName={currentDeal.businessName}
        workerName={currentDeal.workerName}
        amount={currentDeal.amount}
        unitDetails={currentDeal.unitDetails}
        onPaymentComplete={() => {
          setTimeout(() => {
            if (onNavigate) onNavigate('/household/bookings');
          }, 2500);
        }}
      />
    </div>
  );
};
