// Natural Language Work Decomposer Service (Multilingual Hinglish/English Natural Language Parser)

export function parseNaturalLanguageRequirement(promptText) {
  if (!promptText || typeof promptText !== 'string' || !promptText.trim()) {
    return getClarificationDecomposition(promptText || '');
  }

  const text = promptText.toLowerCase().trim();

  let skillName;
  let workType;
  let unitLabel;
  const confidenceScore = 0.94;

  // 1. Solar & Electrical Installation
  if (
    text.includes('solar') ||
    text.includes('panel') ||
    text.includes('panelon') ||
    ((text.includes('lagwane') || text.includes('lagwana') || text.includes('install')) && (text.includes('solar') || text.includes('panel')))
  ) {
    skillName = 'Solar Panel Installation';
    workType = 'Solar / Electrical Installation';
    unitLabel = 'panels';
  }
  // 2. Electrical Wiring & Contracting
  else if (
    text.includes('wiring') ||
    text.includes('wire') ||
    text.includes('electrical') ||
    text.includes('electrician') ||
    text.includes('mcb') ||
    text.includes('switchboard')
  ) {
    skillName = 'Electrical Wiring';
    workType = 'Electrical Contracting';
    unitLabel = 'setups';
  }
  // 3. Electrical Repair & Appliance Testing/Maintenance
  else if (
    text.includes('bulb') ||
    text.includes('light') ||
    text.includes('fixture') ||
    text.includes('fan') ||
    text.includes('fans') ||
    text.includes('ac') ||
    text.includes('fridge') ||
    text.includes('refrigerator') ||
    text.includes('cooler') ||
    text.includes('appliance') ||
    (text.includes('repair') && !text.includes('pipe') && !text.includes('door')) ||
    text.includes('test') ||
    text.includes('testing')
  ) {
    if (text.includes('bulb') || text.includes('light')) {
      skillName = 'Electrical Repair';
      workType = 'Electrical Repair & Appliance Maintenance';
      unitLabel = 'bulbs';
    } else if (text.includes('fan')) {
      skillName = 'Electrical Repair';
      workType = 'Electrical Repair / Appliance Repair';
      unitLabel = 'fans';
    } else {
      skillName = 'Appliance Repair';
      workType = 'Electrical & Technical Maintenance';
      unitLabel = 'repairs';
    }
  }
  // 4. Stitching & Garment Manufacturing
  else if (
    text.includes('stitch') ||
    text.includes('stitching') ||
    text.includes('kurti') ||
    text.includes('kurtis') ||
    text.includes('silai') ||
    text.includes('silwane') ||
    text.includes('silwana') ||
    text.includes('kapde') ||
    text.includes('kapda') ||
    text.includes('cloth') ||
    text.includes('clothes') ||
    text.includes('suit') ||
    text.includes('tailor') ||
    text.includes('sewing') ||
    text.includes('embroidery') ||
    text.includes('alteration') ||
    text.includes('dressmaker')
  ) {
    skillName = 'Stitching';
    workType = 'Garment Manufacturing & Apparel';
    unitLabel = text.includes('kurti') ? 'kurtis' : 'pieces';
  }
  // 5. Plumbing & Pipe Fitting
  else if (
    text.includes('plumb') ||
    text.includes('plumber') ||
    text.includes('plumbing') ||
    text.includes('pipe') ||
    text.includes('fitting') ||
    text.includes('leak') ||
    text.includes('tap') ||
    text.includes('nal') ||
    text.includes('sanitary') ||
    text.includes('tank')
  ) {
    skillName = 'Plumbing';
    workType = 'Plumbing & Pipe Fitting';
    unitLabel = text.includes('ghar') || text.includes('house') || text.includes('room') ? 'houses' : 'points';
  }
  // 6. Painting & Waterproofing
  else if (
    text.includes('paint') ||
    text.includes('painter') ||
    text.includes('painting') ||
    text.includes('rang') ||
    text.includes('putty') ||
    text.includes('waterproof')
  ) {
    skillName = 'Painting';
    workType = 'Painting & Wall Finishing';
    unitLabel = text.includes('room') || text.includes('kamre') ? 'rooms' : 'walls';
  }
  // 7. Masonry, Tiles & Civil Work
  else if (
    text.includes('mason') ||
    text.includes('tile') ||
    text.includes('tiles') ||
    text.includes('brick') ||
    text.includes('cement') ||
    text.includes('construction') ||
    text.includes('plaster') ||
    text.includes('mistry')
  ) {
    skillName = 'Tile & Civil Masonry';
    workType = 'Construction & Civil Work';
    unitLabel = text.includes('tile') ? 'tiles' : 'sqft';
  }
  // 8. Welding & Metalwork
  else if (
    text.includes('weld') ||
    text.includes('welding') ||
    text.includes('welder') ||
    text.includes('gate') ||
    text.includes('grill') ||
    text.includes('shutter') ||
    text.includes('iron')
  ) {
    skillName = 'Welding & Metalwork';
    workType = 'Metal Fabrication';
    unitLabel = 'structures';
  }
  // 9. Packaging & Crafts
  else if (
    text.includes('pack') ||
    text.includes('packing') ||
    text.includes('packaging') ||
    text.includes('box') ||
    text.includes('boxes') ||
    text.includes('gift') ||
    text.includes('craft')
  ) {
    skillName = 'Packaging';
    workType = 'Handicraft & Home Packaging';
    unitLabel = 'boxes';
  }
  // 10. Carpentry & Woodwork
  else if (
    text.includes('carpenter') ||
    text.includes('wood') ||
    text.includes('furniture') ||
    text.includes('door') ||
    text.includes('drawer')
  ) {
    skillName = 'Carpentry';
    workType = 'Woodwork & Furniture Repair';
    unitLabel = 'items';
  }
  // 11. Daily Labour & Shifting
  else if (
    text.includes('labour') ||
    text.includes('helper') ||
    text.includes('loading') ||
    text.includes('unloading') ||
    text.includes('shifting')
  ) {
    skillName = 'Daily Labour';
    workType = 'Site Helper & Material Shifting';
    unitLabel = 'days';
  }
  // 12. Salon & Personal Care
  else if (
    text.includes('salon') ||
    text.includes('beauty') ||
    text.includes('hair') ||
    text.includes('makeup')
  ) {
    skillName = 'Styling';
    workType = 'Personal Care & Salon';
    unitLabel = 'sessions';
  }
  // Fallback: Could not confidently identify skill
  else {
    return getClarificationDecomposition(promptText);
  }

  // Quantity extraction
  let totalQuantity = 10;
  const qtyMatch = text.match(/(\d+)\s*(kurtis|pieces|pcs|boxes|units|setups|repairs|panels|bulbs|fans|rooms|kamre|ghar|houses|points|items|days)?/i);
  if (qtyMatch && qtyMatch[1]) {
    totalQuantity = parseInt(qtyMatch[1], 10);
  }

  // Deadline extraction
  let deadlineDays = 5;
  const dayMatch = text.match(/(\d+)\s*(din|days|day|hrs|hours)/i);
  if (dayMatch && dayMatch[1]) {
    deadlineDays = parseInt(dayMatch[1], 10);
  }

  // Worker quota extraction
  let workersNeeded = 2;
  const workerMatch = text.match(/(\d+)\s*(workers|log|people|karigar|help|labor)/i);
  if (workerMatch && workerMatch[1]) {
    workersNeeded = parseInt(workerMatch[1], 10);
  }

  const requiredDailyCapacityPerWorker = Math.max(1, Math.ceil(totalQuantity / (deadlineDays * workersNeeded)));

  let suggestedRatePerUnit = 25;
  if (unitLabel === 'panels' || unitLabel === 'setups') suggestedRatePerUnit = 450;
  else if (unitLabel === 'bulbs' || unitLabel === 'fans' || unitLabel === 'repairs') suggestedRatePerUnit = 150;
  else if (unitLabel === 'boxes') suggestedRatePerUnit = 15;
  else if (unitLabel === 'rooms') suggestedRatePerUnit = 800;

  return {
    rawPrompt: promptText,
    workType,
    skillName,
    totalQuantity,
    unitLabel,
    deadlineDays,
    workersNeeded,
    requiredDailyCapacityPerWorker,
    suggestedRatePerUnit,
    confidenceScore,
    needsClarification: false
  };
}

function getClarificationDecomposition(promptText) {
  return {
    rawPrompt: promptText,
    workType: 'Unspecified Work Type',
    skillName: 'Needs clarification',
    totalQuantity: 1,
    unitLabel: 'units',
    deadlineDays: 3,
    workersNeeded: 1,
    requiredDailyCapacityPerWorker: 1,
    suggestedRatePerUnit: 100,
    confidenceScore: 0.40,
    needsClarification: true
  };
}
