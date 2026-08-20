import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { MOCK_PROJECTS } from '../../data/mockData';

export const BusinessProjects = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-white">Active Business Projects</h1>
        <p className="text-xs text-slate-400">Track team output & trigger Self-Healing workforce rebalancing.</p>
      </div>

      <div className="space-y-4">
        {MOCK_PROJECTS.map((proj) => (
          <Card key={proj.id} borderVariant="indigo" className="p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white">{proj.title}</h3>
                <p className="text-xs text-slate-400">Deadline: {proj.deadlineDate}</p>
              </div>
              <Button size="sm" variant="primary" onClick={() => onNavigate(`/business/project/${proj.id}`)}>
                Open Project Tracker
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
