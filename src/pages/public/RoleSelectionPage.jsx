import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';

export const RoleSelectionPage = ({ onNavigate }) => {
  const { loginAsDemoBusiness, loginAsDemoWorker } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-center flex-1 flex flex-col justify-center">
        <div className="space-y-3">
          <Badge variant="primary">Choose Your Experience Path</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white">How do you want to use WorkConnect?</h1>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            WorkConnect is a two-sided workforce network. Select your primary goal below to get started.
          </p>
        </div>

        {/* 2 EQUAL ROLE CHOICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Business / Owner Card */}
          <Card borderVariant="indigo" className="p-8 space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-lg shadow-indigo-600/20">
                <Icon name="building" className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <Badge variant="primary">Business / Employer</Badge>
                <h3 className="text-2xl font-extrabold text-white">I Need People</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "I operate a boutique, shop, cafe, salon, workshop, startup, or service business and need reliable professionals or micro-workers."
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-indigo-400" />
                  <span>Post work requirements in plain words</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-indigo-400" />
                  <span>AI 7-dimension candidate scoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-indigo-400" />
                  <span>Signature Self-Healing workforce protection</span>
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon="arrow-right"
              iconPosition="right"
              fullWidth
              onClick={() => {
                loginAsDemoBusiness();
                onNavigate('/onboarding/business');
              }}
            >
              Continue as Business / Owner
            </Button>
          </Card>

          {/* Worker / Professional Card */}
          <Card borderVariant="emerald" className="p-8 space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-lg shadow-emerald-600/20">
                <Icon name="user" className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <Badge variant="success">Worker / Professional</Badge>
                <h3 className="text-2xl font-extrabold text-white">I Need Work</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "I am a skilled artisan, professional, home-based worker, or freelancer seeking work opportunities that match my skills & daily capacity."
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
                  <span>Build your credible Work Passport trust profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
                  <span>Publish daily available capacity (*"30 pcs/day"*)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
                  <span>Discover nearby businesses seeking your capability</span>
                </li>
              </ul>
            </div>

            <Button
              variant="secondary"
              size="lg"
              icon="arrow-right"
              iconPosition="right"
              fullWidth
              onClick={() => {
                loginAsDemoWorker();
                onNavigate('/onboarding/worker');
              }}
            >
              Continue as Worker / Professional
            </Button>
          </Card>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        WorkConnect Platform • Hackathon Role Selector
      </footer>
    </div>
  );
};
