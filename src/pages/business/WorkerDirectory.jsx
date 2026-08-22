import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useChat } from '../../context/ChatContext';
import { MOCK_WORKERS } from '../../data/mockData';

export const WorkerDirectory = ({ onNavigate }) => {
  const { openChatWithUser } = useChat();

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900">Worker & Professional Directory</h1>
        <p className="text-xs text-slate-500 font-medium">Discover nearby artisans and professionals with verified Work Passports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_WORKERS.map((worker) => (
          <Card key={worker.id} className="p-5 space-y-4 bg-white shadow-sm hover:shadow-md">
            <div className="flex items-center gap-3">
              <img src={worker.avatar} alt={worker.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs" />
              <div>
                <h3 className="font-bold text-sm text-slate-900">{worker.name}</h3>
                <p className="text-xs text-indigo-700 font-bold">{worker.profession}</p>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1 font-medium">
              <p>Location: <strong className="text-slate-900">{worker.city}, Punjab</strong></p>
              <p>Capacity: <strong className="text-slate-900">{worker.dailyCapacity}</strong></p>
              <p>Rate: <strong className="text-emerald-700">{worker.rate}</strong></p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="primary"
                size="sm"
                icon="message-square"
                onClick={() => openChatWithUser({
                  id: worker.id === 'wrk-1' ? 'usr-wrk-1' : (worker.id === 'wrk-2' ? 'usr-wrk-2' : 'usr-wrk-3'),
                  name: worker.name,
                  role: 'worker',
                  avatar: worker.avatar,
                  profession: worker.profession
                }, onNavigate)}
              >
                Message
              </Button>

              <Button variant="outline" size="sm" onClick={() => onNavigate(`/workers/${worker.id}`)}>
                Passport
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
