import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';

export const HouseholdProtectionShieldPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-3 sm:p-5 space-y-5 animate-fade-in relative overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-emerald-500/15 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 via-cyan-400 to-indigo-500 p-0.5 shadow-md shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Icon name="shield" className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                WorkConnect HomeCare Protection Shield
              </h1>
              <Badge variant="emerald" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 text-[10px] py-0.5">
                100% Guaranteed
              </Badge>
            </div>
            <p className="text-[11px] text-cyan-200/80 font-medium">
              360° doorstep service security, escrow vault & 30-day re-work protection
            </p>
          </div>
        </div>

        {/* RETURN TO DASHBOARD BUTTON */}
        <Button
          variant="primary"
          size="sm"
          icon="arrow-left"
          onClick={() => onNavigate('/household/dashboard')}
          className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black shadow-md shadow-emerald-400/30 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs transition-all scale-100 hover:scale-105 shrink-0"
        >
          Return to Dashboard
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto space-y-4 relative z-10">
        
        {/* COMPACT HERO BANNER CARD */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-emerald-500/40 shadow-xl space-y-3 relative overflow-hidden animate-shining-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black tracking-wider uppercase inline-block">
                🛡️ Zero-Risk Doorstep Service Promise
              </span>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white leading-snug">
                Your Home & Payout Are Completely Protected
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Every doorstep booking placed through WorkConnect automatically includes our 4-layer Protection Shield at zero extra charge.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-center space-y-0.5 shrink-0 sm:w-48">
              <span className="text-xl font-black text-emerald-400 block">₹0 Extra</span>
              <span className="text-[10px] font-bold text-slate-300 block uppercase tracking-wider">Full Protection Included</span>
            </div>
          </div>
        </div>

        {/* 4 CORE PROTECTION SHIELD PILLARS GRID - COMPACT SIZING */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* Pillar 1 */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-2.5 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-500/30 shrink-0">
                🛡️
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm text-white leading-tight">30-Day Zero-Cost Re-Work Guarantee</h3>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              If any electrical fix, plumbing joint, or carpentry lock shows issues within 30 days, a verified technician re-visits your doorstep for ₹0.
            </p>
            <div className="pt-1.5 text-[10px] text-emerald-400 font-bold flex items-center gap-1.5 border-t border-slate-800/80">
              <Icon name="check-circle" className="w-3.5 h-3.5" />
              <span>Full Re-Visit Labor Covered</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-2.5 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold border border-cyan-500/30 shrink-0">
                🔒
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm text-white leading-tight">Scam-Free Escrow Protection</h3>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Payment is safely locked in the WorkConnect Vault when you book. Funds are released ONLY after you inspect finished work and provide OTP.
            </p>
            <div className="pt-1.5 text-[10px] text-cyan-400 font-bold flex items-center gap-1.5 border-t border-slate-800/80">
              <Icon name="check-circle" className="w-3.5 h-3.5" />
              <span>Dual-Approval Required Before Payout</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 transition-all space-y-2.5 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold border border-purple-500/30 shrink-0">
                ⚡
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm text-white leading-tight">KYC-Verified Artisans & OTP</h3>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              100% of dispatched artisans undergo Aadhaar KYC verification & Work Passport checks. Every arrival requires a 4-digit security OTP.
            </p>
            <div className="pt-1.5 text-[10px] text-purple-400 font-bold flex items-center gap-1.5 border-t border-slate-800/80">
              <Icon name="check-circle" className="w-3.5 h-3.5" />
              <span>Doorstep Security OTP Verification</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all space-y-2.5 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30 shrink-0">
                ♿
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm text-white leading-tight">PwD Inclusive & Fair Rates</h3>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              WorkConnect supports skilled artisans, including persons with disabilities (PwD), ensuring dignified work opportunities and fair rates.
            </p>
            <div className="pt-1.5 text-[10px] text-amber-400 font-bold flex items-center gap-1.5 border-t border-slate-800/80">
              <Icon name="check-circle" className="w-3.5 h-3.5" />
              <span>Inclusive Workforce Guarantee</span>
            </div>
          </div>

        </div>

        {/* COMPACT BOTTOM ACTION BAR */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-xs text-white">Have questions about HomeCare Shield?</h4>
            <p className="text-[11px] text-slate-400 font-medium">Our 24/7 Concierge team is ready to assist you with any active booking.</p>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon="arrow-left"
            onClick={() => onNavigate('/household/dashboard')}
            className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black shadow-md shadow-emerald-400/30 px-4 py-2 rounded-xl text-xs shrink-0"
          >
            Return to Dashboard
          </Button>
        </div>

      </div>
    </div>
  );
};

