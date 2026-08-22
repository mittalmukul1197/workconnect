import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { WorkConnectEscrowVault } from '../../components/features/WorkConnectEscrowVault';

export const WorkerProjectsPage = ({ onNavigate }) => {
  const [completedUnits, setCompletedUnits] = useState(20);
  const [logUnitsAlert, setLogUnitsAlert] = useState(false);

  const handleLogProgress = (e) => {
    e.preventDefault();
    setCompletedUnits((prev) => Math.min(35, prev + 5));
    setLogUnitsAlert(true);
    setTimeout(() => {
      setLogUnitsAlert(false);
    }, 3500);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 via-white to-indigo-50/80 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Assigned Worker Projects & Escrow Payouts</h1>
            <Badge variant="success">Active Orders</Badge>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Log completed piece outputs, sign deal agreements, and verify your secured platform escrow payouts.
          </p>
        </div>

        <Button
          variant="secondary"
          icon="search"
          onClick={() => onNavigate('/worker/work')}
          className="shrink-0 shadow-md shadow-emerald-600/20"
        >
          Find More Work
        </Button>
      </div>

      {logUnitsAlert && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2 animate-scale-up">
          <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
          <span>Output updated! Logged +5 completed pieces to project quota ledger.</span>
        </div>
      )}

      {/* Main Assigned Project Card */}
      <Card borderVariant="emerald" className="p-6 space-y-6 bg-white shadow-md rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-lg text-slate-900">100 Ethnic Kurtis Stitching Order</h3>
              <Badge variant="indigo">Tailoring</Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Client: <strong className="text-slate-900">Crafted Threads Boutique</strong> • Rate: <strong className="text-emerald-700">₹30 / piece</strong>
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-[10px] uppercase font-black text-slate-400 block">Allocated Quota Payout</span>
            <span className="text-xl font-black text-emerald-700">₹1,050</span>
          </div>
        </div>

        {/* Output Log & Progress Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-bold">
            <span className="text-slate-700">Your Quota Progress: {completedUnits} / 35 pieces ({Math.round((completedUnits / 35) * 100)}%)</span>
            <form onSubmit={handleLogProgress} className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px] font-medium">Add Output:</span>
              <Button type="submit" variant="secondary" size="sm" icon="plus">
                Log 5 Pieces Completed
              </Button>
            </form>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${(completedUnits / 35) * 100}%` }}
            />
          </div>
        </div>

        {/* ROLE-AWARE ESCROW VAULT INTEGRATION */}
        <div className="pt-2">
          <h4 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Icon name="shield" className="w-4 h-4 text-emerald-600" />
            <span>Escrow Contract Sign-off & Payout Release Status</span>
          </h4>

          <WorkConnectEscrowVault
            dealId="proj-501"
            dealTitle="100 Ethnic Kurtis Stitching Order"
            businessName="Crafted Threads Boutique"
            workerName="Sunita Sharma (You)"
            amount="₹1,050"
            unitDetails={`Your Quota: 35 pieces @ ₹30 / piece`}
          />
        </div>
      </Card>
    </div>
  );
};
