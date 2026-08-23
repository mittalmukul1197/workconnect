import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';

export const AdminDemoPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { loginAsDemoBusiness, loginAsDemoHousehold, loginAsDemoWorker } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto text-slate-900">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-slate-900">{t('adminDemo.title')}</h1>
          <Badge variant="warning">{t('adminDemo.badge')}</Badge>
        </div>
        <p className="text-xs text-slate-500 font-medium">{t('adminDemo.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card borderVariant="indigo" className="p-6 space-y-4 bg-white shadow-sm">
          <h3 className="font-bold text-base text-slate-900">{t('adminDemo.personaSwitcher')}</h3>
          <div className="space-y-2">
            <Button variant="primary" size="md" icon="building" fullWidth onClick={() => { loginAsDemoBusiness(); onNavigate('/business/dashboard'); }}>
              {t('adminDemo.switchBusiness')}
            </Button>
            <Button variant="outline" size="md" icon="user" fullWidth onClick={() => { loginAsDemoHousehold(); onNavigate('/household/dashboard'); }}>
              {t('adminDemo.switchHousehold')}
            </Button>
            <Button variant="secondary" size="md" icon="user" fullWidth onClick={() => { loginAsDemoWorker(); onNavigate('/worker/dashboard'); }}>
              {t('adminDemo.switchWorker')}
            </Button>
          </div>
        </Card>

        <Card borderVariant="emerald" className="p-6 space-y-4 bg-white shadow-sm">
          <h3 className="font-bold text-base text-slate-900">{t('adminDemo.directAccess')}</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Button size="sm" variant="outline" onClick={() => onNavigate('/')}>{t('adminDemo.landingPage')}</Button>
            <Button size="sm" variant="outline" onClick={() => onNavigate('/role-selection')}>{t('adminDemo.roleSelection')}</Button>
            <Button size="sm" variant="outline" onClick={() => onNavigate('/onboarding/business')}>{t('adminDemo.businessOnboarding')}</Button>
            <Button size="sm" variant="outline" onClick={() => onNavigate('/onboarding/worker')}>{t('adminDemo.workerOnboarding')}</Button>
            <Button size="sm" variant="outline" onClick={() => onNavigate('/business/post-work')}>{t('adminDemo.aiWorkParser')}</Button>
            <Button size="sm" variant="outline" onClick={() => onNavigate('/business/matches')}>{t('adminDemo.aiCandidateRanking')}</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
