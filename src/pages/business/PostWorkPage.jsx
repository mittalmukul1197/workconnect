import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { parseNaturalLanguageRequirement } from '../../services/workDecomposer';

export const PostWorkPage = ({ onNavigate }) => {
  const [nlPrompt, setNlPrompt] = useState('Mujhe 100 kurtis stitch karwani hain 5 din mein, 2 nearby workers chahiye.');
  const [parsed, setParsed] = useState(null);

  const handleParse = () => {
    const res = parseNaturalLanguageRequirement(nlPrompt);
    setParsed(res);
  };

  const handleConfirmAndMatch = () => {
    onNavigate('/business/matches');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-white">Post Work Requirement</h1>
          <Badge variant="primary">AI Decomposer</Badge>
        </div>
        <p className="text-xs text-slate-400">Describe your work in plain words (Hinglish/English). Gemini AI structures the specs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card borderVariant="indigo" className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase">Natural Language Requirement</label>
            <textarea
              value={nlPrompt}
              onChange={(e) => setNlPrompt(e.target.value)}
              rows={4}
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <Button variant="primary" size="md" icon="sparkles" onClick={handleParse} fullWidth>
            Extract Work Order Specs
          </Button>
        </Card>

        <div>
          {parsed ? (
            <Card borderVariant="emerald" className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-xs text-indigo-300 uppercase">Extracted Specs</span>
                <Badge variant="success">AI Verified</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Work Type</span>
                  <p className="font-bold text-white mt-0.5">{parsed.workType}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Required Skill</span>
                  <p className="font-bold text-indigo-300 mt-0.5">{parsed.skillName}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Total Quota</span>
                  <p className="font-bold text-emerald-400 mt-0.5">{parsed.totalQuantity} {parsed.unitLabel}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Deadline Velocity</span>
                  <p className="font-bold text-amber-400 mt-0.5">{parsed.deadlineDays} Days (~{parsed.requiredDailyCapacityPerWorker}/day)</p>
                </div>
              </div>

              <Button variant="secondary" size="lg" icon="arrow-right" iconPosition="right" onClick={handleConfirmAndMatch} fullWidth>
                Find & Rank Matched Workers
              </Button>
            </Card>
          ) : (
            <div className="p-10 rounded-2xl border border-dashed border-slate-800 text-center space-y-2 text-slate-500 text-xs">
              <Icon name="sparkles" className="w-8 h-8 mx-auto text-indigo-400" />
              <p>Click "Extract Work Order Specs" to process natural language prompt.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
