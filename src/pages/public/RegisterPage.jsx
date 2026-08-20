import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';

export const RegisterPage = ({ onNavigate }) => {
  const [role, setRole] = useState('business');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate(role === 'business' ? '/onboarding/business' : '/onboarding/worker');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />

      <main className="max-w-md mx-auto px-4 py-12 space-y-6 flex-1 flex flex-col justify-center w-full">
        <div className="text-center space-y-2">
          <Badge variant="primary">Join WorkConnect Network</Badge>
          <h1 className="text-3xl font-black text-white">Create Your Account</h1>
          <p className="text-xs text-slate-400">Select your account type to get started.</p>
        </div>

        <Card borderVariant="indigo" className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              label="Account Type / Primary Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { label: 'Business / Employer (I need people)', value: 'business' },
                { label: 'Worker / Professional (I need work)', value: 'worker' }
              ]}
            />

            <Input label="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button type="submit" variant="primary" size="lg" icon="arrow-right" iconPosition="right" fullWidth>
              Continue to Setup
            </Button>
          </form>
        </Card>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        WorkConnect Account Registration
      </footer>
    </div>
  );
};
