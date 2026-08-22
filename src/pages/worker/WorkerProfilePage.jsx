import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import { Input } from '../../components/common/Input';

export const WorkerProfilePage = ({ onNavigate }) => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Editable disability state initialized from user context
  const [hasDisability, setHasDisability] = useState(user?.hasDisability || false);
  const [disabilityTypes, setDisabilityTypes] = useState(
    user?.disabilityTypes || (user?.disabilityType ? [user.disabilityType] : ['Locomotor / Physical Disability'])
  );
  const [disabilityOther, setDisabilityOther] = useState(user?.disabilityOther || '');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState(
    user?.accessibilityNeeds || user?.disabilityAccommodations || ['Wheelchair accessible workplace', 'Flexible working hours']
  );
  const [accessibilityOther, setAccessibilityOther] = useState(user?.accessibilityOther || '');
  const [additionalNotes, setAdditionalNotes] = useState(user?.additionalAccessibilityNotes || '');

  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  const handleSaveDisabilityProfile = (e) => {
    e.preventDefault();
    const updatedData = {
      hasDisability,
      disabilityTypes: hasDisability ? disabilityTypes : [],
      disabilityOther: (hasDisability && disabilityTypes.includes('Other')) ? disabilityOther : '',
      accessibilityNeeds: hasDisability ? accessibilityNeeds : [],
      accessibilityOther: (hasDisability && accessibilityNeeds.includes('Other')) ? accessibilityOther : '',
      additionalAccessibilityNotes: hasDisability ? additionalNotes : '',
      disabilityType: hasDisability ? (disabilityTypes.length > 0 ? disabilityTypes.join(', ') : (disabilityOther || 'Person with Disability')) : '',
      disabilityAccommodations: hasDisability ? accessibilityNeeds : [],
      workPassport: {
        ...user?.workPassport,
        verifiedBadges: Array.from(new Set([
          ...(user?.workPassport?.verifiedBadges || ['KYC Verified', 'Top Rated Artisan']),
          ...(hasDisability ? ['♿ PwD Inclusive Worker'] : [])
        ])).filter(b => hasDisability || b !== '♿ PwD Inclusive Worker')
      }
    };

    if (updateUserProfile) {
      updateUserProfile(updatedData);
    }
    setIsEditing(false);
    setSavedSuccessMsg('Accessibility & disability settings saved successfully!');
    setTimeout(() => setSavedSuccessMsg(''), 4000);
  };

  const worker = {
    name: user?.name || 'Sunita Sharma',
    email: user?.email || 'sunita@demo.com',
    phone: user?.phone || '+91 98765 11111',
    profession: user?.profession || 'Master Tailor & Designer',
    city: user?.city || 'Rajpura',
    address: user?.address || 'House #42, Model Town, Rajpura',
    experienceYears: user?.experienceYears || 6,
    dailyCapacity: user?.dailyCapacity || '30 pieces/day',
    expectedRate: user?.expectedRate || '₹700/day',
    hasDisability: user?.hasDisability || false,
    disabilityType: user?.disabilityType || (user?.disabilityTypes?.join(', ') || ''),
    disabilityAccommodations: user?.accessibilityNeeds || user?.disabilityAccommodations || [],
    additionalAccessibilityNotes: user?.additionalAccessibilityNotes || '',
    idVerified: user?.idVerified || 'Verified (Aadhaar KYC Completed)'
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl text-slate-900 pb-12">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Worker Account & Profile Settings</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Manage your artisan credentials, capacity & accessibility settings</p>
        </div>
        <Badge variant="success">Active Worker</Badge>
      </div>

      {savedSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 font-bold flex items-center gap-2 animate-fade-in shadow-xs">
          <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{savedSuccessMsg}</span>
        </div>
      )}

      <Card borderVariant="emerald" className="p-6 space-y-6 bg-white shadow-sm">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xl shadow-xs">
              {worker.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">{worker.name}</h2>
              <p className="text-xs font-bold text-emerald-700">{worker.profession}</p>
              <p className="text-xs text-slate-500">{worker.address}</p>
            </div>
          </div>
          <Badge variant="indigo" className="text-[10px]">{worker.idVerified}</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Contact Phone</span>
            <p className="font-bold text-slate-800">{worker.phone}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Email Address</span>
            <p className="font-bold text-slate-800">{worker.email}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Daily Capacity</span>
            <p className="font-bold text-emerald-700">{worker.dailyCapacity}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Expected Rate</span>
            <p className="font-bold text-emerald-700">{worker.expectedRate}</p>
          </div>
        </div>

        {/* DISABILITY & ACCESSIBILITY EDITABLE PROFILE SECTION */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-bold text-xs uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                <Icon name="shield-check" className="w-4 h-4 text-purple-600" />
                <span>Disability & Workplace Accessibility</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Private information used exclusively for accessibility-matched job recommendations
              </p>
            </div>

            <div className="flex items-center gap-2">
              {worker.hasDisability ? (
                <Badge variant="purple" className="text-[10px]">♿ Person with Disability (PwD)</Badge>
              ) : (
                <Badge variant="success" className="text-[10px]">Standard / Abled</Badge>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold"
              >
                {isEditing ? 'Cancel Edit' : 'Edit Accessibility'}
              </Button>
            </div>
          </div>

          {!isEditing ? (
            /* VIEW MODE */
            <div className="space-y-3">
              {worker.hasDisability ? (
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Icon name="check-circle" className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="font-bold text-purple-950">Category: {worker.disabilityType || 'Person with Disability'}</span>
                  </div>
                  {worker.disabilityAccommodations?.length > 0 && (
                    <div className="text-xs text-slate-600 space-y-1">
                      <span className="font-bold block text-slate-700">Requested Workplace Accommodations:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {worker.disabilityAccommodations.map((acc, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-purple-100/80 text-purple-900 text-[11px] font-medium border border-purple-200">
                            {acc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {worker.additionalAccessibilityNotes && (
                    <p className="text-[11px] text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-200 mt-2">
                      Notes: "{worker.additionalAccessibilityNotes}"
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No special physical accessibility or disability accommodations indicated.</p>
              )}
            </div>
          ) : (
            /* EDIT FORM MODE */
            <form onSubmit={handleSaveDisabilityProfile} className="space-y-4 text-xs animate-fade-in">
              <div className="space-y-2">
                <label className="font-bold text-slate-800 text-xs block">
                  Do you have a disability or any accessibility needs? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setHasDisability(false)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between ${
                      !hasDisability ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <span>No</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasDisability(true)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between ${
                      hasDisability ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <span>Yes (PwD)</span>
                  </button>
                </div>
              </div>

              {hasDisability && (
                <div className="space-y-4 pt-2 border-t border-slate-200">
                  <div className="space-y-2">
                    <label className="font-bold text-slate-800 text-xs block">Disability Types *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Locomotor / Physical Disability',
                        'Visual Disability',
                        'Hearing Disability',
                        'Speech Disability',
                        'Intellectual Disability',
                        'Specific Learning Disability',
                        'Mental Health / Psychosocial Disability',
                        'Multiple Disabilities',
                        'Other'
                      ].map((t) => {
                        const isChecked = disabilityTypes.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              if (isChecked) {
                                setDisabilityTypes(disabilityTypes.filter(x => x !== t));
                              } else {
                                setDisabilityTypes([...disabilityTypes, t]);
                              }
                            }}
                            className={`p-2 rounded-xl border text-left text-xs flex items-center gap-2 ${
                              isChecked ? 'border-purple-600 bg-purple-100/70 text-purple-950 font-bold' : 'border-slate-200 bg-white text-slate-700'
                            }`}
                          >
                            <Icon name={isChecked ? 'check-circle' : 'circle'} className={`w-3.5 h-3.5 ${isChecked ? 'text-purple-700' : 'text-slate-400'}`} />
                            <span>{t}</span>
                          </button>
                        );
                      })}
                    </div>
                    {disabilityTypes.includes('Other') && (
                      <Input
                        label="Other — Please specify"
                        value={disabilityOther}
                        onChange={(e) => setDisabilityOther(e.target.value)}
                        placeholder="Specify disability..."
                      />
                    )}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <label className="font-bold text-slate-800 text-xs block">Accessibility Accommodations *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Wheelchair accessible workplace',
                        'Ramp / step-free access',
                        'Accessible washroom',
                        'Flexible working hours',
                        'Work-from-home / remote work',
                        'Sign language support',
                        'Hearing assistance',
                        'Screen reader compatible tools',
                        'Large text / visual assistance',
                        'Accessible transportation',
                        'Seating accommodation',
                        'Additional break requirements',
                        'Other'
                      ].map((n) => {
                        const isChecked = accessibilityNeeds.includes(n);
                        return (
                          <button
                            key={n}
                            type="button"
                            onClick={() => {
                              if (isChecked) {
                                setAccessibilityNeeds(accessibilityNeeds.filter(x => x !== n));
                              } else {
                                setAccessibilityNeeds([...accessibilityNeeds, n]);
                              }
                            }}
                            className={`p-2 rounded-xl border text-left text-xs flex items-center gap-2 ${
                              isChecked ? 'border-indigo-600 bg-indigo-100/70 text-indigo-950 font-bold' : 'border-slate-200 bg-white text-slate-700'
                            }`}
                          >
                            <Icon name={isChecked ? 'check-circle' : 'circle'} className={`w-3.5 h-3.5 ${isChecked ? 'text-indigo-700' : 'text-slate-400'}`} />
                            <span>{n}</span>
                          </button>
                        );
                      })}
                    </div>
                    {accessibilityNeeds.includes('Other') && (
                      <Input
                        label="Other Accommodation — Please specify"
                        value={accessibilityOther}
                        onChange={(e) => setAccessibilityOther(e.target.value)}
                        placeholder="Specify accommodation..."
                      />
                    )}
                    <div className="pt-2">
                      <label className="font-bold text-slate-700 text-xs block mb-1">Additional Notes</label>
                      <textarea
                        rows={2}
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" icon="check">
                  Save Accessibility Settings
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};


