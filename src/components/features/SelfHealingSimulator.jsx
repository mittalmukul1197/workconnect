import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Icon } from '../common/Icon';

export const SelfHealingSimulator = ({ project, onRebalanced }) => {
  const [step, setStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setStep(1);

    setTimeout(() => setStep(2), 1200);
    setTimeout(() => setStep(3), 2400);
    setTimeout(() => setStep(4), 3600);
    setTimeout(() => {
      setStep(5);
      setIsSimulating(false);
      if (onRebalanced) onRebalanced();
    }, 4800);
  };

  return (
    <div className="glass-card rounded-2xl border border-rose-500/30 p-6 space-y-4 bg-slate-900/90">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
            <Icon name="sync" className={`w-5 h-5 ${isSimulating ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Self-Healing Workforce Rebalancer</h3>
            <p className="text-xs text-slate-400">Simulate unexpected worker dropout & automatic quota reallocation</p>
          </div>
        </div>

        <Badge variant={step === 5 ? 'success' : step > 0 ? 'warning' : 'danger'}>
          {step === 5 ? 'Healing Complete' : step > 0 ? 'Rebalancing Active' : 'Simulator Ready'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-left">
        <div className={`p-3 rounded-xl border text-xs ${step >= 1 ? 'bg-rose-500/10 border-rose-500/40 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
          <span className="text-[10px] font-bold uppercase text-rose-400">Step 1</span>
          <p className="font-semibold mt-0.5">Worker Dropout</p>
          <p className="text-[10px] text-slate-400 mt-1">Meenakshi (30 pcs) unavailable</p>
        </div>

        <div className={`p-3 rounded-xl border text-xs ${step >= 2 ? 'bg-amber-500/10 border-amber-500/40 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
          <span className="text-[10px] font-bold uppercase text-amber-400">Step 2</span>
          <p className="font-semibold mt-0.5">Risk Analysis</p>
          <p className="text-[10px] text-slate-400 mt-1">30 pcs shortfall detected</p>
        </div>

        <div className={`p-3 rounded-xl border text-xs ${step >= 3 ? 'bg-indigo-500/10 border-indigo-500/40 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
          <span className="text-[10px] font-bold uppercase text-indigo-400">Step 3</span>
          <p className="font-semibold mt-0.5">Candidate Search</p>
          <p className="text-[10px] text-slate-400 mt-1">Found Sunita & Priya (Capacity: +35)</p>
        </div>

        <div className={`p-3 rounded-xl border text-xs ${step >= 4 ? 'bg-emerald-500/10 border-emerald-500/40 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
          <span className="text-[10px] font-bold uppercase text-emerald-400">Step 4</span>
          <p className="font-semibold mt-0.5">Quota Reallocated</p>
          <p className="text-[10px] text-slate-400 mt-1">+15 pcs assigned to each</p>
        </div>

        <div className={`p-3 rounded-xl border text-xs ${step === 5 ? 'bg-sky-500/10 border-sky-500/40 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
          <span className="text-[10px] font-bold uppercase text-sky-400">Step 5</span>
          <p className="font-semibold mt-0.5">Production Restored</p>
          <p className="text-[10px] text-slate-400 mt-1">100% deadline safety restored</p>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          variant="danger"
          size="md"
          icon="sync"
          loading={isSimulating}
          onClick={runSimulation}
        >
          {step === 5 ? 'Re-Run Dropout Simulation' : 'Execute Self-Healing Simulation'}
        </Button>
      </div>
    </div>
  );
};
