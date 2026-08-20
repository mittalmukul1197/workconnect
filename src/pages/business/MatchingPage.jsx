import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { MatchScoreBreakdown } from '../../components/features/MatchScoreBreakdown';
import { MOCK_WORKERS } from '../../data/mockData';

export const MatchingPage = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-white">AI Candidate Ranking Matrix</h1>
          <Badge variant="primary">7-Dimension Match</Badge>
        </div>
        <p className="text-xs text-slate-400">Scored across Skill Fit, Availability, Capacity, Proximity, Experience, Reliability & Rate.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_WORKERS.map((worker) => (
          <Card key={worker.id} borderVariant="indigo" className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <img src={worker.avatar} alt={worker.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                <div>
                  <h3 className="font-bold text-sm text-white">{worker.name}</h3>
                  <p className="text-xs text-indigo-300">{worker.profession}</p>
                </div>
              </div>
              <Badge variant="success">95% AI Match</Badge>
            </div>

            <MatchScoreBreakdown match={{ totalScore: 95 }} />

            <Button variant="primary" size="md" icon="check-circle" fullWidth onClick={() => onNavigate('/business/projects')}>
              Assign to Work Order Team
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
