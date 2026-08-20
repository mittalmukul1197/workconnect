import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';

export const WorkerCapacityPage = ({ onNavigate }) => {
  const [capacity, setCapacity] = useState(30);
  const [radius, setRadius] = useState(12);

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-white">Daily Capacity Manager</h1>
        <p className="text-xs text-slate-400">Publish how many pieces or hours you can offer daily for Reverse Matching.</p>
      </div>

      <Card borderVariant="emerald" className="p-6 space-y-4">
        <Input label="Max Daily Capacity (pieces/day)" type="number" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value, 10))} />
        <Input label="Preferred Work Radius (km)" type="number" value={radius} onChange={(e) => setRadius(parseInt(e.target.value, 10))} />

        <Button variant="secondary" size="lg" fullWidth onClick={() => onNavigate('/worker/dashboard')}>
          Save Capacity Specs & Update Feed
        </Button>
      </Card>
    </div>
  );
};
