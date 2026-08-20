import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/common/Footer';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Icon } from '../../components/common/Icon';
import { OnDemandBookingModal } from '../../components/common/OnDemandBookingModal';
import { OpenWorkOffersSection } from '../../components/features/OpenWorkOffersSection';
import { CATEGORIES, MOCK_STATS, ON_DEMAND_SERVICES } from '../../data/mockData';
import { parseNaturalLanguageRequirement } from '../../services/workDecomposer';

export const LandingPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [nlPrompt, setNlPrompt] = useState('Mujhe 100 kurtis stitch karwani hain 5 din mein, 2 nearby workers chahiye.');
  const [extractedResult, setExtractedResult] = useState(null);

  // On-Demand Services State
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');
  const [onDemandSearch, setOnDemandSearch] = useState('');
  const [activeBookingService, setActiveBookingService] = useState(null);

  const handleTestParse = () => {
    const res = parseNaturalLanguageRequirement(nlPrompt);
    setExtractedResult(res);
  };

  // Quick prompt filler from on-demand quote
  const handleQuickQuote = (serviceName, defaultTask) => {
    const promptText = `Mujhe instant ${serviceName} chahiye for ${defaultTask}. Nearby worker match kijiye.`;
    setNlPrompt(promptText);
    const demoElement = document.getElementById('ai-demo-section');
    if (demoElement) demoElement.scrollIntoView({ behavior: 'smooth' });
    const res = parseNaturalLanguageRequirement(promptText);
    setExtractedResult(res);
  };

  // Filtered On-Demand Services
  const filteredServices = ON_DEMAND_SERVICES.filter((service) => {
    const matchesCategory =
      selectedCategoryTab === 'all' || service.categoryKey === selectedCategoryTab;
    const matchesSearch =
      service.name.toLowerCase().includes(onDemandSearch.toLowerCase()) ||
      service.tagline.toLowerCase().includes(onDemandSearch.toLowerCase()) ||
      service.popularTasks.some((t) => t.toLowerCase().includes(onDemandSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categoryTabs = [
    { key: 'all', label: 'All Services', icon: 'sparkles' },
    { key: 'labour', label: 'Daily Labour', icon: 'hard-hat' },
    { key: 'electrician', label: 'Electricians', icon: 'zap' },
    { key: 'carpenter', label: 'Carpenters', icon: 'hammer' },
    { key: 'plumber', label: 'Plumbers', icon: 'droplet' },
    { key: 'painter', label: 'Painters', icon: 'brush' },
    { key: 'mason', label: 'Masons & Civil', icon: 'building' },
    { key: 'welder', label: 'Welders', icon: 'flame' },
    { key: 'appliance', label: 'Appliance & AC', icon: 'snowflake' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      <Navbar onNavigate={onNavigate} />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background Glowing Ambient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-200 text-xs font-semibold text-indigo-700 shadow-sm">
            <Icon name="sparkles" className="w-4 h-4 text-emerald-600" />
            <span>AI-Powered Workforce & On-Demand Service Network</span>
            <Badge variant="success">WORK ↔ CAPABILITY</Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            {t('landing.heroTagline')}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('landing.heroSubtitle')}
          </p>

          {/* DUAL EQUAL CTAS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              variant="primary"
              icon="building"
              onClick={() => onNavigate('/role-selection')}
              className="w-full sm:w-auto"
            >
              {t('landing.directHireCta')}
            </Button>

            <Button
              size="lg"
              variant="secondary"
              icon="user"
              onClick={() => onNavigate('/role-selection')}
              className="w-full sm:w-auto"
            >
              {t('landing.skilledDemandCta')}
            </Button>
          </div>

          {/* QUICK ON-DEMAND SERVICE SHORTCUT CHIPS */}
          <div className="pt-6 max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              ⚡ Need Instant On-Demand Help?
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: '👷 Daily Labour', key: 'ods-labour' },
                { label: '⚡ Electrician', key: 'ods-electrician' },
                { label: '🔨 Carpenter', key: 'ods-carpenter' },
                { label: '🚰 Plumber', key: 'ods-plumber' },
                { label: '🎨 Painter', key: 'ods-painter' },
                { label: '❄️ AC Repair', key: 'ods-appliance' }
              ].map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => {
                    const target = ON_DEMAND_SERVICES.find((s) => s.id === chip.key);
                    if (target) setActiveBookingService(target);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 text-xs font-semibold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all shadow-xs"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* VISUAL TWO-SIDED NETWORK REPRESENTATION */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
            <Card hover={false} borderVariant="indigo" className="space-y-2 bg-white">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                <Icon name="building" className="w-4 h-4" />
                <span>BUSINESS ➔ WORKCONNECT ➔ PEOPLE</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Describe work or hire daily labor on-demand. AI extracts capacity needs and instantly ranks matched nearby workers.
              </p>
            </Card>

            <Card hover={false} borderVariant="emerald" className="space-y-2 bg-white">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                <Icon name="user" className="w-4 h-4" />
                <span>PEOPLE ➔ WORKCONNECT ➔ BUSINESS</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Publish daily available capacity (*"30 pcs/day"* or *"Available for Electrical Visit"*). Discover nearby businesses seeking your skills.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FLAGSHIP FEATURE BENEFIT CARDS SHOWCASE */}
      <section id="on-demand-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <SectionHeading
          badge="Platform Core Capabilities"
          title="Two Ways To Connect With Skilled Workforce"
          highlightTitle="On-Demand or Custom Budget"
          description="WorkConnect offers doorstep trade services and custom budget work proposals tailored for local employers and households."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* BENEFIT CARD 1: ON-DEMAND SKILLED SERVICES */}
          <Card borderVariant="indigo" className="p-8 space-y-6 bg-white shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-xs">
                  <Icon name="zap" className="w-7 h-7" />
                </div>
                <Badge variant="success">Instant Doorstep Booking</Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {t('landing.onDemandTitle')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {t('landing.onDemandSubtitle')}
                </p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-md bg-emerald-50 text-emerald-600 font-bold shrink-0 mt-0.5">
                    <Icon name="check-circle" className="w-4 h-4" />
                  </div>
                  <span><strong>Instant Dispatch:</strong> Automated radial locator matches closest available tradesman in under 15 minutes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-md bg-indigo-50 text-indigo-600 font-bold shrink-0 mt-0.5">
                    <Icon name="check-circle" className="w-4 h-4" />
                  </div>
                  <span><strong>Upfront Pricing:</strong> Fixed rates starting from ₹349 for Electricians, Plumbers, Carpenters, Daily Helpers, Painters & Masons.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-md bg-purple-50 text-purple-600 font-bold shrink-0 mt-0.5">
                    <Icon name="check-circle" className="w-4 h-4" />
                  </div>
                  <span><strong>Verified Work Passports:</strong> Portable trust score, KYC identity verification, and past customer ratings.</span>
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon="arrow-right"
              iconPosition="right"
              fullWidth
              onClick={() => onNavigate('/role-selection')}
              className="mt-4"
            >
              {t('landing.skilledDemandCta')}
            </Button>
          </Card>

          {/* BENEFIT CARD 2: REVERSE BUDGET OFFER MARKETPLACE */}
          <Card borderVariant="emerald" className="p-8 space-y-6 bg-white shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
                  <Icon name="plus" className="w-7 h-7" />
                </div>
                <Badge variant="primary">Custom Budgeting</Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {t('landing.budgetOfferTitle')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {t('landing.budgetOfferSubtitle')}
                </p>
              </div>

              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-md bg-emerald-50 text-emerald-600 font-bold shrink-0 mt-0.5">
                    <Icon name="check-circle" className="w-4 h-4" />
                  </div>
                  <span><strong>Plain Language Work Posts:</strong> Describe your work in natural words (e.g., <i>"Need 2 painters for 1 room"</i>).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-md bg-indigo-50 text-indigo-600 font-bold shrink-0 mt-0.5">
                    <Icon name="check-circle" className="w-4 h-4" />
                  </div>
                  <span><strong>You Control Budget:</strong> Offer budget per day or per piece (e.g., ₹600/day or ₹35/piece).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-md bg-amber-50 text-amber-600 font-bold shrink-0 mt-0.5">
                    <Icon name="check-circle" className="w-4 h-4" />
                  </div>
                  <span><strong>Real-Time Acceptance:</strong> Workers matching your skill requirement and location review and accept live.</span>
                </li>
              </ul>
            </div>

            <Button
              variant="secondary"
              size="lg"
              icon="arrow-right"
              iconPosition="right"
              fullWidth
              onClick={() => onNavigate('/role-selection')}
              className="mt-4"
            >
              {t('landing.postCustomOfferCta')}
            </Button>
          </Card>
        </div>
      </section>

      {/* SKILLED TRADE CATEGORIES SHOWCASE SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 bg-white/60 rounded-3xl border border-slate-200/80 shadow-xs my-8">
        <SectionHeading
          badge="Verified Local Workforce"
          title="Browse Skilled Trade Categories"
          highlightTitle="1,000+ Active Professionals"
          description="Select a trade category below to hire verified local workers or view daily capacity availability."
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'cat-labour', name: 'Daily Labour & Site Helpers', count: '220+ Workers', icon: 'hard-hat', starting: '₹600 / day', tasks: ['Loading & Unloading', 'Site Clearance', 'Material Shifting'] },
            { id: 'cat-electrician', name: 'Electricians & Solar Wiring', count: '160+ Workers', icon: 'zap', starting: '₹399 / visit', tasks: ['House Wiring', 'Switchboard Repair', 'Inverter Setup'] },
            { id: 'cat-carpenter', name: 'Carpenters & Woodwork', count: '112+ Workers', icon: 'hammer', starting: '₹499 / visit', tasks: ['Furniture Repair', 'Door Locking', 'Modular Assembly'] },
            { id: 'cat-plumber', name: 'Plumbers & Pipe Fittings', count: '138+ Workers', icon: 'droplet', starting: '₹349 / visit', tasks: ['Tap Leak Fix', 'Bath Fitting', 'Water Tank Clean'] },
            { id: 'cat-painter', name: 'Painters & Waterproofing', count: '95+ Workers', icon: 'brush', starting: '₹550 / day', tasks: ['Wall Painting', 'Waterproofing', 'Texture Work'] },
            { id: 'cat-mason', name: 'Masons & Civil Work', count: '104+ Workers', icon: 'building', starting: '₹750 / day', tasks: ['Brick Work', 'Plastering', 'Tile Fitting'] },
            { id: 'cat-tailor', name: 'Apparel & Stitching Tailors', count: '142+ Workers', icon: 'scissors', starting: '₹30 / piece', tasks: ['Batch Stitching', 'Boutique Tailoring', 'Alterations'] },
            { id: 'cat-appliance', name: 'AC & Appliance Technicians', count: '108+ Workers', icon: 'snowflake', starting: '₹450 / visit', tasks: ['AC Servicing', 'Fridge Repair', 'Washing Machine'] }
          ].map((cat) => (
            <Card key={cat.id} borderVariant="indigo" className="p-5 space-y-4 bg-white shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon name={cat.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {cat.count}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">{cat.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Starting at <strong className="text-slate-800 font-bold">{cat.starting}</strong></p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {cat.tasks.map((task) => (
                    <span key={task} className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-600 font-medium border border-slate-200">
                      {task}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                icon="arrow-right"
                iconPosition="right"
                fullWidth
                onClick={() => onNavigate('/role-selection')}
                className="mt-2 text-xs font-bold text-indigo-700 hover:bg-indigo-50"
              >
                Explore & Hire
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION A: HOW WORKCONNECT WORKS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <SectionHeading
          badge="Two-Sided Process"
          title="How WorkConnect Works"
          highlightTitle="For Both Sides"
          description="A seamless, intelligent experience whether you are hiring workforce or offering capacity."
          center
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Business Flow */}
          <Card borderVariant="indigo" className="space-y-4 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
                <Icon name="building" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">For Businesses & Employers</h3>
                <p className="text-xs text-slate-500">Find the right people in 3 simple steps</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-slate-900">Describe Your Work Need</h4>
                  <p className="text-slate-600 mt-0.5">Enter natural language prompt like *"Mujhe 100 kurtis stitch karwani hain 5 din mein"*. AI handles structuring.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-slate-900">AI Candidate Ranking</h4>
                  <p className="text-slate-600 mt-0.5">System scores workers across 7 dimensions (Skill, Availability, Capacity, Location, Experience, Reliability, Budget).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-slate-900">Start Work & Self-Healing</h4>
                  <p className="text-slate-600 mt-0.5">Assign workers, track progress, and rely on automated dropout rebalancing if a worker becomes unavailable.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Worker Flow */}
          <Card borderVariant="emerald" className="space-y-4 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <Icon name="user" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">For Workers & Professionals</h3>
                <p className="text-xs text-slate-500">Find the right work in 3 simple steps</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-slate-900">Build Your Work Passport</h4>
                  <p className="text-slate-600 mt-0.5">List your skills, experience, verified credentials, and photos to establish trust.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-slate-900">Publish Daily Capacity</h4>
                  <p className="text-slate-600 mt-0.5">Set how many pieces or hours you can offer daily (*"30 pcs/day"*). System performs Reverse Matching.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-slate-900">Accept Work & Build Reputation</h4>
                  <p className="text-slate-600 mt-0.5">Receive job invitations, complete work orders, earn income, and increase your Work Passport rating.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION B: WHY WORKCONNECT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <SectionHeading
          badge="Platform Differentiators"
          title="Why WorkConnect Stands Apart"
          description="Designed to solve fragmented work coordination with transparency, trust, and intelligence."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-2 bg-white shadow-sm">
            <Icon name="sparkles" className="w-6 h-6 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">Intelligent 7-Dimension Matching</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Scores candidate fit across Skill, Availability, Capacity, Location, Experience, Reliability, and Budget Fit.</p>
          </Card>

          <Card className="space-y-2 bg-white shadow-sm">
            <Icon name="map-pin" className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Hyper-Local Discovery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Connects nearby businesses and micro-workers within custom radius zones using exact coordinate distance math.</p>
          </Card>

          <Card className="space-y-2 bg-white shadow-sm">
            <Icon name="shield-check" className="w-6 h-6 text-amber-600" />
            <h3 className="font-bold text-sm text-slate-900">Trust via Work Passport</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Credible worker trust profile showing completed jobs (147), 96% on-time delivery, and 2-way reputation ratings.</p>
          </Card>

          <Card className="space-y-2 bg-white shadow-sm">
            <Icon name="zap" className="w-6 h-6 text-rose-600" />
            <h3 className="font-bold text-sm text-slate-900">Reverse Capacity Matching</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Workers publish daily capacity from home; the platform discovers businesses looking for that capability.</p>
          </Card>

          <Card className="space-y-2 bg-white shadow-sm">
            <Icon name="sync" className="w-6 h-6 text-sky-600" />
            <h3 className="font-bold text-sm text-slate-900">Self-Healing Workforce</h3>
            <p className="text-xs text-slate-600 leading-relaxed">If a worker becomes unavailable, AI detects capacity gaps, deadline risk, and automatically rebalances work.</p>
          </Card>

          <Card className="space-y-2 bg-white shadow-sm">
            <Icon name="building" className="w-6 h-6 text-purple-600" />
            <h3 className="font-bold text-sm text-slate-900">Industry-Agnostic Network</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Supports retail, tailoring, electronics, catering, salons, skilled trades, digital work, and packaging.</p>
          </Card>
        </div>
      </section>

      {/* SECTION C: SUPPORTED WORK CATEGORIES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 bg-slate-100/60 rounded-3xl border border-slate-200">
        <SectionHeading
          badge="Industry Agnostic"
          title="Supported Work Categories"
          description="From local boutique tailoring and solar installations to digital design and retail packaging."
          center
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Card key={cat.id} className="p-4 space-y-2 text-center group cursor-pointer bg-white shadow-xs hover:shadow-md">
              <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Icon name={cat.icon} className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-slate-900 truncate">{cat.name}</h4>
              <span className="text-[10px] text-slate-500 font-medium">{cat.count}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION D: AI DEMO INTERACTIVE PARSER */}
      <section id="ai-demo-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <SectionHeading
          badge="Live AI Demo"
          title="Natural Language Requirement Parsing"
          description="Speak in plain words. AI automatically structures work order specs and calculates velocity."
          center
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <Card borderVariant="indigo" className="space-y-4 bg-white shadow-sm">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Input Plain Words (Hinglish/English)</label>
              <textarea
                value={nlPrompt}
                onChange={(e) => setNlPrompt(e.target.value)}
                rows={3}
                className="w-full p-3.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
              />
            </div>

            <Button size="md" variant="primary" icon="sparkles" onClick={handleTestParse} fullWidth>
              Test AI Requirement Extraction
            </Button>
          </Card>

          <div>
            {extractedResult ? (
              <Card borderVariant="emerald" className="space-y-4 animate-scale-up bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-xs text-indigo-700 uppercase">Structured Output</span>
                  <Badge variant="success">AI Extracted</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Work Type</span>
                    <p className="font-bold text-slate-900 mt-0.5">{extractedResult.workType}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Required Skill</span>
                    <p className="font-bold text-indigo-700 mt-0.5">{extractedResult.skillName}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Total Quota</span>
                    <p className="font-bold text-emerald-700 mt-0.5">{extractedResult.totalQuantity} {extractedResult.unitLabel}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Deadline Velocity</span>
                    <p className="font-bold text-amber-700 mt-0.5">{extractedResult.deadlineDays} Days (~{extractedResult.requiredDailyCapacityPerWorker}/day)</p>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-2 text-slate-500 text-xs bg-white">
                <Icon name="sparkles" className="w-8 h-8 mx-auto text-indigo-600" />
                <p>Click "Test AI Requirement Extraction" to view live parsed output.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION E: SELF-HEALING WORKFORCE PREVIEW */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-rose-50/50 rounded-3xl border border-rose-200">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <Badge variant="danger">Signature Innovation Teaser</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">
            "People can become unavailable.<br />
            <span className="text-gradient">Work shouldn't stop."</span>
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            When a worker drops out unexpectedly during a 100-piece order, WorkConnect automatically detects the capacity gap, calculates deadline risk, finds optimal replacement workers, and rebalances quota.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-6 text-left">
            <div className="p-3 rounded-xl bg-white border border-rose-200 shadow-xs text-xs">
              <span className="text-[10px] font-bold text-rose-700 uppercase">1. Dropout</span>
              <p className="font-semibold text-slate-900 mt-1">Worker C unavailable</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-xs text-xs">
              <span className="text-[10px] font-bold text-amber-800 uppercase">2. Gap Detected</span>
              <p className="font-semibold text-slate-900 mt-1">30 pcs shortfall risk</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-indigo-200 shadow-xs text-xs">
              <span className="text-[10px] font-bold text-indigo-700 uppercase">3. AI Matching</span>
              <p className="font-semibold text-slate-900 mt-1">Scores nearby candidates</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-xs text-xs">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">4. Rebalanced</span>
              <p className="font-semibold text-slate-900 mt-1">15+15 pcs assigned</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-sky-200 shadow-xs text-xs">
              <span className="text-[10px] font-bold text-sky-700 uppercase">5. Restored</span>
              <p className="font-semibold text-slate-900 mt-1">Work continues 100%</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900">Ready to Find Your Next Opportunity?</h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto font-medium">Join businesses and workers using intelligent two-sided capability matching.</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button size="lg" variant="primary" icon="building" onClick={() => onNavigate('/role-selection')}>
            I Need People ("Business")
          </Button>
          <Button size="lg" variant="secondary" icon="user" onClick={() => onNavigate('/role-selection')}>
            I Need Work ("Worker")
          </Button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

      {/* ON-DEMAND BOOKING MODAL */}
      {activeBookingService && (
        <OnDemandBookingModal
          service={activeBookingService}
          onClose={() => setActiveBookingService(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
