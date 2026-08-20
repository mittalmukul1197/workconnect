import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/common/Footer';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Icon } from '../../components/common/Icon';
import { CATEGORIES, MOCK_STATS } from '../../data/mockData';
import { parseNaturalLanguageRequirement } from '../../services/workDecomposer';

export const LandingPage = ({ onNavigate }) => {
  const [nlPrompt, setNlPrompt] = useState('Mujhe 100 kurtis stitch karwani hain 5 din mein, 2 nearby workers chahiye.');
  const [extractedResult, setExtractedResult] = useState(null);

  const handleTestParse = () => {
    const res = parseNaturalLanguageRequirement(nlPrompt);
    setExtractedResult(res);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar onNavigate={onNavigate} />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background Glowing Ambient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-xs font-semibold text-indigo-300 shadow-md">
            <Icon name="sparkles" className="w-4 h-4 text-emerald-400" />
            <span>AI-Powered Two-Sided Workforce Network</span>
            <Badge variant="success">WORK ↔ CAPABILITY</Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Find the Right People.<br />
            Find the Right Work.<br />
            <span className="text-gradient">Get Work Done.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            WorkConnect connects businesses with the people they need and helps workers and professionals discover businesses looking for their skills and available capacity.
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
              I Need People ("Business")
            </Button>

            <Button
              size="lg"
              variant="secondary"
              icon="user"
              onClick={() => onNavigate('/role-selection')}
              className="w-full sm:w-auto"
            >
              I Need Work ("Worker")
            </Button>
          </div>

          {/* VISUAL TWO-SIDED NETWORK REPRESENTATION */}
          <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
            <Card hover={false} borderVariant="indigo" className="space-y-2 bg-slate-900/80">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                <Icon name="building" className="w-4 h-4" />
                <span>BUSINESS ➔ WORKCONNECT ➔ PEOPLE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Describe work in plain words. AI extracts capacity needs and instantly ranks matched nearby workers.
              </p>
            </Card>

            <Card hover={false} borderVariant="emerald" className="space-y-2 bg-slate-900/80">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Icon name="user" className="w-4 h-4" />
                <span>PEOPLE ➔ WORKCONNECT ➔ BUSINESS</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Publish daily available capacity (*"30 pcs/day"*). Discover businesses actively seeking your capability.
              </p>
            </Card>
          </div>
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
          <Card borderVariant="indigo" className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                <Icon name="building" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">For Businesses & Employers</h3>
                <p className="text-xs text-slate-400">Find the right people in 3 simple steps</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-white">Describe Your Work Need</h4>
                  <p className="text-slate-400 mt-0.5">Enter natural language prompt like *"Mujhe 100 kurtis stitch karwani hain 5 din mein"*. AI handles structuring.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-white">AI Candidate Ranking</h4>
                  <p className="text-slate-400 mt-0.5">System scores workers across 7 dimensions (Skill, Availability, Capacity, Location, Experience, Reliability, Budget).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-white">Start Work & Self-Healing</h4>
                  <p className="text-slate-400 mt-0.5">Assign workers, track progress, and rely on automated dropout rebalancing if a worker becomes unavailable.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Worker Flow */}
          <Card borderVariant="emerald" className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400">
                <Icon name="user" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">For Workers & Professionals</h3>
                <p className="text-xs text-slate-400">Find the right work in 3 simple steps</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-white">Build Your Work Passport</h4>
                  <p className="text-slate-400 mt-0.5">List your skills, experience, verified credentials, and photos to establish trust.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-white">Publish Daily Capacity</h4>
                  <p className="text-slate-400 mt-0.5">Set how many pieces or hours you can offer daily (*"30 pcs/day"*). System performs Reverse Matching.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-white">Accept Work & Build Reputation</h4>
                  <p className="text-slate-400 mt-0.5">Receive job invitations, complete work orders, earn income, and increase your Work Passport rating.</p>
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
          <Card className="space-y-2">
            <Icon name="sparkles" className="w-6 h-6 text-indigo-400" />
            <h3 className="font-bold text-sm text-white">Intelligent 7-Dimension Matching</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Scores candidate fit across Skill, Availability, Capacity, Location, Experience, Reliability, and Budget Fit.</p>
          </Card>

          <Card className="space-y-2">
            <Icon name="map-pin" className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Hyper-Local Discovery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Connects nearby businesses and micro-workers within custom radius zones using exact coordinate distance math.</p>
          </Card>

          <Card className="space-y-2">
            <Icon name="shield-check" className="w-6 h-6 text-amber-400" />
            <h3 className="font-bold text-sm text-white">Trust via Work Passport</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Credible worker trust profile showing completed jobs (147), 96% on-time delivery, and 2-way reputation ratings.</p>
          </Card>

          <Card className="space-y-2">
            <Icon name="zap" className="w-6 h-6 text-rose-400" />
            <h3 className="font-bold text-sm text-white">Reverse Capacity Matching</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Workers publish daily capacity from home; the platform discovers businesses looking for that capability.</p>
          </Card>

          <Card className="space-y-2">
            <Icon name="sync" className="w-6 h-6 text-sky-400" />
            <h3 className="font-bold text-sm text-white">Self-Healing Workforce</h3>
            <p className="text-xs text-slate-400 leading-relaxed">If a worker becomes unavailable, AI detects capacity gaps, deadline risk, and automatically rebalances work.</p>
          </Card>

          <Card className="space-y-2">
            <Icon name="building" className="w-6 h-6 text-purple-400" />
            <h3 className="font-bold text-sm text-white">Industry-Agnostic Network</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Supports retail, tailoring, electronics, catering, salons, skilled trades, digital work, and packaging.</p>
          </Card>
        </div>
      </section>

      {/* SECTION C: SUPPORTED WORK CATEGORIES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 bg-slate-900/40 rounded-3xl border border-slate-800">
        <SectionHeading
          badge="Industry Agnostic"
          title="Supported Work Categories"
          description="From local boutique tailoring and solar installations to digital design and retail packaging."
          center
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Card key={cat.id} className="p-4 space-y-2 text-center group cursor-pointer">
              <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Icon name={cat.icon} className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-white truncate">{cat.name}</h4>
              <span className="text-[10px] text-slate-400 font-medium">{cat.count}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION D: AI DEMO INTERACTIVE PARSER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <SectionHeading
          badge="Live AI Demo"
          title="Natural Language Requirement Parsing"
          description="Speak in plain words. AI automatically structures work order specs and calculates velocity."
          center
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <Card borderVariant="indigo" className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 uppercase">Input Plain Words (Hinglish/English)</label>
              <textarea
                value={nlPrompt}
                onChange={(e) => setNlPrompt(e.target.value)}
                rows={3}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <Button size="md" variant="primary" icon="sparkles" onClick={handleTestParse} fullWidth>
              Test AI Requirement Extraction
            </Button>
          </Card>

          <div>
            {extractedResult ? (
              <Card borderVariant="emerald" className="space-y-4 animate-scale-up">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-xs text-indigo-300 uppercase">Structured Output</span>
                  <Badge variant="success">AI Extracted</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Work Type</span>
                    <p className="font-bold text-white mt-0.5">{extractedResult.workType}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Required Skill</span>
                    <p className="font-bold text-indigo-300 mt-0.5">{extractedResult.skillName}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Total Quota</span>
                    <p className="font-bold text-emerald-400 mt-0.5">{extractedResult.totalQuantity} {extractedResult.unitLabel}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Deadline Velocity</span>
                    <p className="font-bold text-amber-400 mt-0.5">{extractedResult.deadlineDays} Days (~{extractedResult.requiredDailyCapacityPerWorker}/day)</p>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="p-8 rounded-2xl border border-dashed border-slate-700 text-center space-y-2 text-slate-500 text-xs">
                <Icon name="sparkles" className="w-8 h-8 mx-auto text-indigo-400" />
                <p>Click "Test AI Requirement Extraction" to view live parsed output.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION E: SELF-HEALING WORKFORCE PREVIEW */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-900/60 rounded-3xl border border-rose-500/30">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <Badge variant="danger">Signature Innovation Teaser</Badge>
          <h2 className="text-3xl font-extrabold text-white">
            "People can become unavailable.<br />
            <span className="text-gradient">Work shouldn't stop."</span>
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            When a worker drops out unexpectedly during a 100-piece order, WorkConnect automatically detects the capacity gap, calculates deadline risk, finds optimal replacement workers, and rebalances quota.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-6 text-left">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-rose-400 uppercase">1. Dropout</span>
              <p className="font-semibold text-white mt-1">Worker C unavailable</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-amber-400 uppercase">2. Gap Detected</span>
              <p className="font-semibold text-white mt-1">30 pcs shortfall risk</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-indigo-400 uppercase">3. AI Matching</span>
              <p className="font-semibold text-white mt-1">Scores nearby candidates</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">4. Rebalanced</span>
              <p className="font-semibold text-white mt-1">15+15 pcs assigned</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-sky-400 uppercase">5. Restored</span>
              <p className="font-semibold text-white mt-1">Work continues 100%</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-black text-white">Ready to Find Your Next Opportunity?</h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">Join businesses and workers using intelligent two-sided capability matching.</p>
        
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
    </div>
  );
};
