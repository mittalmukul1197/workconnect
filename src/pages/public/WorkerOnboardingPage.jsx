import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { WorkPassportCard } from '../../components/features/WorkPassportCard';
import { useAuth } from '../../context/AuthContext';

export const WorkerOnboardingPage = ({ onNavigate }) => {
  const { registerCustomUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Basic Details
  const [fullName, setFullName] = useState('Sunita Sharma');
  const [phone, setPhone] = useState('+91 98765 11111');
  const [email, setEmail] = useState('sunita@demo.com');
  const [gender, setGender] = useState('Female');

  // Step 2: Worker Details
  const [idVerified, setIdVerified] = useState('Verified (Aadhaar KYC Completed)');
  const [workRadiusKm, setWorkRadiusKm] = useState('10 km');

  // Step 3: Skills / Work Type
  const [primarySkill, setPrimarySkill] = useState('Tailor & Stitching');
  const [secondarySkills, setSecondarySkills] = useState('Alterations, Pattern Cutting, Embroidery');

  // Step 4: Experience
  const [experienceYears, setExperienceYears] = useState(6);
  const [portfolioSummary, setPortfolioSummary] = useState('Specialist in boutique ladies tailoring, custom suit stitching, and bulk garment assembly.');

  // Step 5: Expected Payment
  const [expectedRate, setExpectedRate] = useState('₹700/day (or ₹35/piece)');

  // Step 6: Availability
  const [dailyCapacity, setDailyCapacity] = useState('30 pieces/day');
  const [preferredShift, setPreferredShift] = useState('Full Day (9:00 AM - 6:00 PM)');

  // Step 7: Location
  const [streetAddress, setStreetAddress] = useState('House #42, Street 3');
  const [area, setArea] = useState('Model Town');
  const [city, setCity] = useState('Rajpura');
  const [pincode, setPincode] = useState('140401');

  const totalSteps = 8;

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Submit
      const userData = {
        name: fullName,
        phone,
        email,
        role: 'worker',
        profession: `${primarySkill} Specialist`,
        city,
        state: 'Punjab',
        address: `${streetAddress}, ${area}, ${city} - ${pincode}`,
        verified: true,
        rating: 4.9,
        experienceYears,
        skillsList: [primarySkill, ...secondarySkills.split(',').map((s) => s.trim())],
        workPassport: {
          totalCompletedJobs: 147,
          onTimeRate: 96,
          qualityScore: 94,
          overallRating: 4.9,
          verifiedBadges: ['KYC Verified', 'Top Rated Artisan', 'High Reliability']
        }
      };

      registerCustomUser(userData);
      onNavigate('/worker/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const skillOptions = [
    'Tailor & Stitching',
    'Electrician & Wiring',
    'Carpenter & Woodwork',
    'Plumber & Pipe Fitting',
    'Daily Labour & Helper',
    'Painter & Waterproofing',
    'Mason & Civil Construction',
    'Welder & Metal Fabricator',
    'AC & Appliance Repair',
    'Salon & Beauty Specialist'
  ];

  const previewWorker = {
    id: 'usr-wrk-new',
    name: fullName,
    profession: `${primarySkill} Specialist`,
    city,
    state: 'Punjab',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  };

  const previewProfile = {
    experienceYears,
    skills: [
      { name: primarySkill, score: 96 },
      { name: 'Quality Craftsmanship', score: 94 }
    ],
    workPassport: {
      totalCompletedJobs: 147,
      onTimeRate: 96,
      qualityScore: 94,
      overallRating: 4.9,
      verifiedBadges: ['KYC Verified', 'Top Rated Artisan']
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 flex-1 w-full">
        {/* Progress Bar & Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>•</span>
            <span>Worker Profile Setup</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">Build Your Work Passport Profile</h1>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx + 1 === currentStep
                    ? 'w-8 bg-emerald-600'
                    : idx + 1 < currentStep
                    ? 'w-3 bg-indigo-600'
                    : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Main Form (3 Cols) */}
          <Card borderVariant="emerald" className="lg:col-span-3 p-6 sm:p-8 space-y-6 bg-white shadow-md">
            <form onSubmit={handleNext} className="space-y-5 text-xs">

              {/* STEP 1: BASIC DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon name="user" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Step 1: Basic Personal Details</h3>
                      <p className="text-[11px] text-slate-500">Full name and primary contact channel</p>
                    </div>
                  </div>

                  <Input
                    label="Full Name *"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sunita Sharma"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Phone Number *"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 11111"
                    />
                    <Input
                      label="Email Address *"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. worker@demo.com"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: WORKER DETAILS */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon name="shield-check" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Step 2: ID Verification & Travel Radius</h3>
                      <p className="text-[11px] text-slate-500">Government identity trust & preferred work zone</p>
                    </div>
                  </div>

                  <Select
                    label="ID Verification Status *"
                    value={idVerified}
                    onChange={(e) => setIdVerified(e.target.value)}
                    options={[
                      'Verified (Aadhaar KYC Completed)',
                      'PAN / Voter ID Verified',
                      'Pending Verification'
                    ]}
                  />

                  <Select
                    label="Preferred Work Zone Travel Radius *"
                    value={workRadiusKm}
                    onChange={(e) => setWorkRadiusKm(e.target.value)}
                    options={['5 km radius', '10 km radius', '15 km radius', 'Entire City & District']}
                  />
                </div>
              )}

              {/* STEP 3: SKILLS / WORK TYPE */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon name="zap" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Step 3: Trade Skill & Work Category</h3>
                      <p className="text-[11px] text-slate-500">Select your core profession & secondary skills</p>
                    </div>
                  </div>

                  <Select
                    label="Primary Skill / Trade Category *"
                    value={primarySkill}
                    onChange={(e) => setPrimarySkill(e.target.value)}
                    options={skillOptions}
                  />

                  <Input
                    label="Secondary Skills (Comma Separated) *"
                    required
                    value={secondarySkills}
                    onChange={(e) => setSecondarySkills(e.target.value)}
                    placeholder="e.g. Alterations, Embroidery, Cutting"
                  />
                </div>
              )}

              {/* STEP 4: EXPERIENCE */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon name="clock" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Step 4: Experience & Past Work</h3>
                      <p className="text-[11px] text-slate-500">Years of work history & portfolio summary</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Years of Work Experience *</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      required
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(parseInt(e.target.value, 10))}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-emerald-700 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Work Summary & Achievements *</label>
                    <textarea
                      rows={3}
                      required
                      value={portfolioSummary}
                      onChange={(e) => setPortfolioSummary(e.target.value)}
                      placeholder="e.g. Specialist in custom dressmaking, ladies suit stitching, and alterations."
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: EXPECTED PAYMENT */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon name="currency" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Step 5: Expected Payment & Rate</h3>
                      <p className="text-[11px] text-slate-500">Specify expected daily wage or per-unit rate</p>
                    </div>
                  </div>

                  <Input
                    label="Expected Pay Rate (Per Day / Per Piece) *"
                    required
                    value={expectedRate}
                    onChange={(e) => setExpectedRate(e.target.value)}
                    placeholder="e.g. ₹700/day or ₹35/piece"
                  />
                </div>
              )}

              {/* STEP 6: AVAILABILITY */}
              {currentStep === 6 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon name="sparkles" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Step 6: Work Capacity & Availability</h3>
                      <p className="text-[11px] text-slate-500">Powers WorkConnect Reverse Capacity Matching</p>
                    </div>
                  </div>

                  <Input
                    label="Daily Work Capacity *"
                    required
                    value={dailyCapacity}
                    onChange={(e) => setDailyCapacity(e.target.value)}
                    placeholder="e.g. 30 pieces/day or Full Day Available"
                  />

                  <Select
                    label="Preferred Shift / Work Mode *"
                    value={preferredShift}
                    onChange={(e) => setPreferredShift(e.target.value)}
                    options={[
                      'Full Day (9:00 AM - 6:00 PM)',
                      'Morning Shift (8:00 AM - 2:00 PM)',
                      'Evening Shift (2:00 PM - 8:00 PM)',
                      'Home-based Workshop',
                      'On-site Doorstep Delivery'
                    ]}
                  />
                </div>
              )}

              {/* STEP 7: LOCATION */}
              {currentStep === 7 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon name="map-pin" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Step 7: Residential Location & Address</h3>
                      <p className="text-[11px] text-slate-500">Enables exact local coordinate distance matching</p>
                    </div>
                  </div>

                  <Input
                    label="Street Address / House Number *"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. House #42, Street 3"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label="Area / Locality *"
                      required
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. Model Town"
                    />
                    <Input
                      label="City *"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Rajpura"
                    />
                    <Input
                      label="Pin Code *"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 140401"
                    />
                  </div>
                </div>
              )}

              {/* STEP 8: WORKER PROFILE SUMMARY */}
              {currentStep === 8 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon name="check-circle" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Step 8: Review Work Passport Profile</h3>
                      <p className="text-[11px] text-slate-500">Confirm your compiled artisan trust credentials</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-base text-slate-900">{fullName}</h4>
                        <p className="text-xs text-emerald-700 font-bold">{primarySkill} Specialist • {experienceYears} Yrs Exp.</p>
                        <p className="text-xs text-slate-500 mt-0.5">{streetAddress}, {area}, {city}</p>
                      </div>
                      <Badge variant="success">★ 4.9 Top Artisan</Badge>
                    </div>

                    <div className="pt-2 border-t border-emerald-200 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Capacity</span>
                        <span className="font-bold text-slate-800">{dailyCapacity}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Expected Pay</span>
                        <span className="font-bold text-emerald-700">{expectedRate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP CONTROLS */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {currentStep > 1 ? (
                  <Button type="button" variant="ghost" size="md" onClick={handlePrev}>
                    ← Back
                  </Button>
                ) : <div />}

                <Button type="submit" variant="secondary" size="md" icon="arrow-right" iconPosition="right">
                  {currentStep === totalSteps ? 'Complete Profile & Open Dashboard' : 'Next Step →'}
                </Button>
              </div>

            </form>
          </Card>

          {/* Live Passport Card Preview (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider text-center lg:text-left">
              Live Work Passport Preview
            </h3>
            <WorkPassportCard workerUser={previewWorker} profile={previewProfile} compact />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200">
        WorkConnect Worker Passport Onboarding
      </footer>
    </div>
  );
};
