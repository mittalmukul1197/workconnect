import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';

export const RoleSelectionPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { loginAsDemoBusiness, loginAsDemoHousehold, loginAsDemoWorker } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-8 text-center flex-1 flex flex-col justify-center">
        <div className="space-y-3">
          <Badge variant="primary">{t('auth.selectRole')}</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900">{t('auth.title')}</h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto font-medium">
            {t('auth.subtitle')}
          </p>
        </div>

        {/* 3 DISTINCT ROLE CHOICES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* 1. Household Client Card */}
          <Card borderVariant="indigo" className="p-6 space-y-6 flex flex-col justify-between group bg-white shadow-sm hover:shadow-md">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                <Icon name="user" className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <Badge variant="indigo">{t('auth.householdTitle')}</Badge>
                <h3 className="text-xl font-extrabold text-slate-900">{t('auth.householdTitle')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {t('auth.householdDesc')}
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-indigo-600" />
                  <span>{t('landing.onDemandTitle')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-indigo-600" />
                  <span>{t('landing.budgetOfferTitle')}</span>
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              size="md"
              icon="arrow-right"
              iconPosition="right"
              fullWidth
              onClick={() => {
                loginAsDemoHousehold();
                onNavigate('/household/dashboard');
              }}
            >
              {t('auth.registerHouseholdBtn')}
            </Button>
          </Card>

          {/* 2. Business / Employer Card */}
          <Card borderVariant="purple" className="p-6 space-y-6 flex flex-col justify-between group bg-white shadow-sm hover:shadow-md">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
                <Icon name="building" className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <Badge variant="purple">{t('auth.businessTitle')}</Badge>
                <h3 className="text-xl font-extrabold text-slate-900">{t('auth.businessTitle')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {t('auth.businessDesc')}
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-purple-600" />
                  <span>{t('business.activeProjects')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-purple-600" />
                  <span>{t('business.recommendedWorkers')}</span>
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              size="md"
              icon="arrow-right"
              iconPosition="right"
              fullWidth
              onClick={() => {
                loginAsDemoBusiness();
                onNavigate('/onboarding/business');
              }}
            >
              {t('auth.registerBusinessBtn')}
            </Button>
          </Card>

          {/* 3. Worker / Professional Card */}
          <Card borderVariant="emerald" className="p-6 space-y-6 flex flex-col justify-between group bg-white shadow-sm hover:shadow-md">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-sm">
                <Icon name="zap" className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <Badge variant="success">{t('auth.workerTitle')}</Badge>
                <h3 className="text-xl font-extrabold text-slate-900">{t('auth.workerTitle')}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {t('auth.workerDesc')}
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
                  <span>{t('worker.workPassport')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
                  <span>{t('worker.dailyCapacity')}</span>
                </li>
              </ul>
            </div>

            <Button
              variant="secondary"
              size="md"
              icon="arrow-right"
              iconPosition="right"
              fullWidth
              onClick={() => {
                loginAsDemoWorker();
                onNavigate('/onboarding/worker');
              }}
            >
              {t('auth.registerWorkerBtn')}
            </Button>
          </Card>

        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200">
        WorkConnect Platform Role Selection
      </footer>
    </div>
  );
};
