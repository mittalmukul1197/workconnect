import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';
import { parseNaturalLanguageRequirementAsync } from '../../services/workDecomposer';

export const PostWorkPage = ({ onNavigate }) => {
  const [nlPrompt, setNlPrompt] = useState('I need 2 labours for paint in my hall i can give them 700/day');
  const [parsed, setParsed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleParse = async () => {
    setIsLoading(true);
    try {
      const res = await parseNaturalLanguageRequirementAsync(nlPrompt);
      setParsed(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAndMatch = () => {
    if (parsed) {
      try {
        localStorage.setItem('workconnect_active_job', JSON.stringify(parsed));
      } catch (e) {
        console.error('Error storing active job requirement:', e);
      }
    }
    onNavigate('/business/matches');
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-slate-900">Post Work Requirement</h1>
          <Badge variant="primary">AI Decomposer (Gemini 1.5 Flash)</Badge>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Describe your work in plain words (Hinglish/English). Gemini AI structures specs into distinct worker count, quota, deadline & rate fields.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card borderVariant="indigo" className="p-6 space-y-4 bg-white shadow-sm">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Natural Language Requirement</label>
            <textarea
              value={nlPrompt}
              onChange={(e) => setNlPrompt(e.target.value)}
              rows={4}
              className="w-full p-3.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
            />
          </div>

          <Button variant="primary" size="md" icon="sparkles" onClick={handleParse} fullWidth disabled={isLoading}>
            {isLoading ? 'Extracting via Gemini AI...' : 'Extract Work Order Specs'}
          </Button>

          {/* Prompt Presets for Quick Testing */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quick Test Prompts</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setNlPrompt('I need 2 labours for paint in my hall i can give them 700/day')}
                className="text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-md"
              >
                🎨 2 Labours Painting (700/day)
              </button>
              <button
                onClick={() => setNlPrompt('Mujhe 20 solar panels install karwane hain 3 din mein')}
                className="text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-md"
              >
                ⚡ 20 Solar Panels (3 days)
              </button>
              <button
                onClick={() => setNlPrompt('Mujhe 100 kurtis stitch karwani hain aur 2 workers chahiye')}
                className="text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-md"
              >
                🧵 100 Kurtis (2 workers)
              </button>
            </div>
          </div>
        </Card>

        <div>
          {parsed ? (
            <Card borderVariant={parsed.needsClarification ? 'rose' : 'emerald'} className="p-6 space-y-4 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs text-indigo-700 uppercase">Extracted Specs</span>
                <Badge variant={parsed.needsClarification ? 'secondary' : 'success'}>
                  {parsed.engineName || (parsed.needsClarification ? 'Needs Clarification' : 'AI Verified')}
                </Badge>
              </div>

              {parsed.needsClarification && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 font-medium">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Icon name="alert-circle" className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Could not confidently identify the required skill.</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Please describe the work more specifically (e.g. "Need 100 kurtis stitched" or "Need 2 workers for painting").
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Work Type</span>
                  <p className="font-bold text-slate-900 mt-0.5">{parsed.workType}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Required Skill</span>
                  <p className={`font-bold mt-0.5 ${parsed.needsClarification ? 'text-amber-700' : 'text-indigo-700'}`}>{parsed.requiredSkill || parsed.skillName}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Workers Needed</span>
                  <p className="font-bold text-purple-700 mt-0.5">
                    {parsed.workersNeeded ? `${parsed.workersNeeded} Workers` : 'Not specified'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Total Work Quota</span>
                  <p className="font-bold text-emerald-700 mt-0.5">
                    {parsed.totalQuantity ? `${parsed.totalQuantity} ${parsed.unitLabel || 'units'}` : 'Not specified'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Deadline Velocity</span>
                  <p className="font-bold text-amber-700 mt-0.5">
                    {parsed.deadlineDays ? `${parsed.deadlineDays} Days` : 'Not specified'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Offered Budget / Rate</span>
                  <p className="font-bold text-blue-700 mt-0.5">
                    {parsed.suggestedRate ? `₹${parsed.suggestedRate} ${parsed.rateUnit ? parsed.rateUnit : ''}` : 'Negotiable'}
                  </p>
                </div>
              </div>

              <Button
                variant={parsed.needsClarification ? 'outline' : 'secondary'}
                size="lg"
                icon="arrow-right"
                iconPosition="right"
                onClick={handleConfirmAndMatch}
                fullWidth
              >
                Find & Rank Matched Workers
              </Button>
            </Card>
          ) : (
            <div className="p-10 rounded-2xl border border-dashed border-slate-300 text-center space-y-2 text-slate-500 text-xs bg-white">
              <Icon name="sparkles" className="w-8 h-8 mx-auto text-indigo-500" />
              <p>Click "Extract Work Order Specs" to process natural language prompt.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
