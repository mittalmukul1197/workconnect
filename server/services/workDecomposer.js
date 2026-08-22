/* global process */
// WorkConnect AI Natural Language Work Decomposer Service
// Integrates Gemini 1.5 Flash API with strict structured JSON output schema & backend validation layer.

const GEMINI_API_KEY = (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.GEMINI_API_KEY) || '';

/**
 * Main Async Decomposer Entry Point
 * Calls Gemini API when API key is available, with instant seamless fallback to local parser.
 */
export async function parseNaturalLanguageRequirementAsync(promptText) {
  if (!promptText || typeof promptText !== 'string' || !promptText.trim()) {
    return getClarificationDecomposition(promptText || '');
  }

  // Attempt Gemini API call if API key configured
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here' && GEMINI_API_KEY.length > 10) {
    try {
      const geminiResult = await callGeminiApiForDecomposition(promptText, GEMINI_API_KEY);
      if (geminiResult && geminiResult.requiredSkill) {
        return validateAndSanitizeDecomposition(geminiResult, promptText, 'Gemini 1.5 Flash AI');
      }
    } catch (err) {
      console.warn('Gemini API call failed or timed out. Falling back to local decomposer:', err.message);
    }
  }

  // Fallback to local parser
  const localResult = parseNaturalLanguageRequirementLocal(promptText);
  return validateAndSanitizeDecomposition(localResult, promptText, 'Deterministic Engine Fallback');
}

/**
 * Synchronous Decomposer Entry Point (Backward Compatibility)
 */
export function parseNaturalLanguageRequirement(promptText) {
  if (!promptText || typeof promptText !== 'string' || !promptText.trim()) {
    return getClarificationDecomposition(promptText || '');
  }
  const localResult = parseNaturalLanguageRequirementLocal(promptText);
  return validateAndSanitizeDecomposition(localResult, promptText, 'Deterministic Engine');
}

/**
 * Gemini API Server Integration
 */
