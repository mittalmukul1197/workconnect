import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { registerCustomUser } = useAuth();

  // Mode Selection: '' | 'household' | 'business' | 'worker'
  const [roleMode, setRoleMode] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  // --- HOUSEHOLD INPUT FIELDS (ONLY 3 FIELDS) ---
  const [hName, setHName] = useState('Rahul Sharma');
  const [hArea, setHArea] = useState('Model Town, Rajpura');
  const [hPhone, setHPhone] = useState('+91 98765 22222');

  // --- BUSINESS INPUT FIELDS ---
  const [bContactName, setBContactName] = useState('Ananya Verma');
  const [bEmail, setBEmail] = useState('ananya@craftedthreads.com');
  const [bPhone, setBPhone] = useState('+91 98765 43210');
  const [bName, setBName] = useState('Crafted Threads Boutique');
  const [bGstin, setBGstin] = useState('03AAAAA0000A1Z5');
  const [bYearEst, setBYearEst] = useState('2019');
  const [bType, setBType] = useState('Apparel & Tailoring');
  const [bStreet, setBStreet] = useState('Shop #14, Main Market');
  const [bArea, setBArea] = useState('Sector 2, Focal Point');
  const [bCity, setBCity] = useState('Rajpura');
  const [bPincode, setBPincode] = useState('140401');
  const [bWorkerCount, setBWorkerCount] = useState(2);
  const [bWorkerTypeNeeded, setBWorkerTypeNeeded] = useState('Skilled Tailor & Stitcher');
  const [bUrgency, setBUrgency] = useState('Immediate (< 24 hrs)');
  const [bWorkDesc, setBWorkDesc] = useState('Bulk stitching for 100 ladies kurtis with piping & button work.');
  const [bDurationDays, setBDurationDays] = useState('5 Days');
  const [bBudget, setBBudget] = useState('₹35 per piece (~₹700/day)');

  // --- WORKER INPUT FIELDS ---
  const [wName, setWName] = useState('Sunita Sharma');
  const [wPhone, setWPhone] = useState('+91 98765 11111');
  const [wEmail, setWEmail] = useState('sunita@demo.com');
  const [wGender, setWGender] = useState('Female');
  const [wIdVerified, setWIdVerified] = useState('Verified (Aadhaar KYC Completed)');
  const [wRadiusKm, setWRadiusKm] = useState('10 km');
  const [wHasDisability, setWHasDisability] = useState(false);
  const [wDisabilityType, setWDisabilityType] = useState('Locomotor / Physical Disability');
  const [wDisabilityAccommodations, setWDisabilityAccommodations] = useState(['Flexible Work Hours / Rest Breaks']);
  const [wPrimarySkill, setWPrimarySkill] = useState('Tailor & Stitching');
  const [wSecondarySkills, setWSecondarySkills] = useState('Alterations, Pattern Cutting, Embroidery');
  const [wExpYears, setWExpYears] = useState(6);
  const [wPortfolio, setWPortfolio] = useState('Specialist in boutique ladies tailoring, custom suit stitching, and bulk garment assembly.');
  const [wExpectedRate, setWExpectedRate] = useState('₹700/day (or ₹35/piece)');
  const [wDailyCapacity, setWDailyCapacity] = useState('30 pieces/day');
  const [wShift, setWShift] = useState('Full Day (9:00 AM - 6:00 PM)');
  const [wStreet, setWStreet] = useState('House #42, Street 3');
  const [wArea, setWArea] = useState('Model Town');
  const [wCity, setWCity] = useState('Rajpura');
  const [wPincode, setWPincode] = useState('140401');

  const totalSteps = 8;

  const handleResetMode = () => {
    setRoleMode('');
    setCurrentStep(1);
  };

  const handleHouseholdSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: hName,
      phone: hPhone,
      address: hArea,
      city: hArea.split(',')[0] || 'Rajpura',
      role: 'household',
      clientType: 'household',
      industry: 'Household Client',
      email: `${(hName || 'user').toLowerCase().replace(/\s+/g, '')}@workconnect.com`,
      verified: true,
      rating: 4.9
    };

    registerCustomUser(userData);
    onNavigate('/household/dashboard');
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      let userData = {};
      if (roleMode === 'business') {
        userData = {
          name: bName,
          contactPerson: bContactName,
          email: bEmail,
          phone: bPhone,
          role: 'business',
          clientType: 'business',
          industry: bType,
          address: `${bStreet}, ${bArea}, ${bCity} - ${bPincode}`,
          city: bCity,
          verified: true,
          rating: 4.9,
          activeWorkNeed: {
            workerCount: bWorkerCount,
            workerTypeNeeded: bWorkerTypeNeeded,
            workDescription: bWorkDesc,
            durationDays: bDurationDays,
            offeredBudget: bBudget
          }
        };
      } else {
        // Worker
        userData = {
          name: wName,
          phone: wPhone,
          email: wEmail,
          gender: wGender,
          hasDisability: wHasDisability,
          disabilityType: wHasDisability ? wDisabilityType : '',
          disabilityAccommodations: wHasDisability ? wDisabilityAccommodations : [],
          idVerified: wIdVerified,
          workRadiusKm: wRadiusKm,
          role: 'worker',
          profession: `${wPrimarySkill} Specialist`,
          primarySkill: wPrimarySkill,
          secondarySkills: wSecondarySkills,
          skillsList: [wPrimarySkill, ...wSecondarySkills.split(',').map((s) => s.trim()).filter(Boolean)],
          experienceYears: wExpYears,
          portfolioSummary: wPortfolio,
          expectedRate: wExpectedRate,
          dailyCapacity: wDailyCapacity,
          preferredShift: wShift,
          streetAddress: wStreet,
          area: wArea,
          city: wCity,
          pincode: wPincode,
          address: `${wStreet}, ${wArea}, ${wCity} - ${wPincode}`,
          verified: true,
          rating: 4.9,
          workPassport: {
            totalCompletedJobs: 147,
            onTimeRate: 96,
            qualityScore: 94,
            overallRating: 4.9,
            verifiedBadges: [
              'KYC Verified',
              'Top Rated Artisan',
              ...(wHasDisability ? ['♿ PwD Inclusive Worker'] : [])
            ]
          }
        };
      }

      registerCustomUser(userData);
      onNavigate(userData.role === 'business' ? '/business/dashboard' : '/worker/dashboard');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const businessTypesList = [
    'Apparel & Tailoring',
    'Retail Store & Shop',
    'Electrical & Solar',
    'Construction & Civil',
    'Food & Hospitality',
    'Workshop & Manufacturing',
    'Salon & Beauty Care',
    'Digital & Creative',
    'Other Service Industry'
  ];

  const workerSkillsList = [
    'Tailor & Stitching',
    'Electrician & Wiring',
    'Carpenter & Woodwork',
    'Plumber & Pipe Fitting',
    'Daily Labour & Helper',
    'Painter & Waterproofing',
    'Mason & Civil Work',
    'Welder & Metal Fabricator',
    'AC & Appliance Repair',
    'Salon & Beauty Specialist'
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />

      <main className="max-w-2xl mx-auto px-4 py-12 space-y-6 flex-1 w-full">
        {/* Header */}
        <div className="text-center space-y-2">
          <Badge variant="primary">WorkConnect Registration</Badge>
          <h1 className="text-3xl font-black text-slate-900">Create Your Account Profile</h1>
          <p className="text-xs text-slate-600 font-medium">
            Personalized setup for Household Clients, Businesses & Workers
          </p>
        </div>

        {/* STEP 0: CHOOSE ROLE MODE (HOUSEHOLD VS BUSINESS VS WORKER) */}
        {!roleMode && (
          <Card borderVariant="indigo" className="p-6 sm:p-8 space-y-6 bg-white shadow-md">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Choose Your Account Path</h3>
              <p className="text-xs text-slate-500">Select your account category to get started</p>
            </div>

            <div className="space-y-4 pt-2">
              <button
                type="button"
                onClick={() => setRoleMode('household')}
                className="w-full p-5 rounded-2xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-600 hover:text-white text-left flex items-center gap-4 group transition-all shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-indigo-600 group-hover:bg-white group-hover:text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                  <Icon name="user" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 group-hover:text-white">Household Client</h4>
                  <p className="text-xs text-slate-600 group-hover:text-indigo-100 mt-1">Simple 3-field setup: Name, Area, Phone Number.</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setRoleMode('business'); setCurrentStep(1); }}
                className="w-full p-5 rounded-2xl border border-purple-200 bg-purple-50/60 hover:bg-purple-600 hover:text-white text-left flex items-center gap-4 group transition-all shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-purple-600 group-hover:bg-white group-hover:text-purple-600 flex items-center justify-center shadow-xs shrink-0">
                  <Icon name="building" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 group-hover:text-white">Business / Employer</h4>
                  <p className="text-xs text-slate-600 group-hover:text-purple-100 mt-1">"I need workers or labor for my boutique, store, warehouse, solar firm, or workshop."</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setRoleMode('worker'); setCurrentStep(1); }}
                className="w-full p-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-600 hover:text-white text-left flex items-center gap-4 group transition-all shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-emerald-600 group-hover:bg-white group-hover:text-emerald-600 flex items-center justify-center shadow-xs shrink-0">
                  <Icon name="zap" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 group-hover:text-white">Worker / Professional</h4>
                  <p className="text-xs text-slate-600 group-hover:text-emerald-100 mt-1">"I need work opportunities matching my trade skills & daily available capacity."</p>
                </div>
              </button>
            </div>
          </Card>
        )}

        {/* --- HOUSEHOLD FORM: EXACTLY 3 FIELDS (NAME, AREA, PHONE NUMBER) --- */}
        {roleMode === 'household' && (
          <Card borderVariant="indigo" className="p-6 sm:p-8 space-y-6 bg-white shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={handleResetMode}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                ← Switch Role Path
              </button>
              <Badge variant="indigo">Household Setup (3 Fields)</Badge>
            </div>

            <form onSubmit={handleHouseholdSubmit} className="space-y-4 text-xs animate-fade-in">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Full Name *</label>
                <input
                  type="text"
                  required
                  value={hName}
                  onChange={(e) => setHName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Area / Location *</label>
                <input
                  type="text"
                  required
                  value={hArea}
                  onChange={(e) => setHArea(e.target.value)}
                  placeholder="e.g. Model Town, Sector 4, Rajpura"
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={hPhone}
                  onChange={(e) => setHPhone(e.target.value)}
                  placeholder="e.g. +91 98765 22222"
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" icon="arrow-right" iconPosition="right" fullWidth>
                Register Household Client & Proceed
              </Button>
            </form>
          </Card>
        )}

        {/* --- BUSINESS MULTI-STEP INPUT FORM --- */}
        {roleMode === 'business' && (
          <Card borderVariant="purple" className="p-6 sm:p-8 space-y-6 bg-white shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={handleResetMode}
                className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1"
              >
                ← Switch Role Path
              </button>
              <Badge variant="purple">Step {currentStep} of {totalSteps}: Business</Badge>
            </div>

            <form onSubmit={handleNextStep} className="space-y-5 text-xs">
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">1. Basic Details</h3>
                  <Input label="Contact Person Name *" required value={bContactName} onChange={(e) => setBContactName(e.target.value)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Business Email *" type="email" required value={bEmail} onChange={(e) => setBEmail(e.target.value)} />
                    <Input label="Phone Number *" type="tel" required value={bPhone} onChange={(e) => setBPhone(e.target.value)} />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">2. Business Details</h3>
                  <Input label="Business / Company Name *" required value={bName} onChange={(e) => setBName(e.target.value)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="GSTIN / License (Optional)" value={bGstin} onChange={(e) => setBGstin(e.target.value)} />
                    <Input label="Year Established *" type="number" required value={bYearEst} onChange={(e) => setBYearEst(e.target.value)} />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">3. Business Type Category</h3>
                  <Select label="Select Industry *" value={bType} onChange={(e) => setBType(e.target.value)} options={businessTypesList} />
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">4. Business Location</h3>
                  <Input label="Street Address *" required value={bStreet} onChange={(e) => setBStreet(e.target.value)} />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input label="Area / Landmark *" required value={bArea} onChange={(e) => setBArea(e.target.value)} />
                    <Input label="City *" required value={bCity} onChange={(e) => setBCity(e.target.value)} />
                    <Input label="Pin Code *" required value={bPincode} onChange={(e) => setBPincode(e.target.value)} />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">5. Workers Required</h3>
                  <Input label="Worker Count *" type="number" required value={bWorkerCount} onChange={(e) => setBWorkerCount(parseInt(e.target.value, 10))} />
                  <Input label="Worker Role / Skill Needed *" required value={bWorkerTypeNeeded} onChange={(e) => setBWorkerTypeNeeded(e.target.value)} />
                  <Select label="Urgency *" value={bUrgency} onChange={(e) => setBUrgency(e.target.value)} options={['Immediate (< 24 hrs)', 'Within 2-3 Days', 'Next Week']} />
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">6. Work Details</h3>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px]">Work Task Guidelines *</label>
                    <textarea rows={3} required value={bWorkDesc} onChange={(e) => setBWorkDesc(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
                  </div>
                  <Input label="Timeline / Duration *" required value={bDurationDays} onChange={(e) => setBDurationDays(e.target.value)} />
                </div>
              )}

              {currentStep === 7 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">7. Budget / Salary</h3>
                  <Input label="Offered Compensation *" required value={bBudget} onChange={(e) => setBBudget(e.target.value)} placeholder="e.g. ₹600/day" />
                </div>
              )}

              {currentStep === 8 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">8. Business Profile Review</h3>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <p className="font-bold text-slate-900">{bName}</p>
                    <p className="text-[11px] text-purple-700">{bType} • {bCity}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {currentStep > 1 ? (
                  <Button type="button" variant="ghost" size="md" onClick={handlePrevStep}>
                    ← Back
                  </Button>
                ) : <div />}

                <Button type="submit" variant="primary" size="md" icon="arrow-right" iconPosition="right">
                  {currentStep === totalSteps ? 'Register Business' : 'Next Step →'}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* --- WORKER MULTI-STEP INPUT FORM --- */}
        {roleMode === 'worker' && (
          <Card borderVariant="emerald" className="p-6 sm:p-8 space-y-6 bg-white shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={handleResetMode}
                className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                ← Switch Role Path
              </button>
              <Badge variant="success">Step {currentStep} of {totalSteps}: Worker</Badge>
            </div>

            <form onSubmit={handleNextStep} className="space-y-5 text-xs">
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">1. Basic Personal Details</h3>
                  <Input label="Full Name *" required value={wName} onChange={(e) => setWName(e.target.value)} />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input label="Phone Number *" type="tel" required value={wPhone} onChange={(e) => setWPhone(e.target.value)} />
                    <Input label="Email Address *" type="email" required value={wEmail} onChange={(e) => setWEmail(e.target.value)} />
                    <Select label="Gender *" value={wGender} onChange={(e) => setWGender(e.target.value)} options={['Female', 'Male', 'Non-Binary', 'Prefer not to say']} />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">2. Verification, Work Zone & Disability</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select label="KYC Status *" value={wIdVerified} onChange={(e) => setWIdVerified(e.target.value)} options={['Verified (Aadhaar KYC Completed)', 'PAN / Voter ID Verified', 'Pending Verification']} />
                    <Select label="Travel Radius *" value={wRadiusKm} onChange={(e) => setWRadiusKm(e.target.value)} options={['5 km radius', '10 km radius', '15 km radius', 'Entire City & District']} />
                  </div>

                  {/* DISABILITY SECTION */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                          Do you have any disability or special needs? *
                        </label>
                        <Badge variant="indigo" className="text-[10px]">Inclusive Workforce</Badge>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        WorkConnect connects skilled persons with disabilities (PwD) with inclusive employers and workplace accommodations.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setWHasDisability(false)}
                        className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          !wHasDisability
                            ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            !wHasDisability ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                          }`}>
                            {!wHasDisability && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="text-xs">No (Abled / No Special Needs)</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setWHasDisability(true);
                          if (!wDisabilityType) setWDisabilityType('Locomotor / Physical Disability');
                          if (wDisabilityAccommodations.length === 0) setWDisabilityAccommodations(['Flexible Work Hours / Rest Breaks']);
                        }}
                        className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          wHasDisability
                            ? 'border-purple-600 bg-purple-50/80 text-purple-900 font-bold ring-2 ring-purple-500/20'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            wHasDisability ? 'border-purple-600 bg-purple-600' : 'border-slate-300'
                          }`}>
                            {wHasDisability && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="text-xs">Yes (Person with Disability - PwD)</span>
                        </div>
                      </button>
                    </div>

                    {wHasDisability && (
                      <div className="space-y-4 pt-3 border-t border-slate-200 animate-fade-in">
                        <Select
                          label="Disability Category / Type *"
                          value={wDisabilityType}
                          onChange={(e) => setWDisabilityType(e.target.value)}
                          options={[
                            'Locomotor / Physical Disability',
                            'Visual Impairment / Low Vision',
                            'Hearing & Speech Impairment',
                            'Intellectual / Learning Disability',
                            'Multiple Disabilities / Other Special Ability'
                          ]}
                        />

                        <div className="space-y-2">
                          <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider block">
                            Workplace Accommodations Needed
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                              'Wheelchair Accessible Workspace',
                              'Flexible Work Hours / Rest Breaks',
                              'Home-based / Remote Work Option',
                              'Ergonomic Seating / Adapted Tools',
                              'Assistive Audio/Visual Support',
                              'Companion / Support Assistant Allowed'
                            ].map((acc) => {
                              const isSelected = wDisabilityAccommodations.includes(acc);
                              return (
                                <button
                                  key={acc}
                                  type="button"
                                  onClick={() => {
                                    if (isSelected) {
                                      setWDisabilityAccommodations(wDisabilityAccommodations.filter((a) => a !== acc));
                                    } else {
                                      setWDisabilityAccommodations([...wDisabilityAccommodations, acc]);
                                    }
                                  }}
                                  className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                                    isSelected
                                      ? 'border-purple-500 bg-purple-100/70 text-purple-900 font-semibold'
                                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                  }`}
                                >
                                  <Icon name={isSelected ? 'check-circle' : 'circle'} className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-700' : 'text-slate-400'}`} />
                                  <span>{acc}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">3. Skills / Work Type</h3>
                  <Select label="Primary Skill *" value={wPrimarySkill} onChange={(e) => setWPrimarySkill(e.target.value)} options={workerSkillsList} />
                  <Input label="Secondary Skills *" required value={wSecondarySkills} onChange={(e) => setWSecondarySkills(e.target.value)} />
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">4. Experience</h3>
                  <Input label="Years of Experience *" type="number" required value={wExpYears} onChange={(e) => setWExpYears(parseInt(e.target.value, 10) || 0)} />
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px]">Portfolio Summary *</label>
                    <textarea rows={3} required value={wPortfolio} onChange={(e) => setWPortfolio(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">5. Expected Payment</h3>
                  <Input label="Expected Rate *" required value={wExpectedRate} onChange={(e) => setWExpectedRate(e.target.value)} placeholder="e.g. ₹700/day" />
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">6. Availability</h3>
                  <Input label="Daily Capacity *" required value={wDailyCapacity} onChange={(e) => setWDailyCapacity(e.target.value)} />
                  <Select label="Shift Preference *" value={wShift} onChange={(e) => setWShift(e.target.value)} options={['Full Day (9 AM - 6 PM)', 'Morning Shift', 'Evening Shift', 'Home-based Workshop']} />
                </div>
              )}

              {currentStep === 7 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">7. Location</h3>
                  <Input label="Street Address *" required value={wStreet} onChange={(e) => setWStreet(e.target.value)} />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input label="Area *" required value={wArea} onChange={(e) => setWArea(e.target.value)} />
                    <Input label="City *" required value={wCity} onChange={(e) => setWCity(e.target.value)} />
                    <Input label="Pin Code *" required value={wPincode} onChange={(e) => setWPincode(e.target.value)} />
                  </div>
                </div>
              )}

              {currentStep === 8 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">8. Worker Profile Review</h3>
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-extrabold text-base text-slate-900">{wName}</p>
                        <p className="text-xs text-emerald-700 font-bold">{wPrimarySkill} Specialist • {wExpYears} Yrs Exp.</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{wStreet}, {wArea}, {wCity} ({wGender})</p>
                      </div>
                      <Badge variant="success">★ 4.9 Top Artisan</Badge>
                    </div>

                    {wHasDisability && (
                      <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Badge variant="purple" className="text-[10px]">♿ PwD Inclusive Worker</Badge>
                          <span className="text-[11px] font-bold text-purple-900">{wDisabilityType}</span>
                        </div>
                        {wDisabilityAccommodations.length > 0 && (
                          <p className="text-[10px] text-purple-700">
                            Accommodations: {wDisabilityAccommodations.join(', ')}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="pt-2 border-t border-emerald-200 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Capacity</span>
                        <span className="font-bold text-slate-800">{wDailyCapacity}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Expected Pay</span>
                        <span className="font-bold text-emerald-700">{wExpectedRate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {currentStep > 1 ? (
                  <Button type="button" variant="ghost" size="md" onClick={handlePrevStep}>
                    ← Back
                  </Button>
                ) : <div />}

                <Button type="submit" variant="secondary" size="md" icon="arrow-right" iconPosition="right">
                  {currentStep === totalSteps ? 'Register Worker' : 'Next Step →'}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200">
        WorkConnect Registration
      </footer>
    </div>
  );
};
