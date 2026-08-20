import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';

export const BusinessOnboardingPage = ({ onNavigate }) => {
  const { registerCustomUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Basic Details
  const [contactName, setContactName] = useState('Ananya Verma');
  const [email, setEmail] = useState('ananya@craftedthreads.com');
  const [phone, setPhone] = useState('+91 98765 43210');

  // Step 2: Business Details
  const [businessName, setBusinessName] = useState('Crafted Threads Boutique');
  const [gstin, setGstin] = useState('03AAAAA0000A1Z5');
  const [establishedYear, setEstablishedYear] = useState('2019');

  // Step 3: Business Type
  const [businessType, setBusinessType] = useState('Apparel & Tailoring');

  // Step 4: Location
  const [streetAddress, setStreetAddress] = useState('Shop #14, Main Market');
  const [area, setArea] = useState('Sector 2, Focal Point');
  const [city, setCity] = useState('Rajpura');
  const [pincode, setPincode] = useState('140401');

  // Step 5: Workers Required
  const [workerCount, setWorkerCount] = useState(2);
  const [workerTypeNeeded, setWorkerTypeNeeded] = useState('Skilled Tailor & Stitcher');
  const [urgency, setUrgency] = useState('Immediate (< 24 hrs)');

  // Step 6: Work Details
  const [workDescription, setWorkDescription] = useState('Bulk stitching for 100 ladies kurtis with piping & button work.');
  const [durationDays, setDurationDays] = useState('5 Days');

  // Step 7: Budget / Salary
  const [offeredBudget, setOfferedBudget] = useState('₹35 per piece (~₹700/day)');

  const totalSteps = 8;

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Submit
      const userData = {
        name: businessName,
        contactPerson: contactName,
        email,
        phone,
        role: 'business',
        clientType: 'business',
        industry: businessType,
        address: `${streetAddress}, ${area}, ${city} - ${pincode}`,
        city,
        verified: true,
        rating: 4.9,
        activeWorkNeed: {
          workerCount,
          workerTypeNeeded,
          workDescription,
          durationDays,
          offeredBudget
        }
      };

      registerCustomUser(userData);
      onNavigate('/business/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const businessTypes = [
    'Apparel & Tailoring',
    'Retail Store & Shop',
    'Electrical & Solar',
    'Construction & Civil',
    'Food & Hospitality',
    'Workshop & Manufacturing',
    'Salon & Beauty Care',
    'Software & Digital Services',
    'Other Service Industry'
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />

      <main className="max-w-2xl mx-auto px-4 py-12 space-y-6 flex-1 w-full">
        {/* Progress Bar & Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>•</span>
            <span>Business Onboarding</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">Setup Your Business Profile</h1>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx + 1 === currentStep
                    ? 'w-8 bg-indigo-600'
                    : idx + 1 < currentStep
                    ? 'w-3 bg-emerald-500'
                    : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <Card borderVariant="indigo" className="p-6 sm:p-8 space-y-6 bg-white shadow-md">
          <form onSubmit={handleNext} className="space-y-5 text-xs">

            {/* STEP 1: BASIC DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon name="user" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Step 1: Basic Contact Details</h3>
                    <p className="text-[11px] text-slate-500">Contact person info for workforce coordination</p>
                  </div>
                </div>

                <Input
                  label="Contact Person Name *"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Ananya Verma"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Business Email Address *"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. business@demo.com"
                  />
                  <Input
                    label="Phone Number *"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: BUSINESS DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon name="building" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Step 2: Business & Firm Details</h3>
                    <p className="text-[11px] text-slate-500">Official business identity & registration</p>
                  </div>
                </div>

                <Input
                  label="Business / Firm / Company Name *"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Crafted Threads Boutique"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="GSTIN / License Number (Optional)"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="e.g. 03AAAAA0000A1Z5"
                  />
                  <Input
                    label="Year Established *"
                    type="number"
                    required
                    value={establishedYear}
                    onChange={(e) => setEstablishedYear(e.target.value)}
                    placeholder="e.g. 2019"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: BUSINESS TYPE */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon name="sparkles" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Step 3: Select Business Type Category</h3>
                    <p className="text-[11px] text-slate-500">Helps AI match relevant skilled workers</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {businessTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBusinessType(type)}
                      className={`p-3.5 rounded-xl border text-left font-semibold transition-all ${
                        businessType === type
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: LOCATION */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon name="map-pin" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Step 4: Business Location & Address</h3>
                    <p className="text-[11px] text-slate-500">Coordinates nearby worker discovery radius</p>
                  </div>
                </div>

                <Input
                  label="Street Address / Shop Number *"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="e.g. Shop #14, Main Market"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input
                    label="Area / Landmark *"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Sector 2, Focal Point"
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

            {/* STEP 5: WORKERS REQUIRED */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon name="users" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Step 5: Workers Required</h3>
                    <p className="text-[11px] text-slate-500">Specify workforce count & skill profile needed</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Number of Workers Needed *</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      required
                      value={workerCount}
                      onChange={(e) => setWorkerCount(parseInt(e.target.value, 10))}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-indigo-700 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <Input
                    label="Required Worker Skill Role *"
                    required
                    value={workerTypeNeeded}
                    onChange={(e) => setWorkerTypeNeeded(e.target.value)}
                    placeholder="e.g. Skilled Tailor, Electrician, Labourer"
                  />
                </div>

                <Select
                  label="Urgency / Start Timeline *"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  options={[
                    'Immediate (< 24 hrs)',
                    'Within 2-3 Days',
                    'Next Week',
                    'Flexible Schedule'
                  ]}
                />
              </div>
            )}

            {/* STEP 6: WORK DETAILS */}
            {currentStep === 6 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon name="briefcase" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Step 6: Work Details & Scope</h3>
                    <p className="text-[11px] text-slate-500">Describe specific task output requirements</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">Work Task Description & Guidelines *</label>
                  <textarea
                    rows={3}
                    required
                    value={workDescription}
                    onChange={(e) => setWorkDescription(e.target.value)}
                    placeholder="e.g. Need 2 master tailors for stitching 100 kurtis with piping."
                    className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>

                <Input
                  label="Estimated Duration / Timeline *"
                  required
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                  placeholder="e.g. 5 Days"
                />
              </div>
            )}

            {/* STEP 7: BUDGET / SALARY */}
            {currentStep === 7 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon name="currency" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Step 7: Offered Budget & Pay Rate</h3>
                    <p className="text-[11px] text-slate-500">Daily wage, monthly salary, or piece-rate offered</p>
                  </div>
                </div>

                <Input
                  label="Offered Budget / Pay Rate *"
                  required
                  value={offeredBudget}
                  onChange={(e) => setOfferedBudget(e.target.value)}
                  placeholder="e.g. ₹600/day or ₹35/pc"
                />
                <p className="text-[11px] text-slate-500 italic">
                  💡 Transparent compensation rates increase worker acceptance rates by up to 85%!
                </p>
              </div>
            )}

            {/* STEP 8: BUSINESS PROFILE SUMMARY */}
            {currentStep === 8 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon name="check-circle" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Step 8: Review Business Profile</h3>
                    <p className="text-[11px] text-slate-500">Confirm your compiled business profile credentials</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">{businessName}</h4>
                      <p className="text-xs text-indigo-700 font-bold">{businessType} • Est. {establishedYear}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{streetAddress}, {area}, {city} ({pincode})</p>
                    </div>
                    <Badge variant="success">Verified Business</Badge>
                  </div>

                  <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Contact Person</span>
                      <span className="font-bold text-slate-800">{contactName} ({phone})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Need</span>
                      <span className="font-bold text-slate-800">{workerCount} × {workerTypeNeeded}</span>
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

              <Button type="submit" variant="primary" size="md" icon="arrow-right" iconPosition="right">
                {currentStep === totalSteps ? 'Complete Profile & Open Dashboard' : 'Next Step →'}
              </Button>
            </div>

          </form>
        </Card>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200">
        WorkConnect Business Profile Setup
      </footer>
    </div>
  );
};
