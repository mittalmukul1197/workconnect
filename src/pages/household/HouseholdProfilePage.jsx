import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';

export const HouseholdProfilePage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user, registerCustomUser } = useAuth();

  // ONLY 3 FIELDS FOR HOUSEHOLD CLIENT
  const [name, setName] = useState(user?.name || 'Rahul Sharma');
  const [area, setArea] = useState(user?.area || user?.city || 'Model Town, Sector 4, Rajpura');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 22222');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name,
      area,
      city: area.split(',')[0] || 'Rajpura',
      phone,
      role: 'household',
      clientType: 'household',
      industry: 'Household Client'
    };

    registerCustomUser(updatedUser);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in text-slate-900">
      <div className="flex items-center justify-between p-6 rounded-2xl border border-indigo-200 bg-white shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Household Client Profile</h1>
            <Badge variant="indigo">3-Field Setup</Badge>
          </div>
          <p className="text-xs text-slate-500 font-medium">Manage your personal information for quick doorstep worker bookings</p>
        </div>
      </div>

      <Card borderVariant="indigo" className="p-6 space-y-6 bg-white shadow-md">
        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2 animate-scale-up">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
            <span>Household Profile Saved Successfully!</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-5 text-xs">
          {/* FIELD 1: FULL NAME */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">1. Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
            />
          </div>

          {/* FIELD 2: AREA / LOCATION */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">2. Area / Location *</label>
            <input
              type="text"
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. Model Town, Sector 4, Rajpura"
              className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
            />
          </div>

          {/* FIELD 3: PHONE NUMBER */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">3. Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 22222"
              className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" icon="check" fullWidth>
            {t('common.save')}
          </Button>
        </form>
      </Card>
    </div>
  );
};
