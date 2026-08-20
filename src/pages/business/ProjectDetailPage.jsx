import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SelfHealingSimulator } from '../../components/features/SelfHealingSimulator';
import { MOCK_PROJECTS } from '../../data/mockData';

export const ProjectDetailPage = ({ projectId, onNavigate }) => {
  const [project, setProject] = useState(MOCK_PROJECTS[0]);

  const handleRebalanced = () => {
    setProject((prev) => ({
      ...prev,
      assignedWorkers: [
        { workerName: 'Sunita Sharma', allocatedQuantity: 50, completedQuantity: 35, status: 'Active' },
        { workerName: 'Priya Kaur', allocatedQuantity: 50, completedQuantity: 30, status: 'Active' }
      ]
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">{project.title}</h1>
          <p className="text-xs text-slate-400">Project ID: {project.id} • Target Quota: {project.totalQuantity} {project.unitLabel}</p>
        </div>
        <Button size="sm" variant="outline" icon="arrow-left" onClick={() => onNavigate('/business/projects')}>
          Back to Projects
        </Button>
      </div>

      <SelfHealingSimulator project={project} onRebalanced={handleRebalanced} />

      <Card borderVariant="indigo" className="p-6 space-y-4">
        <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">Assigned Workforce Allocation</h3>
        <div className="space-y-3">
          {project.assignedWorkers.map((w, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-bold text-white">{w.workerName}</span>
              </div>
              <span className="text-indigo-300 font-semibold">{w.completedQuantity} / {w.allocatedQuantity} {project.unitLabel}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
