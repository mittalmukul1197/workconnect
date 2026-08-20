import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { WorkPassportCard } from '../../components/features/WorkPassportCard';

export const WorkerOnboardingPage = ({ onNavigate }) => {
  const [name, setName] = useState('Sunita Sharma');
  const [primarySkill, setPrimarySkill] = useState('Stitching');
  const [otherSkills, setOtherSkills] = useState('Alterations, Embroidery');
  const [experienceYears, setExperienceYears] = useState(8);
  const [city, setCity] = useState('Rajpura');
  const [capacity, setCapacity] = useState(30);
  const [rate, setRate] = useState(25);
  const [workPreference, setWorkPreference] = useState('Home-based Workshop');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('/worker/dashboard');
  };

  const previewWorker = {
    id: 'usr-wrk-1',
    name,
    profession: `${primarySkill} Specialist`,
    city,
    state: 'Punjab',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  };

  const previewProfile = {
    experienceYears,
    skills: [
      { name: primarySkill, score: 95 },
      { name: 'Alterations', score: 91 }
    ],
    workPassport: {
      totalCompletedJobs: 147,
      onTimeRate: 96,
      qualityScore: 93,
      overallRating: 4.9,
      verifiedBadges: ['Verified Identity', 'Top Rated Artisan']
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 flex-1 w-full">
        <div className="text-center space-y-2">
          <Badge variant="success">Step 2 of 2: Credential & Capacity Setup</Badge>
          <h1 className="text-2xl sm:text-4xl font-black text-white">Create Your Professional Profile</h1>
          <p className="text-xs text-slate-400">Publish your skills and available daily capacity for reverse matching.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Onboarding Form */}
          <Card borderVariant="emerald" className="p-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Primary Skill"
                  value={primarySkill}
                  onChange={(e) => setPrimarySkill(e.target.value)}
                  options={['Stitching', 'Electrical Wiring', 'Appliance Repair', 'Embroidery', 'Packaging', 'Graphic Design']}
                />
                <Input
                  label="Years of Experience"
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(parseInt(e.target.value, 10))}
                />
              </div>

              <Input
                label="Other Skills (Comma Separated)"
                value={otherSkills}
                onChange={(e) => setOtherSkills(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City Location"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Select
                  label="Work Preference"
                  value={workPreference}
                  onChange={(e) => setWorkPreference(e.target.value)}
                  options={['Home-based Workshop', 'On-site Client Location', 'Both Home & On-site']}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Daily Capacity (pieces/day)"
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
                />
                <Input
                  label="Expected Pay Rate (₹ / piece)"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(parseInt(e.target.value, 10))}
                />
              </div>

              <Button type="submit" variant="secondary" size="lg" icon="arrow-right" iconPosition="right" fullWidth>
                Complete Onboarding & Enter Worker Dashboard
              </Button>
            </form>
          </Card>

          {/* Live Work Passport Preview */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider text-center lg:text-left">Your Future Work Passport Preview</h3>
            <WorkPassportCard workerUser={previewWorker} profile={previewProfile} compact />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        WorkConnect Worker Onboarding
      </footer>
    </div>
  );
};
