import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';

export const BusinessProfile = ({ onNavigate }) => {
  const { user } = useAuth();

  const business = {
    name: user?.name || 'Crafted Threads Boutique',
    contactPerson: user?.contactPerson || 'Anjali Sharma (Proprietor)',
    industry: user?.industry || 'Tailoring & Apparel Manufacturing',
    phone: user?.phone || '+91 98765 43210',
    email: user?.email || 'business@craftedthreads.com',
    city: user?.city || 'Rajpura',
    state: user?.state || 'Punjab',
    address: user?.address || 'Industrial Focal Point, Plot 14, Rajpura, Punjab',
    gstin: 'GSTIN: 03AABCU9603R1ZM (Verified Employer)',
    escrowDepositBalance: '₹45,000 (Locked in Escrow Vault)',
    activeContractorsCount: 18,
    totalProjectsCompleted: 42
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl text-slate-900 pb-12 mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white shadow-xl border-2 animate-shining-border">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={business.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/40 shadow-md shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white">{business.name}</h1>
              <Badge variant="indigo" className="bg-indigo-500/20 text-indigo-200 border-indigo-400/40 text-xs">
                🏢 Verified Corporate Employer
              </Badge>
            </div>
            <p className="text-xs text-indigo-200/80 font-semibold">{business.industry} • {business.city}, {business.state}</p>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          icon="briefcase"
          onClick={() => onNavigate('/business/projects')}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-black shadow-lg shadow-indigo-500/30 border border-indigo-300 text-xs px-5 py-2.5 rounded-2xl shrink-0"
        >
          View Active Contracts
        </Button>
      </div>

      {/* Platform Fixed Credential Lock Bar */}
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-900 text-xs font-semibold flex items-center gap-3 shadow-xs">
        <Icon name="lock" className="w-5 h-5 text-indigo-600 shrink-0" />
        <p className="text-[11px] leading-relaxed text-indigo-950">
          <strong className="font-extrabold text-indigo-900">Authenticated Enterprise Identity:</strong> Corporate GSTIN credentials, workplace safety compliance certificates, and employer verification badges are locked and authenticated by WorkConnect Corporate Verification.
        </p>
      </div>

      <Card borderVariant="indigo" className="p-6 sm:p-8 space-y-6 bg-white shadow-md rounded-3xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Icon name="building" className="w-5 h-5 text-indigo-600" />
            <span>Corporate Enterprise Profile</span>
          </h2>
          <Badge variant="success" className="text-xs font-extrabold px-3 py-1">
            {business.gstin}
          </Badge>
        </div>

        {/* Fixed Read-Only Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Registered Business Name</span>
            <p className="font-extrabold text-slate-900 text-sm">{business.name}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Authorized Representative</span>
            <p className="font-extrabold text-indigo-700 text-sm">{business.contactPerson}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Industry Sector</span>
            <p className="font-extrabold text-slate-900">{business.industry}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Official Phone Number</span>
            <p className="font-extrabold text-slate-900">{business.phone}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Corporate Email Address</span>
            <p className="font-extrabold text-slate-900">{business.email}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Escrow Vault Deposit Balance</span>
            <p className="font-extrabold text-emerald-700">{business.escrowDepositBalance}</p>
          </div>

          <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Factory / Office Address</span>
            <p className="font-extrabold text-slate-900">{business.address}</p>
          </div>
        </div>

        {/* Escrow & Talent Network Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
            <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider block">WorkConnect Escrow Protection</span>
            <h4 className="font-extrabold text-sm text-white">🔒 Anti-Scam Verified Employer</h4>
            <p className="text-xs text-slate-300">
              All contractor payouts are deposited into platform escrow and disbursed upon dual deal sign-off.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-purple-900 text-white space-y-2">
            <span className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-wider block">Workforce Pool</span>
            <h4 className="font-extrabold text-sm text-white">👥 Active Artisan Pool ({business.activeContractorsCount})</h4>
            <p className="text-xs text-indigo-200">
              Direct access to top-rated verified tailors, electricians, and technicians in Rajpura.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
