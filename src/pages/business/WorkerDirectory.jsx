import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { MOCK_WORKERS } from '../../data/mockData';

export const WorkerDirectory = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-white">Worker & Professional Directory</h1>
        <p className="text-xs text-slate-400">Discover nearby artisans and professionals with verified Work Passports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_WORKERS.map((worker) => (
          <Card key={worker.id} className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src={worker.avatar} alt={worker.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
              <div>
                <h3 className="font-bold text-sm text-white">{worker.name}</h3>
                <p className="text-xs text-indigo-300 font-medium">{worker.profession}</p>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <p>Location: <strong>{worker.city}, Punjab</strong></p>
              <p>Capacity: <strong>{worker.dailyCapacity}</strong></p>
              <p>Rate: <strong>{worker.rate}</strong></p>
            </div>

            <Button variant="outline" size="sm" fullWidth onClick={() => onNavigate(`/workers/${worker.id}`)}>
              View Work Passport
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
