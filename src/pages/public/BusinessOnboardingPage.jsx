import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';

export const BusinessOnboardingPage = ({ onNavigate }) => {
  const [name, setName] = useState('Crafted Threads Boutique');
  const [ownerName, setOwnerName] = useState('Ananya Verma');
  const [businessType, setBusinessType] = useState('Retail & Apparel');
  const [city, setCity] = useState('Rajpura');
  const [address, setAddress] = useState('Main Market, Focal Point, Rajpura');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [workingHours, setWorkingHours] = useState('9:00 AM - 7:00 PM (Mon-Sat)');
  const [description, setDescription] = useState('Boutique specializing in ethnic ladies kurtis, custom dressmaking, and bulk embroidery orders.');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('/business/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />

      <main className="max-w-2xl mx-auto px-4 py-12 space-y-6 flex-1 w-full">
        <div className="text-center space-y-2">
          <Badge variant="primary">Step 2 of 2: Profile Setup</Badge>
          <h1 className="text-2xl sm:text-4xl font-black text-white">Setup Your Business Profile</h1>
          <p className="text-xs text-slate-400">Tell us about your business to receive optimal worker candidate rankings.</p>
        </div>

        <Card borderVariant="indigo" className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Business / Company Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Owner / Manager Name"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Business Type Category"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                options={[
                  'Retail & Apparel',
                  'Restaurant & Catering',
                  'Cafe & Bakery',
                  'Salon & Personal Care',
                  'Workshop & Manufacturing',
                  'Service & Trades',
                  'Startup',
                  'Other'
                ]}
              />
              <Input
                label="Contact Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="City Location"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                label="Working Hours"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
              />
            </div>

            <Input
              label="Full Address / Landmark"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Business Overview / Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" icon="arrow-right" iconPosition="right" fullWidth>
              Complete Onboarding & Enter Business Dashboard
            </Button>
          </form>
        </Card>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        WorkConnect Business Onboarding
      </footer>
    </div>
  );
};
