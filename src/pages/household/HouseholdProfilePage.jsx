import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';

export const HouseholdProfilePage = ({ onNavigate }) => {
  const { user } = useAuth();

  const household = {
    name: user?.name || 'Rahul Sharma',
    phone: user?.phone || '+91 98765 22222',
    email: user?.email || 'rahul.sharma@demo.com',
    area: user?.area || user?.city || 'Model Town, Sector 4, Rajpura, Punjab',
    city: user?.city || 'Rajpura',
    idVerified: 'Verified Household Account (Aadhaar KYC Certified)',
    homeShieldActive: true,
    activeBookingsCount: 1,
    completedBookingsCount: 14
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in text-slate-900 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 text-white shadow-xl border-2 animate-shining-border">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-teal-400 to-emerald-400 p-0.5 shadow-lg shadow-cyan-400/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300 font-black text-2xl">
              {household.name.charAt(0)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white">{household.name}</h1>
              <Badge variant="emerald" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 text-xs">
                🏠 Verified Household Client
              </Badge>
            </div>
            <p className="text-xs text-cyan-200/80 font-semibold">📍 {household.area}</p>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          icon="clock"
          onClick={() => onNavigate('/household/bookings')}
          className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 text-slate-950 font-black shadow-lg shadow-cyan-400/30 border border-cyan-200 text-xs px-5 py-2.5 rounded-2xl shrink-0"
        >
          View Active Bookings
        </Button>
      </div>

      {/* Platform Fixed Credential Lock Bar */}
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-900 text-xs font-semibold flex items-center gap-3 shadow-xs">
        <Icon name="lock" className="w-5 h-5 text-indigo-600 shrink-0" />
        <p className="text-[11px] leading-relaxed text-indigo-950">
          <strong className="font-extrabold text-indigo-900">Authenticated Platform Identity:</strong> Household contact information and verified doorstep service delivery addresses are locked by WorkConnect to guarantee artisan safety and scam-free escrow billing.
        </p>
      </div>

      <Card borderVariant="indigo" className="p-6 sm:p-8 space-y-6 bg-white shadow-md rounded-3xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Icon name="home" className="w-5 h-5 text-indigo-600" />
            <span>Household Account Credentials</span>
          </h2>
          <Badge variant="indigo" className="text-xs font-extrabold px-3 py-1">
            {household.idVerified}
          </Badge>
        </div>

        {/* Fixed Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Full Account Holder Name</span>
            <p className="font-extrabold text-slate-900 text-sm">{household.name}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Verified Phone Number</span>
            <p className="font-extrabold text-indigo-700 text-sm">{household.phone}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Email Address</span>
            <p className="font-extrabold text-slate-900">{household.email}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Primary Service Location / City</span>
            <p className="font-extrabold text-slate-900">{household.city}, Punjab</p>
          </div>

          <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Verified Doorstep Delivery Address</span>
            <p className="font-extrabold text-slate-900">{household.area}</p>
          </div>
        </div>

        {/* Protection Shield & Security Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider block">WorkConnect HomeCare Shield</span>
            <h4 className="font-black text-sm text-emerald-950">🛡️ 30-Day Re-Work Coverage Active</h4>
            <p className="text-xs text-slate-600">
              All doorstep services booked under this account include 30-day ₹0 re-visit guarantees and dual-sign-off escrow vault protection.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
            <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-wider block">Doorstep Security OTP</span>
            <h4 className="font-black text-sm text-white">🔒 Anti-Scam Verification</h4>
            <p className="text-xs text-slate-300">
              Every dispatched artisan requires a 4-digit security OTP before starting work at your address.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
