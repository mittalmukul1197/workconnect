import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';

export const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState('business@demo.com');
  const [password, setPassword] = useState('demo12345');
  const { loginAsDemoBusiness, loginAsDemoWorker } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAsDemoBusiness();
    onNavigate('/business/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />

      <main className="max-w-md mx-auto px-4 py-12 space-y-6 flex-1 flex flex-col justify-center w-full">
        <div className="text-center space-y-2">
          <Badge variant="primary">WorkConnect Authentication</Badge>
          <h1 className="text-3xl font-black text-white">Sign In to Your Account</h1>
          <p className="text-xs text-slate-400">Enter your credentials or use 1-click Demo shortcuts below.</p>
        </div>

        <Card borderVariant="indigo" className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <Button type="submit" variant="primary" size="lg" fullWidth>
              Sign In
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">1-Click Hackathon Demo Shortcuts</span>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" icon="building" onClick={() => { loginAsDemoBusiness(); onNavigate('/business/dashboard'); }}>
                Demo Business
              </Button>
              <Button size="sm" variant="secondary" icon="user" onClick={() => { loginAsDemoWorker(); onNavigate('/worker/dashboard'); }}>
                Demo Worker
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        WorkConnect Platform Login
      </footer>
    </div>
  );
};
