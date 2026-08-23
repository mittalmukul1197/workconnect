import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { WorkPassportCard } from '../../components/features/WorkPassportCard';
import { useAuth } from '../../context/AuthContext';
import { useAutoTranslate } from '../../hooks/useAutoTranslate';

export const WorkerOnboardingPage = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { registerCustomUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Basic Details
  const [fullName, setFullName] = useState('Sunita Sharma');
  const [phone, setPhone] = useState('+91 98765 11111');
  const [email, setEmail] = useState('sunita@demo.com');
  const [gender, setGender] = useState('Female');

  // Step 2: Verification, Work Zone & Disability Status
  const [idVerified, setIdVerified] = useState('Verified (Aadhaar KYC Completed)');
  const [workRadiusKm, setWorkRadiusKm] = useState('10 km');
  const [hasDisability, setHasDisability] = useState(false);
  const [disabilityTypes, setDisabilityTypes] = useState(['Locomotor / Physical Disability']);
  const [disabilityOther, setDisabilityOther] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState(['Wheelchair accessible workplace', 'Flexible working hours']);
  const [accessibilityOther, setAccessibilityOther] = useState('');
  const [additionalAccessibilityNotes, setAdditionalAccessibilityNotes] = useState('');

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
      // Final Submit with all complete worker registration data
      const userData = {
        name: fullName,
        phone,
        email,
        gender,
        hasDisability,
        disabilityTypes: hasDisability ? disabilityTypes : [],
        disabilityOther: (hasDisability && disabilityTypes.includes('Other')) ? disabilityOther : '',
        accessibilityNeeds: hasDisability ? accessibilityNeeds : [],
        accessibilityOther: (hasDisability && accessibilityNeeds.includes('Other')) ? accessibilityOther : '',
        additionalAccessibilityNotes: hasDisability ? additionalAccessibilityNotes : '',
        disabilityType: hasDisability ? (disabilityTypes.length > 0 ? disabilityTypes.join(', ') : (disabilityOther || 'Person with Disability')) : '',
        disabilityAccommodations: hasDisability ? accessibilityNeeds : [],
        idVerified,
        workRadiusKm,
        role: 'worker',
        profession: `${primarySkill} Specialist`,
        primarySkill,
        secondarySkills,
        skillsList: [primarySkill, ...secondarySkills.split(',').map((s) => s.trim()).filter(Boolean)],
        experienceYears,
        portfolioSummary,
        expectedRate,
        dailyCapacity,
        preferredShift,
        streetAddress,
        area,
        city,
        pincode,
        address: `${streetAddress}, ${area}, ${city} - ${pincode}`,
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
            'High Reliability',
            ...(hasDisability ? ['♿ PwD Inclusive Worker'] : [])
          ]
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

  const disabilityOptions = [
    'Locomotor / Physical Disability',
    'Visual Disability',
    'Hearing Disability',
    'Speech Disability',
    'Intellectual Disability',
    'Specific Learning Disability',
    'Mental Health / Psychosocial Disability',
    'Multiple Disabilities',
    'Other'
  ];

  const accommodationOptions = [
    'Wheelchair accessible workplace',
    'Ramp / step-free access',
    'Accessible washroom',
    'Flexible working hours',
    'Work-from-home / remote work',
    'Sign language support',
    'Hearing assistance',
    'Screen reader compatible tools',
    'Large text / visual assistance',
    'Accessible transportation',
    'Seating accommodation',
    'Additional break requirements',
    'Other'
  ];

  const shiftOptions = [
    'Full Day (9:00 AM - 6:00 PM)',
    'Morning Shift (8:00 AM - 2:00 PM)',
    'Evening Shift (2:00 PM - 8:00 PM)',
    'Home-based Workshop',
    'On-site Doorstep Delivery'
  ];

  // Auto Translate all options dynamically
  const transSkills = useAutoTranslate(skillOptions, currentLang);
  const transDisabilities = useAutoTranslate(disabilityOptions, currentLang);
  const transAccommodations = useAutoTranslate(accommodationOptions, currentLang);
  const transShifts = useAutoTranslate(shiftOptions, currentLang);

  const previewWorker = {
    id: 'usr-wrk-new',
    name: fullName || 'Sunita Sharma',
    profession: `${transSkills[primarySkill] || primarySkill} Specialist`,
    city: city || 'Rajpura',
    state: 'Punjab',
    avatar: gender === 'Male'
      ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    hasDisability,
    disabilityTypes: hasDisability ? disabilityTypes : [],
    accessibilityNeeds: hasDisability ? accessibilityNeeds : [],
    disabilityType: hasDisability ? (disabilityTypes.length > 0 ? disabilityTypes.map(t => transDisabilities[t] || t).join(', ') : 'Person with Disability') : '',
    disabilityAccommodations: hasDisability ? accessibilityNeeds.map(n => transAccommodations[n] || n) : [],
    gender
  };

  const previewProfile = {
    experienceYears,
    skills: [
      { name: transSkills[primarySkill] || primarySkill, score: 96 },
      { name: 'Quality Craftsmanship', score: 94 }
    ],
    workPassport: {
      totalCompletedJobs: 147,
      onTimeRate: 96,
      qualityScore: 94,
      overallRating: 4.9,
      verifiedBadges: [
        'KYC Verified',
        'Top Rated Artisan',
        ...(hasDisability ? ['♿ PwD Inclusive Worker'] : [])
      ]
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 flex-1 w-full">
        {/* Progress Bar & Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
            <span>{t('onboarding.stepOf', { current: currentStep, total: totalSteps })}</span>
            <span>•</span>
            <span>{t('onboarding.workerBadge')}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">{t('onboarding.workerTitle')}</h1>

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
                      <h3 className="font-bold text-sm text-slate-900">{t('onboarding.step1_worker_title')}</h3>
                      <p className="text-[11px] text-slate-500">{t('onboarding.step1_worker_desc')}</p>
                    </div>
                  </div>

                  <Input
                    label={t('onboarding.fullName')}
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sunita Sharma"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label={t('phoneNumber')}
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 11111"
                    />
                    <Input
                      label={t('email')}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. worker@demo.com"
                    />
                    <Select
                      label={t('gender')}
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      options={['Female', 'Male', 'Non-Binary', 'Prefer not to say']}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: VERIFICATION & DISABILITY / ACCESSIBILITY */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon name="shield-check" className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{t('onboarding.step2_worker_title')}</h3>
                      <p className="text-[11px] text-slate-500">{t('onboarding.step2_worker_desc')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select
                      label={t('onboarding.idVerification')}
                      value={idVerified}
                      onChange={(e) => setIdVerified(e.target.value)}
                      options={[
                        'Verified (Aadhaar KYC Completed)',
                        'PAN / Voter ID Verified',
                        'Pending Verification'
                      ]}
                    />

                    <Select
                      label={t('onboarding.travelRadius')}
                      value={workRadiusKm}
                      onChange={(e) => setWorkRadiusKm(e.target.value)}
                      options={['5 km radius', '10 km radius', '15 km radius', 'Entire City & District']}
                    />
                  </div>

                  {/* DISABILITY & ACCESSIBILITY SECTION */}
                  <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
                    <div className="space-y-1 border-b border-slate-200 pb-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                          <Icon name="shield-check" className="w-4 h-4 text-purple-600" />
                          <span>{t('onboarding.disabilitySection')}</span>
                        </h4>
                        <Badge variant="purple" className="text-[10px]">{t('onboarding.inclusiveWorkforce')}</Badge>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium">
                        {t('onboarding.disabilityQuestion')}
                      </p>
                      <p className="text-[10px] text-indigo-600 font-semibold pt-0.5">
                        {t('onboarding.disabilityTip')}
                      </p>
                    </div>

                    {/* YES / NO SELECTOR */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setHasDisability(false);
                        }}
                        className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          !hasDisability
                            ? 'border-emerald-600 bg-emerald-50/90 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                            !hasDisability ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                          }`}>
                            {!hasDisability && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <span className="text-xs font-bold">{t('onboarding.disabilityNo')}</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setHasDisability(true);
                          if (disabilityTypes.length === 0) setDisabilityTypes(['Locomotor / Physical Disability']);
                          if (accessibilityNeeds.length === 0) setAccessibilityNeeds(['Wheelchair accessible workplace', 'Flexible working hours']);
                        }}
                        className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          hasDisability
                            ? 'border-purple-600 bg-purple-50/90 text-purple-950 font-bold ring-2 ring-purple-500/20'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                            hasDisability ? 'border-purple-600 bg-purple-600' : 'border-slate-300'
                          }`}>
                            {hasDisability && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <span className="text-xs font-bold">{t('onboarding.disabilityYes')}</span>
                        </div>
                      </button>
                    </div>

                    {/* DYNAMIC DISABILITY & ACCESSIBILITY DETAILS WHEN YES */}
                    {hasDisability && (
                      <div className="space-y-5 pt-3 border-t border-slate-200 animate-fade-in">
                        {/* DISABILITY TYPE SELECTOR */}
                        <div className="space-y-2">
                          <label className="font-bold text-slate-800 text-xs block">
                            {t('onboarding.disabilityTypeLabel')}
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {disabilityOptions.map((type) => {
                              const isChecked = disabilityTypes.includes(type);
                              return (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => {
                                    if (isChecked) {
                                      setDisabilityTypes(disabilityTypes.filter((t) => t !== type));
                                    } else {
                                      setDisabilityTypes([...disabilityTypes, type]);
                                    }
                                  }}
                                  className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 ${
                                    isChecked
                                      ? 'border-purple-600 bg-purple-100/80 text-purple-950 font-bold shadow-2xs'
                                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  <Icon name={isChecked ? 'check-circle' : 'circle'} className={`w-4 h-4 shrink-0 ${isChecked ? 'text-purple-700' : 'text-slate-400'}`} />
                                  <span>{transDisabilities[type] || type}</span>
                                </button>
                              );
                            })}
                          </div>

                          {disabilityTypes.includes('Other') && (
                            <div className="pt-2 animate-fade-in">
                              <Input
                                label="Other — Please specify *"
                                required
                                value={disabilityOther}
                                onChange={(e) => setDisabilityOther(e.target.value)}
                                placeholder="Describe your specific disability type..."
                              />
                            </div>
                          )}
                        </div>

                        {/* ACCESSIBILITY ACCOMMODATIONS SELECTOR */}
                        <div className="space-y-2 pt-2 border-t border-slate-200">
                          <label className="font-bold text-slate-800 text-xs block">
                            {t('onboarding.accessibilityLabel')}
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {accommodationOptions.map((need) => {
                              const isChecked = accessibilityNeeds.includes(need);
                              return (
                                <button
                                  key={need}
                                  type="button"
                                  onClick={() => {
                                    if (isChecked) {
                                      setAccessibilityNeeds(accessibilityNeeds.filter((n) => n !== need));
                                    } else {
                                      setAccessibilityNeeds([...accessibilityNeeds, need]);
                                    }
                                  }}
                                  className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 ${
                                    isChecked
                                      ? 'border-indigo-600 bg-indigo-100/80 text-indigo-950 font-bold shadow-2xs'
                                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  <Icon name={isChecked ? 'check-circle' : 'circle'} className={`w-4 h-4 shrink-0 ${isChecked ? 'text-indigo-700' : 'text-slate-400'}`} />
                                  <span>{transAccommodations[need] || need}</span>
                                </button>
                              );
                            })}
                          </div>

                          {accessibilityNeeds.includes('Other') && (
                            <div className="pt-2 animate-fade-in">
                              <Input
                                label="Other Accommodation — Please specify *"
                                required
                                value={accessibilityOther}
                                onChange={(e) => setAccessibilityOther(e.target.value)}
                                placeholder="Describe other specific accommodation needed..."
                              />
                            </div>
                          )}

                          <div className="pt-2">
                            <label className="font-bold text-slate-700 text-[11px] block mb-1">
                              {t('onboarding.additionalAccessibility')}
                            </label>
                            <textarea
                              rows={2}
                              value={additionalAccessibilityNotes}
                              onChange={(e) => setAdditionalAccessibilityNotes(e.target.value)}
                              placeholder="Any additional notes regarding workspace accessibility or support staff assistance..."
                              className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
                      <h3 className="font-bold text-sm text-slate-900">{t('onboarding.step3_worker_title')}</h3>
                      <p className="text-[11px] text-slate-500">{t('onboarding.step3_worker_desc')}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('onboarding.primarySkillLabel')}</label>
                    <select
                      value={primarySkill}
                      onChange={(e) => setPrimarySkill(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                    >
                      {skillOptions.map((opt) => (
                        <option key={opt} value={opt}>{transSkills[opt] || opt}</option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label={t('onboarding.secondarySkillsLabel')}
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
                      <h3 className="font-bold text-sm text-slate-900">{t('onboarding.step4_worker_title')}</h3>
                      <p className="text-[11px] text-slate-500">{t('onboarding.step4_worker_desc')}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('onboarding.yearsExperience')}</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      required
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(parseInt(e.target.value, 10) || 0)}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-emerald-700 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('onboarding.workSummary')}</label>
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
                      <h3 className="font-bold text-sm text-slate-900">{t('onboarding.step5_worker_title')}</h3>
                      <p className="text-[11px] text-slate-500">{t('onboarding.step5_worker_desc')}</p>
                    </div>
                  </div>

                  <Input
                    label={t('onboarding.expectedPayRate')}
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
                      <h3 className="font-bold text-sm text-slate-900">{t('onboarding.step6_worker_title')}</h3>
                      <p className="text-[11px] text-slate-500">{t('onboarding.step6_worker_desc')}</p>
                    </div>
                  </div>

                  <Input
                    label={t('onboarding.dailyWorkCapacity')}
                    required
                    value={dailyCapacity}
                    onChange={(e) => setDailyCapacity(e.target.value)}
                    placeholder="e.g. 30 pieces/day or Full Day Available"
                  />

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px] tracking-wider">{t('onboarding.preferredShift')}</label>
                    <select
                      value={preferredShift}
                      onChange={(e) => setPreferredShift(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                    >
                      {shiftOptions.map((opt) => (
                        <option key={opt} value={opt}>{transShifts[opt] || opt}</option>
                      ))}
                    </select>
                  </div>
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
                      <h3 className="font-bold text-sm text-slate-900">{t('onboarding.step7_worker_title')}</h3>
                      <p className="text-[11px] text-slate-500">{t('onboarding.step7_worker_desc')}</p>
                    </div>
                  </div>

                  <Input
                    label={t('onboarding.streetAddressHouse')}
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. House #42, Street 3"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label={t('onboarding.areaLocality')}
                      required
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. Model Town"
                    />
                    <Input
                      label={t('common.city')}
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Rajpura"
                    />
                    <Input
                      label={t('onboarding.pinCode')}
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
                      <h3 className="font-bold text-sm text-slate-900">{t('onboarding.step8_worker_title')}</h3>
                      <p className="text-[11px] text-slate-500">{t('onboarding.step8_worker_desc')}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-base text-slate-900">{fullName}</h4>
                        <p className="text-xs text-emerald-700 font-bold">{transSkills[primarySkill] || primarySkill} Specialist • {experienceYears} Yrs Exp.</p>
                        <p className="text-xs text-slate-500 mt-0.5">{streetAddress}, {area}, {city} ({gender})</p>
                      </div>
                      <Badge variant="success">{t('onboarding.topArtisan')}</Badge>
                    </div>

                    {hasDisability && (
                      <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Badge variant="purple" className="text-[10px]">{t('onboarding.inclusiveWorkforce')}</Badge>
                          <span className="text-[11px] font-bold text-purple-900">
                            {disabilityTypes.map(t => transDisabilities[t] || t).join(', ')}
                          </span>
                        </div>
                        {accessibilityNeeds.length > 0 && (
                          <p className="text-[10px] text-purple-700">
                            {t('onboarding.accommodations')} {accessibilityNeeds.map(n => transAccommodations[n] || n).join(', ')}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="pt-2 border-t border-emerald-200 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('onboarding.capacity')}</span>
                        <span className="font-bold text-slate-800">{dailyCapacity}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">{t('onboarding.expectedPay')}</span>
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
                    {t('onboarding.back')}
                  </Button>
                ) : <div />}

                <Button type="submit" variant="secondary" size="md" icon="arrow-right" iconPosition="right">
                  {currentStep === totalSteps ? t('onboarding.completeProfile') : t('onboarding.nextStep')}
                </Button>
              </div>

            </form>
          </Card>

          {/* Live Passport Card Preview (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider text-center lg:text-left">
              {t('onboarding.livePreview')}
            </h3>
            <WorkPassportCard workerUser={previewWorker} profile={previewProfile} compact />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200">
        {t('onboarding.footer_worker')}
      </footer>
    </div>
  );
};