async function callGeminiApiForDecomposition(promptText, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = `You are an expert work decomposer for WorkConnect, a hyperlocal Indian work marketplace.
Extract structured job requirements from natural language input (Hinglish or English).
STRICT Extraction Rules:
- "workersNeeded": Number of labourers, workers, mazdoor, people requested (e.g. "2 labours" -> workersNeeded = 2). NEVER interpret worker count as totalQuantity or walls/pieces!
- "totalQuantity": Number of physical items to produce/repair/paint (e.g. "10 walls", "100 kurtis", "20 solar panels"). ONLY set if explicitly mentioned as work units. If NOT mentioned, return null.
- "unitLabel": Unit of work ("walls", "kurtis", "panels", "bulbs", "rooms", "boxes"). If no totalQuantity, set null.
- "requiredSkill": Skill needed ("Painting", "Stitching", "Solar Panel Installation", "Electrical Wiring", "Electrical Repair", "Plumbing", "Tile & Civil Masonry", "Welding", "Packaging", "Carpentry", "Daily Labour", "Styling").
- "workType": Work category ("Painting & Wall Finishing", "Garment Manufacturing & Apparel", "Solar / Electrical Installation", "Electrical Repair & Maintenance", "Plumbing & Pipe Fitting").
- "suggestedRate": Offered rate number (e.g. 700 from "700/day").
- "rateUnit": Unit of pay ("per worker per day", "per piece", "total job").
- "deadlineDays": Number of days for deadline. If NOT mentioned, return null. Do NOT invent a deadline.
- "accessibilityRequirements": Array of accessibility accommodation strings if mentioned.

You MUST return valid JSON matching this schema:
{
  "workType": string | null,
  "requiredSkill": string | null,
  "workersNeeded": number | null,
  "totalQuantity": number | null,
  "unitLabel": string | null,
  "deadlineDays": number | null,
  "suggestedRate": number | null,
  "rateUnit": string | null,
  "location": string | null,
  "shift": string | null,
  "accessibilityRequirements": string[]
}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: systemInstruction },
          { text: `Work Requirement Prompt: "${promptText}"` }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.1
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Gemini API HTTP Error ${response.status}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  return JSON.parse(rawText);
}

/**
 * Backend Validation & Sanitization Layer
 * Enforces strict distinction between workersNeeded vs totalQuantity vs rate vs deadline.
 */
function validateAndSanitizeDecomposition(raw, promptText, engineName = 'AI Verified') {
  const text = (promptText || '').toLowerCase();

  let requiredSkill = raw.requiredSkill || raw.skillName || null;
  let workType = raw.workType || null;
  let workersNeeded = typeof raw.workersNeeded === 'number' && raw.workersNeeded > 0 ? raw.workersNeeded : null;
  let totalQuantity = typeof raw.totalQuantity === 'number' && raw.totalQuantity > 0 ? raw.totalQuantity : null;
  let unitLabel = raw.unitLabel || null;
  let deadlineDays = typeof raw.deadlineDays === 'number' && raw.deadlineDays > 0 ? raw.deadlineDays : null;
  let suggestedRate = typeof raw.suggestedRate === 'number' && raw.suggestedRate > 0 ? raw.suggestedRate : (typeof raw.suggestedRatePerUnit === 'number' ? raw.suggestedRatePerUnit : null);
  let rateUnit = raw.rateUnit || null;

  // Validation Rule 1: Detect worker count in prompt ("2 labours", "2 workers", "5 painter", "2 mazdoor")
  const workerMatch = text.match(/(\d+)\s*(labour|labours|worker|workers|person|people|mazdoor|mazdooron|staff|karigar|painter|painters|tailor|tailors|electrician|electricians|plumber|plumbers)/i);
  if (workerMatch && workerMatch[1]) {
    workersNeeded = parseInt(workerMatch[1], 10);

    // If totalQuantity was incorrectly set to worker count without explicit wall/unit mentions, clear totalQuantity!
    if (totalQuantity === workersNeeded && !text.match(/(\d+)\s*(walls|rooms|kurtis|pieces|pcs|boxes|units|panels|bulbs|fans|houses|doors)/i)) {
      totalQuantity = null;
      unitLabel = null;
    }
  }

  // Validation Rule 2: Explicit Work Quantity detection ("10 walls", "100 kurtis", "20 solar panels", "50 fans")
  const qtyMatch = text.match(/(\d+)\s*(kurtis|pieces|pcs|boxes|units|setups|repairs|panels|bulbs|fans|rooms|kamre|ghar|houses|points|walls|doors)/i);
  if (qtyMatch && qtyMatch[1]) {
    const val = parseInt(qtyMatch[1], 10);
    const label = qtyMatch[2] ? qtyMatch[2].toLowerCase() : 'units';

    // Only set as totalQuantity if label is NOT a worker synonym
    if (!['labour', 'labours', 'worker', 'workers', 'mazdoor', 'people', 'karigar'].includes(label)) {
      totalQuantity = val;
      unitLabel = label;
    }
  }

  // Validation Rule 3: Rate & Pay Unit Extraction ("700/day", "700 per day", "700 per worker")
  const rateMatch = text.match(/(\d+)\s*(\/|per|\s*a\s*)(day|din|piece|pc|wall|hr|hour|worker)/i);
  if (rateMatch && rateMatch[1]) {
    suggestedRate = parseInt(rateMatch[1], 10);
    const unitStr = (rateMatch[3] || 'day').toLowerCase();
    rateUnit = unitStr.includes('day') || unitStr.includes('din') || unitStr.includes('worker')
      ? 'per worker per day'
      : `per ${unitStr}`;
  }

  // Validation Rule 4: Deadline Extraction ("in 5 days", "within 3 days", "5 din mein")
  const dayMatch = text.match(/(\d+)\s*(din|days|day|hrs|hours)/i);
  if (dayMatch && dayMatch[1]) {
    deadlineDays = parseInt(dayMatch[1], 10);
  } else if (!raw.deadlineDays) {
    deadlineDays = null; // Do NOT invent deadline
  }

  // Validation Rule 5: Skill & Work Type Sanitization
  if (!requiredSkill || requiredSkill === 'Needs clarification') {
    if (text.includes('paint')) {
      requiredSkill = 'Painting';
      workType = 'Painting & Wall Finishing';
    } else if (text.includes('stitch') || text.includes('kurti') || text.includes('silai')) {
      requiredSkill = 'Stitching';
      workType = 'Garment Manufacturing & Apparel';
    } else if (text.includes('solar') || text.includes('panel')) {
      requiredSkill = 'Solar Panel Installation';
      workType = 'Solar / Electrical Installation';
    } else if (text.includes('wiring') || text.includes('electrical')) {
      requiredSkill = 'Electrical Wiring';
      workType = 'Electrical Contracting';
    } else if (text.includes('bulb') || text.includes('fan') || text.includes('repair')) {
      requiredSkill = 'Electrical Repair';
      workType = 'Electrical Repair & Maintenance';
    } else if (text.includes('plumb') || text.includes('pipe')) {
      requiredSkill = 'Plumbing';
      workType = 'Plumbing & Pipe Fitting';
    } else {
      requiredSkill = 'Needs clarification';
      workType = 'Unspecified Work Type';
    }
  }

  const needsClarification = requiredSkill === 'Needs clarification';

  // Capacity calculation
  let requiredDailyCapacityPerWorker = null;
  if (totalQuantity && deadlineDays) {
    const numWorkers = workersNeeded || 1;
    requiredDailyCapacityPerWorker = Math.max(1, Math.ceil(totalQuantity / (deadlineDays * numWorkers)));
  }

  return {
    rawPrompt: promptText,
    workType: workType || 'General Contracting',
    skillName: requiredSkill,
    requiredSkill,
    workersNeeded,
    totalQuantity,
    unitLabel: unitLabel || (totalQuantity ? 'units' : null),
    deadlineDays,
    suggestedRate,
    rateUnit: rateUnit || (suggestedRate ? 'per unit' : null),
    requiredDailyCapacityPerWorker,
    confidenceScore: needsClarification ? 0.40 : 0.95,
    needsClarification,
    engineName
  };
}

/**
 * Enhanced Deterministic Local Parser (Fallback Engine)
 */
function parseNaturalLanguageRequirementLocal(promptText) {
  const text = promptText.toLowerCase().trim();

  let requiredSkill = null;
  let workType = null;

  if (text.includes('paint') || text.includes('painter') || text.includes('rang')) {
    requiredSkill = 'Painting';
    workType = 'Painting & Wall Finishing';
  } else if (text.includes('stitch') || text.includes('kurti') || text.includes('kurtis') || text.includes('silai') || text.includes('kapde') || text.includes('tailor')) {
    requiredSkill = 'Stitching';
    workType = 'Garment Manufacturing & Apparel';
  } else if (text.includes('solar') || text.includes('panel')) {
    requiredSkill = 'Solar Panel Installation';
    workType = 'Solar / Electrical Installation';
  } else if (text.includes('wiring') || text.includes('wire') || text.includes('electrician')) {
    requiredSkill = 'Electrical Wiring';
    workType = 'Electrical Contracting';
  } else if (text.includes('bulb') || text.includes('fan') || text.includes('fans') || text.includes('ac') || text.includes('repair')) {
    requiredSkill = 'Electrical Repair';
    workType = 'Electrical Repair & Maintenance';
  } else if (text.includes('plumb') || text.includes('plumber') || text.includes('pipe') || text.includes('nal')) {
    requiredSkill = 'Plumbing';
    workType = 'Plumbing & Pipe Fitting';
  } else if (text.includes('mason') || text.includes('tile') || text.includes('tiles') || text.includes('brick')) {
    requiredSkill = 'Tile & Civil Masonry';
    workType = 'Construction & Civil Work';
  } else if (text.includes('weld') || text.includes('welder') || text.includes('gate') || text.includes('grill')) {
    requiredSkill = 'Welding & Metalwork';
    workType = 'Metal Fabrication';
  } else if (text.includes('pack') || text.includes('packing') || text.includes('box') || text.includes('boxes')) {
    requiredSkill = 'Packaging';
    workType = 'Handicraft & Home Packaging';
  } else if (text.includes('carpenter') || text.includes('wood') || text.includes('furniture')) {
    requiredSkill = 'Carpentry';
    workType = 'Woodwork & Furniture Repair';
  } else if (text.includes('labour') || text.includes('helper') || text.includes('loading') || text.includes('shifting')) {
    requiredSkill = 'Daily Labour';
    workType = 'Site Helper & Material Shifting';
  }

  return {
    workType,
    requiredSkill
  };
}

function getClarificationDecomposition(promptText) {
  return {
    rawPrompt: promptText,
    workType: 'Unspecified Work Type',
    skillName: 'Needs clarification',
    requiredSkill: 'Needs clarification',
    workersNeeded: null,
    totalQuantity: null,
    unitLabel: null,
    deadlineDays: null,
    suggestedRate: null,
    rateUnit: null,
    requiredDailyCapacityPerWorker: null,
    confidenceScore: 0.40,
    needsClarification: true,
    engineName: 'Needs Clarification'
  };
}
