import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { MOCK_OPPORTUNITIES } from '../../data/mockData';

export const FindWorkPage = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-white">Reverse Job Discovery</h1>
        <p className="text-xs text-slate-400">Work orders from businesses matching your available daily capacity.</p>
      </div>

      <div className="space-y-4">
        {MOCK_OPPORTUNITIES.map((opp) => (
          <Card key={opp.id} borderVariant="emerald" className="p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-white">{opp.title}</h3>
                  <Badge variant="success">{opp.matchScore}% Match</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{opp.businessName} • {opp.city} ({opp.distanceKm} km)</p>
              </div>
              <span className="text-base font-black text-emerald-400">{opp.budgetPerUnit}</span>
            </div>

            <Button size="sm" variant="secondary" onClick={() => onNavigate('/worker/projects')}>
              Accept Work Order
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
