import React from 'react';
import { Card } from '../../components/common/Card';
import { WorkConnectEscrowVault } from '../../components/features/WorkConnectEscrowVault';

export const WorkerProjectsPage = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900">Assigned Worker Projects & Escrow Payouts</h1>
        <p className="text-xs text-slate-500 font-medium">
          Track active order quotas and manage middleman platform escrow settlements.
        </p>
      </div>

      <WorkConnectEscrowVault
        dealId="WRK-PRJ-101"
        dealTitle="100 Ethnic Kurtis Stitching Order"
        businessName="Crafted Threads Boutique"
        workerName="Sunita Sharma (You)"
        amount="₹1,050"
        unitDetails="Allocated Quota: 35 pieces @ ₹30 / piece"
        initialBusinessAgreed={true}
        initialWorkerAgreed={true}
      />
    </div>
  );
};
