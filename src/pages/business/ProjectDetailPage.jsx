import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useChat } from '../../context/ChatContext';
import { SelfHealingSimulator } from '../../components/features/SelfHealingSimulator';
import { MOCK_PROJECTS } from '../../data/mockData';

export const ProjectDetailPage = ({ projectId, onNavigate }) => {
  const [project, setProject] = useState(MOCK_PROJECTS[0]);
  const { openChatWithUser } = useChat();

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
    <div className="space-y-6 animate-fade-in text-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{project.title}</h1>
          <p className="text-xs text-slate-500 font-medium">Project ID: {project.id} • Target Quota: {project.totalQuantity} {project.unitLabel}</p>
        </div>
        <Button size="sm" variant="outline" icon="arrow-left" onClick={() => onNavigate('/business/projects')}>
          Back to Projects
        </Button>
      </div>

      <SelfHealingSimulator project={project} onRebalanced={handleRebalanced} />

      <Card borderVariant="indigo" className="p-6 space-y-4 bg-white shadow-sm">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">Assigned Workforce Allocation</h3>
        <div className="space-y-3">
          {project.assignedWorkers.map((w, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-900">{w.workerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-indigo-700 font-extrabold">{w.completedQuantity} / {w.allocatedQuantity} {project.unitLabel}</span>
                <Button
                  size="sm"
                  variant="outline"
                  icon="message-square"
                  onClick={() => openChatWithUser({
                    id: w.workerName.includes('Sunita') ? 'usr-wrk-1' : 'usr-wrk-3',
                    name: w.workerName,
                    role: 'worker',
                    profession: 'Assigned Garment Specialist'
                  }, onNavigate)}
                >
                  Message
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
