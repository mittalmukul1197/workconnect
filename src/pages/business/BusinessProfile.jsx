import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';

export const BusinessProfile = ({ onNavigate }) => {
  const { user } = useAuth();
  
  const [name, setName] = useState(user?.name || 'Crafted Threads Boutique');
  const [industry, setIndustry] = useState(user?.industry || 'Tailoring & Apparel');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [city, setCity] = useState(user?.city || 'Rajpura');
  const [state, setState] = useState(user?.state || 'Punjab');
  const [savedSuccessAlert, setSavedSuccessAlert] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccessAlert(true);
    setTimeout(() => {
      setSavedSuccessAlert(false);
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl text-slate-900">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-indigo-100 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-200 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">{name}</h1>
              <Badge variant="primary">Verified Employer</Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium">{industry} • {city}, {state}</p>
          </div>
        </div>

        <Button variant="outline" size="sm" icon="briefcase" onClick={() => onNavigate('/business/projects')}>
          View Active Projects
        </Button>
      </div>

      {savedSuccessAlert && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 font-bold animate-scale-up">
          <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
          <span>Company profile details updated successfully!</span>
        </div>
      )}

      {/* Editable Form Card */}
      <Card borderVariant="indigo" className="p-6 space-y-5 bg-white shadow-sm rounded-3xl">
        <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Icon name="building" className="w-5 h-5 text-indigo-600" />
          <span>Company Profile Information</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Business Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Industry / Sector</label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Phone Number</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">State</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" icon="check">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Escrow & Verification Badges Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-5 space-y-2 bg-slate-900 text-white rounded-2xl">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">WorkConnect Escrow Protection</span>
          <h4 className="font-extrabold text-sm text-white">Verified Anti-Scam Account</h4>
          <p className="text-xs text-slate-300">
            All your payments are deposited securely into platform escrow and disbursed upon dual deal sign-off.
          </p>
        </Card>

        <Card className="p-5 space-y-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl">
          <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">Talent Network Pool</span>
          <h4 className="font-extrabold text-sm text-white">Saved Local Artisans (28)</h4>
          <p className="text-xs text-indigo-100">
            Directly message top-rated local tailors, electricians, and tradesmen in Rajpura & Patiala.
          </p>
        </Card>
      </div>
    </div>
  );
};
