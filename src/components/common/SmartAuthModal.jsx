import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icon';
import { Button } from './Button';
import { Badge } from './Badge';
import { Input } from './Input';
import { Select } from './Select';
import { useAuth } from '../../context/AuthContext';

export const SmartAuthModal = ({ isOpen, onClose, onNavigate }) => {
  const { t } = useTranslation();
  const { registerCustomUser } = useAuth();

  // Mode: '' | 'household' | 'business' | 'worker'
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
  const [bWorkDesc, setBWorkDesc] = useState('Bulk stitching for 100 ladies kurtis with piping.');
  const [bDurationDays, setBDurationDays] = useState('5 Days');
  const [bBudget, setBBudget] = useState('₹35 per piece (~₹700/day)');

  // --- WORKER INPUT FIELDS ---
  const [wName, setWName] = useState('Sunita Sharma');
  const [wPhone, setWPhone] = useState('+91 98765 11111');
  const [wEmail, setWEmail] = useState('sunita@demo.com');
  const [wIdVerified, setWIdVerified] = useState('Verified (Aadhaar KYC Completed)');
  const [wRadiusKm, setWRadiusKm] = useState('10 km');
  const [wPrimarySkill, setWPrimarySkill] = useState('Tailor & Stitching');
  const [wSecondarySkills, setWSecondarySkills] = useState('Alterations, Embroidery');
  const [wExpYears, setWExpYears] = useState(6);
  const [wPortfolio, setWPortfolio] = useState('Specialist in boutique ladies tailoring & suit stitching.');
  const [wExpectedRate, setWExpectedRate] = useState('₹700/day (or ₹35/piece)');
  const [wDailyCapacity, setWDailyCapacity] = useState('30 pieces/day');
  const [wShift, setWShift] = useState('Full Day (9:00 AM - 6:00 PM)');
  const [wStreet, setWStreet] = useState('House #42, Street 3');
  const [wArea, setWArea] = useState('Model Town');
  const [wCity, setWCity] = useState('Rajpura');
  const [wPincode, setWPincode] = useState('140401');

  if (!isOpen) return null;

  const totalSteps = 8;

  const handleReset = () => {
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
      role: 'business',
      clientType: 'household',
      industry: 'Household Client',
      email: `${(hName || 'user').toLowerCase().replace(/\s+/g, '')}@workconnect.com`,
      verified: true,
      rating: 4.9
    };

    registerCustomUser(userData);
    onClose();
    if (onNavigate) onNavigate('/business/dashboard');
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
        userData = {
          name: wName,
          phone: wPhone,
          email: wEmail,
          role: 'worker',
          profession: `${wPrimarySkill} Specialist`,
          city: wCity,
          state: 'Punjab',
          address: `${wStreet}, ${wArea}, ${wCity} - ${wPincode}`,
          verified: true,
          rating: 4.9,
          experienceYears: wExpYears,
          skillsList: [wPrimarySkill, ...wSecondarySkills.split(',').map((s) => s.trim())],
          workPassport: {
            totalCompletedJobs: 147,
            onTimeRate: 96,
            qualityScore: 94,
            overallRating: 4.9,
            verifiedBadges: ['KYC Verified', 'Top Rated Artisan']
          }
        };
      }

      registerCustomUser(userData);
      onClose();
      if (onNavigate) {
        onNavigate(userData.role === 'business' ? '/business/dashboard' : '/worker/dashboard');
      }
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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl text-slate-900 my-auto max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-0.5 flex items-center justify-center shadow-md animate-logo-pulse">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Icon name="zap" className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">WorkConnect Onboarding</h3>
                <Badge variant="primary">Smart Setup</Badge>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">{t('auth.subtitle')}</p>
            </div>
          </div>

          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">

          {/* STEP 0: CHOOSE ROLE MODE (HOUSEHOLD VS BUSINESS VS WORKER) */}
          {!roleMode && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center space-y-1">
                <h4 className="font-bold text-lg text-slate-900">{t('auth.selectRole')}</h4>
                <p className="text-xs text-slate-500">{t('auth.subtitle')}</p>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={() => setRoleMode('household')}
                  className="w-full p-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-600 hover:text-white text-left flex items-center gap-4 group transition-all shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 group-hover:bg-white group-hover:text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                    <Icon name="user" className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 group-hover:text-white">{t('auth.householdTitle')}</h5>
                    <p className="text-[11px] text-slate-600 group-hover:text-indigo-100">{t('auth.householdDesc')}</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => { setRoleMode('business'); setCurrentStep(1); }}
                  className="w-full p-4 rounded-2xl border border-purple-200 bg-purple-50/50 hover:bg-purple-600 hover:text-white text-left flex items-center gap-4 group transition-all shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-purple-600 group-hover:bg-white group-hover:text-purple-600 flex items-center justify-center shadow-xs shrink-0">
                    <Icon name="building" className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 group-hover:text-white">{t('auth.businessTitle')}</h5>
                    <p className="text-[11px] text-slate-600 group-hover:text-purple-100">{t('auth.businessDesc')}</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => { setRoleMode('worker'); setCurrentStep(1); }}
                  className="w-full p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-600 hover:text-white text-left flex items-center gap-4 group transition-all shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 group-hover:bg-white group-hover:text-emerald-600 flex items-center justify-center shadow-xs shrink-0">
                    <Icon name="zap" className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 group-hover:text-white">{t('auth.workerTitle')}</h5>
                    <p className="text-[11px] text-slate-600 group-hover:text-emerald-100">{t('auth.workerDesc')}</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* --- HOUSEHOLD FORM --- */}
          {roleMode === 'household' && (
            <form onSubmit={handleHouseholdSubmit} className="space-y-4 text-xs animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  ← {t('common.back')}
                </button>
                <Badge variant="indigo">{t('auth.householdTitle')}</Badge>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('common.name')} *</label>
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
                <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('common.area')} *</label>
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
                <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('common.phone')} *</label>
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
                {t('auth.registerHouseholdBtn')}
              </Button>
            </form>
          )}

          {/* --- BUSINESS FORM --- */}
          {roleMode === 'business' && (
            <form onSubmit={handleNextStep} className="space-y-4 text-xs animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1"
                >
                  ← {t('common.back')}
                </button>
                <Badge variant="purple">Step {currentStep} of {totalSteps}: {t('auth.businessTitle')}</Badge>
              </div>

              {currentStep === 1 && (
                <div className="space-y-3 animate-fade-in">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">1. Basic Details</h4>
                  <Input label={t('common.name')} required value={bContactName} onChange={(e) => setBContactName(e.target.value)} />
                  <Input label={t('common.email')} type="email" required value={bEmail} onChange={(e) => setBEmail(e.target.value)} />
                  <Input label={t('common.phone')} type="tel" required value={bPhone} onChange={(e) => setBPhone(e.target.value)} />
                </div>
              )}

              {currentStep > 1 && (
                <div className="space-y-3 animate-fade-in">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">{bName}</h4>
                  <Input label="Business Name *" required value={bName} onChange={(e) => setBName(e.target.value)} />
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                {currentStep > 1 ? (
                  <Button type="button" variant="ghost" size="sm" onClick={handlePrevStep}>
                    ← {t('common.back')}
                  </Button>
                ) : <div />}

                <Button type="submit" variant="primary" size="sm" icon="arrow-right" iconPosition="right">
                  {currentStep === totalSteps ? t('auth.registerBusinessBtn') : t('common.next')}
                </Button>
              </div>
            </form>
          )}

          {/* --- WORKER FORM --- */}
          {roleMode === 'worker' && (
            <form onSubmit={handleNextStep} className="space-y-4 text-xs animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                >
                  ← {t('common.back')}
                </button>
                <Badge variant="success">Step {currentStep} of {totalSteps}: {t('auth.workerTitle')}</Badge>
              </div>

              {currentStep === 1 && (
                <div className="space-y-3 animate-fade-in">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">1. Basic Details</h4>
                  <Input label={t('common.name')} required value={wName} onChange={(e) => setWName(e.target.value)} />
                  <Input label={t('common.phone')} type="tel" required value={wPhone} onChange={(e) => setWPhone(e.target.value)} />
                  <Input label={t('common.email')} type="email" required value={wEmail} onChange={(e) => setWEmail(e.target.value)} />
                </div>
              )}

              {currentStep > 1 && (
                <div className="space-y-3 animate-fade-in">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">{wName}</h4>
                  <Select label="Skill Category *" value={wPrimarySkill} onChange={(e) => setWPrimarySkill(e.target.value)} options={workerSkillsList} />
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                {currentStep > 1 ? (
                  <Button type="button" variant="ghost" size="sm" onClick={handlePrevStep}>
                    ← {t('common.back')}
                  </Button>
                ) : <div />}

                <Button type="submit" variant="secondary" size="sm" icon="arrow-right" iconPosition="right">
                  {currentStep === totalSteps ? t('auth.registerWorkerBtn') : t('common.next')}
                </Button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
};
