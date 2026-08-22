import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';

export const LoginPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('business@demo.com');
  const [password, setPassword] = useState('demo123');
  const [errorMessage, setErrorMessage] = useState('');
  const { loginWithCredentials, loginAsDemoBusiness, loginAsDemoHousehold, loginAsDemoWorker } = useAuth();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = loginWithCredentials(email, password);
    if (!res || res.error) {
      setErrorMessage(res?.error || 'Invalid email or password.');
      return;
    }
    const loggedUser = res.user || res;
    if (loggedUser?.role === 'household') {
      onNavigate('/household/dashboard');
    } else if (loggedUser?.role === 'business') {
      onNavigate('/business/dashboard');
    } else {
      onNavigate('/worker/dashboard');
    }
  };

  const fillAndLogin = (demoType) => {
    setErrorMessage('');
    if (demoType === 'business') {
      setEmail('business@demo.com');
      setPassword('demo123');
      loginAsDemoBusiness();
      onNavigate('/business/dashboard');
    } else if (demoType === 'household') {
      setEmail('household@demo.com');
      setPassword('demo123');
      loginAsDemoHousehold();
      onNavigate('/household/dashboard');
    } else {
      setEmail('worker@demo.com');
      setPassword('demo123');
      loginAsDemoWorker();
      onNavigate('/worker/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />

      <main className="max-w-xl mx-auto px-4 py-12 space-y-6 flex-1 flex flex-col justify-center w-full">
        <div className="text-center space-y-2">
          <Badge variant="primary">WorkConnect Authentication</Badge>
          <h1 className="text-3xl font-black text-slate-900">Sign In to Your Account</h1>
          <p className="text-xs text-slate-600 font-medium">Use your account credentials or select a predefined demo role below.</p>
        </div>

        {/* PREDEFINED DEMO CREDENTIALS INFOGRAPHIC CARD */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-slate-100 to-emerald-50 border border-indigo-200 text-xs space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
              <Icon name="key" className="w-4 h-4 text-indigo-600" />
              <span>Predefined Demo Credentials</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Password: <strong>demo123</strong></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => fillAndLogin('business')}
              className="p-2.5 rounded-xl bg-white border border-indigo-200 text-left hover:border-indigo-500 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] text-slate-900 group-hover:text-indigo-600">🏢 Business</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold">1-Click</span>
              </div>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">business@demo.com</p>
              <span className="text-[9px] text-slate-400 block truncate">Crafted Threads Boutique</span>
            </button>

            <button
              onClick={() => fillAndLogin('household')}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-left hover:border-indigo-500 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] text-slate-900 group-hover:text-indigo-600">🏠 Household</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">1-Click</span>
              </div>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">household@demo.com</p>
              <span className="text-[9px] text-slate-400 block truncate">Rahul Sharma (Client)</span>
            </button>

            <button
              onClick={() => fillAndLogin('worker')}
              className="p-2.5 rounded-xl bg-white border border-emerald-200 text-left hover:border-emerald-500 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] text-slate-900 group-hover:text-emerald-600">👷 Worker</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">1-Click</span>
              </div>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">worker@demo.com</p>
              <span className="text-[9px] text-slate-400 block truncate">Sunita Sharma (Tailor)</span>
            </button>
          </div>
        </div>

        {/* LOGIN FORM CARD */}
        <Card borderVariant="indigo" className="p-6 sm:p-8 space-y-4 bg-white shadow-md">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-bold flex items-center gap-2">
              <Icon name="alert-triangle" className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
              placeholder="e.g. business@demo.com"
            />
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
              placeholder="••••••••"
            />

            <Button type="submit" variant="primary" size="lg" icon="arrow-right" iconPosition="right" fullWidth>
              Sign In to Account
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-2">
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => onNavigate('/register')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Create Smart Account
              </button>
            </p>
          </div>
        </Card>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200">
        WorkConnect Platform Account Login
      </footer>
    </div>
  );
};
