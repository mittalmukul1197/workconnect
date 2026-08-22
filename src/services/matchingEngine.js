// WorkConnect Real-Time Two-Sided Matching & Recommendation Engine
// Scoring Model: 8 Dimensions (Total 100%)
// 1. Skill Fit (30%)
// 2. Availability (15%)
// 3. Capacity (15%)
// 4. Location & Proximity (10%)
// 5. Experience & Portfolio (10%)
// 6. Work Passport Reliability (10%)
// 7. Budget & Pay Rate Fit (5%)
// 8. Accessibility Compatibility (5%)

// Helper: Normalize string for fuzzy keyword comparison
export const normalizeText = (str) => {
  return (str || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
};

// Skill Taxonomy & Synonym Groups
const SKILL_CLUSTERS = {
  stitching: ['stitching', 'tailor', 'tailoring', 'suit', 'kurti', 'apparel', 'garment', 'embroidery', 'alterations', 'pattern cutting', 'dressmaker'],
  electrical: ['electrical', 'wiring', 'electrician', 'solar', 'mcb', 'switchboard', 'inverter', 'cabling', 'installation', 'appliance repair'],
  packaging: ['packaging', 'packing', 'box', 'gift box', 'handicraft', 'crafts', 'warehouse helper', 'godown'],
  carpentry: ['carpenter', 'woodwork', 'wood', 'furniture', 'door', 'lock', 'cabinet', 'polishing'],
  plumbing: ['plumber', 'pipe', 'leak', 'drainage', 'tap', 'tank', 'sanitary'],
  repair: ['repair', 'ac', 'refrigerator', 'washing machine', 'appliance', 'cooling', 'technician'],
  labour: ['labour', 'helper', 'loading', 'unloading', 'site helper', 'shifting', 'heavy lifting', 'manual'],
  masonry: ['mason', 'civil', 'brickwork', 'tile', 'plastering', 'cementing', 'marble'],
  painting: ['painter', 'paint', 'waterproofing', 'putty', 'wall paint', 'enamel'],
  welding: ['welder', 'welding', 'fabricator', 'metal', 'iron', 'shutter', 'railing', 'gate'],
  beauty: ['salon', 'styling', 'beauty', 'hair', 'personal care', 'makeup']
};

export const calculateSkillFit = (worker, job) => {
  const jobSkill = normalizeText(job?.skillName || job?.skillRequired || job?.title || '');
  const workerSkills = [
    worker?.primarySkill,
    ...(worker?.skillsList || []),
    ...(worker?.skills || []),
    worker?.profession
  ].filter(Boolean).map(normalizeText);

  if (!jobSkill) return 25; // Default score if no requirement specified

  let bestScore = 5; // Base minimum score

  // Check direct matches & cluster matches
  for (const skill of workerSkills) {
    if (!skill) continue;

    // Exact or substring match
    if (skill.includes(jobSkill) || jobSkill.includes(skill)) {
      return 30;
    }

    // Cluster matching
    for (const [, synonyms] of Object.entries(SKILL_CLUSTERS)) {
      const isJobInCluster = synonyms.some((s) => jobSkill.includes(s) || s.includes(jobSkill));
      const isWorkerInCluster = synonyms.some((s) => skill.includes(s) || s.includes(skill));

      if (isJobInCluster && isWorkerInCluster) {
        bestScore = Math.max(bestScore, 27); // Strong related skill match
      }
    }
  }

  return bestScore;
};

export const calculateAvailabilityFit = (worker) => {
  if (worker?.availableToday !== false) return 15;
  return 10;
};

export const calculateCapacityFit = (worker, job) => {
  const extractNumber = (val) => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const match = val.toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const workerCap = extractNumber(worker?.dailyCapacity || worker?.remainingCapacity || 25);
  const requiredCap = extractNumber(job?.requiredDailyCapacityPerWorker || job?.quota || 10);

  if (!requiredCap || requiredCap <= 0) return 15;

  if (workerCap >= requiredCap) {
    return 15; // Full capacity fit
  } else if (workerCap >= requiredCap * 0.7) {
    return 11;
  } else if (workerCap >= requiredCap * 0.4) {
    return 7;
  }
  return 4;
};

export const calculateLocationFit = (worker, job) => {
  const workerCity = normalizeText(worker?.city || 'Rajpura');
  const jobCity = normalizeText(job?.city || 'Rajpura');

  const distance = typeof job?.distanceKm === 'number' ? job.distanceKm : 5.0;
  const radius = extractNumber(worker?.workRadiusKm || '10 km');

  function extractNumber(str) {
    if (typeof str === 'number') return str;
    const match = (str || '').toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : 10;
  }

  if (workerCity === jobCity) {
    if (distance <= radius) return 10;
    return 8;
  }

  // Nearby city in same district
  return 5;
};

export const calculateExperienceFit = (worker) => {
  const expYears = typeof worker?.experienceYears === 'number'
    ? worker.experienceYears
    : typeof worker?.experience === 'number'
    ? worker.experience
    : 4;

  if (expYears >= 5) return 10;
  if (expYears >= 3) return 8.5;
  if (expYears >= 1) return 7;
  return 5;
};

export const calculateReliabilityFit = (worker) => {
  const passport = worker?.workPassport || {};
  const rating = worker?.rating || passport?.overallRating || 4.8;
  const onTimeRate = passport?.onTimeRate || 95;
  const qualityScore = passport?.qualityScore || 92;

  const ratingScore = (rating / 5.0) * 4.0; // max 4.0
  const onTimeScore = (onTimeRate / 100.0) * 3.0; // max 3.0
  const qualityComp = (qualityScore / 100.0) * 3.0; // max 3.0

  return Math.min(10, Math.round((ratingScore + onTimeScore + qualityComp) * 10) / 10);
};

export const calculateBudgetFit = (worker, job) => {
  const extractRateNumber = (str) => {
    if (typeof str === 'number') return str;
    if (!str) return 0;
    const match = str.toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const expectedRate = extractRateNumber(worker?.expectedRate || worker?.rate || 25);
  const offeredRate = extractRateNumber(job?.suggestedRatePerUnit || job?.offeredBudget || job?.budgetPerUnit || 25);

  if (!expectedRate || !offeredRate) return 5;

  const ratio = offeredRate / expectedRate;
  if (ratio >= 0.9) return 5;
  if (ratio >= 0.75) return 4;
  if (ratio >= 0.5) return 3;
  return 2;
};

export const calculateAccessibilityFit = (worker, job) => {
  const hasDisability = worker?.hasDisability || false;
  const accommodations = worker?.disabilityAccommodations || [];

  // Non-PwD workers receive full baseline neutral score (5/5)
  if (!hasDisability || accommodations.length === 0) {
    return { score: 5, compatible: true, isInclusivePreference: false };
  }

  // Job explicit accessibility information
  const isJobAccessible = job?.accessibilitySupported !== false;
  const supportedAccs = job?.supportedAccommodations || [
    'Wheelchair Accessible Workspace',
    'Flexible Work Hours / Rest Breaks',
    'Home-based / Remote Work Option'
  ];

  if (!isJobAccessible) {
    return { score: 1, compatible: false, isInclusivePreference: false };
  }

  // Check overlap between worker needed accommodations and job supported accommodations
  const hasMatchingAccommodation = accommodations.some((acc) =>
    supportedAccs.some((sup) => sup.toLowerCase().includes(acc.toLowerCase()) || acc.toLowerCase().includes(sup.toLowerCase()))
  );

  if (hasMatchingAccommodation || supportedAccs.length > 0) {
    return { score: 5, compatible: true, isInclusivePreference: true };
  }

  return { score: 3, compatible: true, isInclusivePreference: false };
};

// Main Match Calculation Engine (Two-Sided)
export const calculateWorkerJobMatch = (worker, job) => {
  if (!worker || !job) {
    return {
      totalScore: 85,
      breakdown: {
        skillFitScore: 25,
        availabilityScore: 15,
        capacityScore: 15,
        locationScore: 8,
        experienceScore: 8,
        reliabilityScore: 9,
        budgetFitScore: 5,
        accessibilityScore: 5
      },
      reasons: ['Verified local worker'],
      accessibilityCompatible: true
    };
  }

  const skillFitScore = calculateSkillFit(worker, job);
  const availabilityScore = calculateAvailabilityFit(worker, job);
  const capacityScore = calculateCapacityFit(worker, job);
  const locationScore = calculateLocationFit(worker, job);
  const experienceScore = calculateExperienceFit(worker);
  const reliabilityScore = calculateReliabilityFit(worker);
  const budgetFitScore = calculateBudgetFit(worker, job);
  const accessResult = calculateAccessibilityFit(worker, job);
  const accessibilityScore = accessResult.score;

  const rawTotal = skillFitScore + availabilityScore + capacityScore + locationScore + experienceScore + reliabilityScore + budgetFitScore + accessibilityScore;
  const totalScore = Math.min(99, Math.max(50, Math.round(rawTotal)));

  // Generate Human-Readable Recommendation Reasons
  const reasons = [];

  if (skillFitScore >= 27) {
    reasons.push(`Strong ${job.skillName || job.skillRequired || 'trade'} skill compatibility`);
  } else if (skillFitScore >= 20) {
    reasons.push(`Related ${worker.primarySkill || worker.profession || 'trade'} background`);
  }

  const workerCapStr = worker.dailyCapacity || '25 pcs/day';
  const reqCapStr = job.requiredDailyCapacityPerWorker ? `${job.requiredDailyCapacityPerWorker}/day` : 'required daily quota';
  if (capacityScore >= 15) {
    reasons.push(`Daily capacity (${workerCapStr}) fully satisfies ${reqCapStr}`);
  }

  if (locationScore >= 8) {
    reasons.push(`Located in ${worker.city || job.city || 'Rajpura'} within preferred travel radius`);
  }

  const passport = worker.workPassport || {};
  if (reliabilityScore >= 8.5) {
    reasons.push(`High reliability rating (${passport.onTimeRate || 96}% on-time delivery)`);
  }

  if (accessResult.isInclusivePreference) {
    reasons.push(`Workplace supports ${worker.disabilityType || 'PwD'} accessibility accommodations`);
  }

  if (reasons.length === 0) {
    reasons.push('Verified local WorkConnect artisan');
  }

  return {
    totalScore,
    breakdown: {
      skillFitScore,
      availabilityScore,
      capacityScore,
      locationScore,
      experienceScore,
      reliabilityScore,
      budgetFitScore,
      accessibilityScore
    },
    reasons,
    accessibilityCompatible: accessResult.compatible,
    isInclusivePreference: accessResult.isInclusivePreference
  };
};

// Rank Workers for a given Business Job Requirement
export const rankWorkersForJob = (workers = [], job = {}) => {
  return workers
    .map((worker) => {
      const match = calculateWorkerJobMatch(worker, job);
      return {
        ...worker,
        match
      };
    })
    .sort((a, b) => b.match.totalScore - a.match.totalScore);
};

// Rank Jobs for a given Worker Profile
export const rankJobsForWorker = (worker = {}, jobs = []) => {
  return jobs
    .map((job) => {
      const match = calculateWorkerJobMatch(worker, job);
      return {
        ...job,
        match
      };
    })
    .sort((a, b) => b.match.totalScore - a.match.totalScore);
};
