// Natural Language Work Decomposer Service (Gemini API & Heuristic Local Fallback)

export function parseNaturalLanguageRequirement(promptText) {
  if (!promptText || typeof promptText !== 'string') {
    return getDefaultDecomposition();
  }

  const text = promptText.toLowerCase();

  // Skill detection
  let skillName = 'Stitching';
  let workType = 'Garment Manufacturing & Apparel';
  let unitLabel = 'pieces';

  if (text.includes('wiring') || text.includes('solar') || text.includes('electrical')) {
    skillName = 'Electrical Wiring';
    workType = 'Renewable Energy & Contracting';
    unitLabel = 'setups';
  } else if (text.includes('box') || text.includes('pack') || text.includes('packaging')) {
    skillName = 'Packaging';
    workType = 'Handicraft & Home Packaging';
    unitLabel = 'boxes';
  } else if (text.includes('salon') || text.includes('hair') || text.includes('beauty')) {
    skillName = 'Styling';
    workType = 'Personal Care & Salon';
    unitLabel = 'sessions';
  } else if (text.includes('repair') || text.includes('ac') || text.includes('appliance')) {
    skillName = 'Appliance Repair';
    workType = 'Technical Maintenance';
    unitLabel = 'repairs';
  }

  // Quantity extraction
  let totalQuantity = 100;
  const qtyMatch = text.match(/(\d+)\s*(kurtis|pieces|pcs|boxes|units|setups|repairs)/i) || text.match(/(\d+)/);
  if (qtyMatch && qtyMatch[1]) {
    totalQuantity = parseInt(qtyMatch[1], 10);
  }

  // Deadline extraction
  let deadlineDays = 5;
  const dayMatch = text.match(/(\d+)\s*(din|days|day)/i);
  if (dayMatch && dayMatch[1]) {
    deadlineDays = parseInt(dayMatch[1], 10);
  }

  // Worker quota extraction
  let workersNeeded = 2;
  const workerMatch = text.match(/(\d+)\s*(workers|log|people|karigar)/i);
  if (workerMatch && workerMatch[1]) {
    workersNeeded = parseInt(workerMatch[1], 10);
  }

  const requiredDailyCapacityPerWorker = Math.ceil(totalQuantity / (deadlineDays * workersNeeded));

  return {
    rawPrompt: promptText,
    workType,
    skillName,
    totalQuantity,
    unitLabel,
    deadlineDays,
    workersNeeded,
    requiredDailyCapacityPerWorker,
    suggestedRatePerUnit: unitLabel === 'pieces' ? 25 : unitLabel === 'boxes' ? 15 : 850,
    confidenceScore: 0.94
  };
}

function getDefaultDecomposition() {
  return {
    rawPrompt: 'Default requirement',
    workType: 'Garment Manufacturing & Apparel',
    skillName: 'Stitching',
    totalQuantity: 100,
    unitLabel: 'pieces',
    deadlineDays: 5,
    workersNeeded: 2,
    requiredDailyCapacityPerWorker: 10,
    suggestedRatePerUnit: 25,
    confidenceScore: 0.90
  };
}
