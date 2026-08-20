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
    <div className="rounded-2xl border border-rose-200 p-6 space-y-4 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
            <Icon name="sync" className={`w-5 h-5 ${isSimulating ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Self-Healing Workforce Rebalancer</h3>
            <p className="text-xs text-slate-500 font-medium">Simulate unexpected worker dropout & automatic quota reallocation</p>
          </div>
        </div>

        <Badge variant={step === 5 ? 'success' : step > 0 ? 'warning' : 'danger'}>
          {step === 5 ? 'Healing Complete' : step > 0 ? 'Rebalancing Active' : 'Simulator Ready'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-left">
        <div className={`p-3 rounded-xl border text-xs ${step >= 1 ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
          <span className="text-[10px] font-bold uppercase text-rose-700">Step 1</span>
          <p className="font-semibold mt-0.5">Worker Dropout</p>
          <p className="text-[10px] text-slate-500 mt-1">Meenakshi (30 pcs) unavailable</p>
        </div>

        <div className={`p-3 rounded-xl border text-xs ${step >= 2 ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
          <span className="text-[10px] font-bold uppercase text-amber-800">Step 2</span>
          <p className="font-semibold mt-0.5">Risk Analysis</p>
          <p className="text-[10px] text-slate-500 mt-1">30 pcs shortfall detected</p>
        </div>

        <div className={`p-3 rounded-xl border text-xs ${step >= 3 ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
          <span className="text-[10px] font-bold uppercase text-indigo-700">Step 3</span>
          <p className="font-semibold mt-0.5">Candidate Search</p>
          <p className="text-[10px] text-slate-500 mt-1">Found Sunita & Priya (Capacity: +35)</p>
        </div>

        <div className={`p-3 rounded-xl border text-xs ${step >= 4 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
          <span className="text-[10px] font-bold uppercase text-emerald-700">Step 4</span>
          <p className="font-semibold mt-0.5">Quota Reallocated</p>
          <p className="text-[10px] text-slate-500 mt-1">+15 pcs assigned to each</p>
        </div>

        <div className={`p-3 rounded-xl border text-xs ${step === 5 ? 'bg-sky-50 border-sky-300 text-sky-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
          <span className="text-[10px] font-bold uppercase text-sky-700">Step 5</span>
          <p className="font-semibold mt-0.5">Production Restored</p>
          <p className="text-[10px] text-slate-500 mt-1">100% deadline safety restored</p>
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
