// Centralized Mock Data for WorkConnect Phase 1

export const CATEGORIES = [
  { id: 'cat-1', name: 'Apparel & Tailoring', icon: 'scissors', count: '142 Workers', color: 'from-purple-500 to-indigo-500' },
  { id: 'cat-2', name: 'Retail & Stores', icon: 'shopping-bag', count: '98 Workers', color: 'from-indigo-500 to-blue-500' },
  { id: 'cat-3', name: 'Food & Hospitality', icon: 'utensils', count: '115 Workers', color: 'from-amber-500 to-orange-500' },
  { id: 'cat-4', name: 'Salons & Personal Care', icon: 'sparkles', count: '84 Workers', color: 'from-pink-500 to-rose-500' },
  { id: 'cat-5', name: 'Skilled Trades (Wiring & Solar)', icon: 'zap', count: '160 Workers', color: 'from-emerald-500 to-teal-500' },
  { id: 'cat-6', name: 'Home Packaging & Crafts', icon: 'box', count: '92 Workers', color: 'from-cyan-500 to-sky-500' },
  { id: 'cat-7', name: 'Digital & Creative Work', icon: 'palette', count: '76 Workers', color: 'from-violet-500 to-purple-500' },
  { id: 'cat-8', name: 'Appliance & Tech Repair', icon: 'wrench', count: '108 Workers', color: 'from-blue-500 to-indigo-500' }
];

export const MOCK_STATS = {
  activeWork: 12,
  connectedWorkers: 28,
  completedProjects: 147,
  matchAccuracy: '94.8%',
  avgOnTimeRate: '96.2%',
  avgSatisfaction: '4.9 / 5'
};

export const MOCK_WORKERS = [
  {
    id: 'wrk-1',
    name: 'Sunita Sharma',
    profession: 'Master Tailor & Garment Designer',
    city: 'Rajpura',
    state: 'Punjab',
    rating: 4.9,
    reviewsCount: 88,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    skills: ['Stitching', 'Alterations', 'Embroidery'],
    dailyCapacity: '30 pieces/day',
    remainingCapacity: '25 pieces/day',
    rate: '₹25 / piece',
    availableToday: true,
    workPassport: {
      completedJobs: 147,
      onTimeRate: 96,
      qualityScore: 93,
      verifiedBadges: ['Top Rated Artisan', 'High Punctuality', 'Verified Identity']
    }
  },
  {
    id: 'wrk-2',
    name: 'Gurpreet Singh',
    profession: 'Senior Electrician & Solar Installer',
    city: 'Patiala',
    state: 'Punjab',
    rating: 4.95,
    reviewsCount: 142,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    skills: ['Electrical Wiring', 'Solar Installation', 'Appliance Repair'],
    dailyCapacity: '2 installations/day',
    remainingCapacity: '2 installations/day',
    rate: '₹850 / day',
    availableToday: true,
    workPassport: {
      completedJobs: 210,
      onTimeRate: 98,
      qualityScore: 97,
      verifiedBadges: ['Master Technician', 'Licensed Engineer', 'Zero Incidents']
    }
  },
  {
    id: 'wrk-3',
    name: 'Priya Kaur',
    profession: 'Garment Worker & Suit Specialist',
    city: 'Rajpura',
    state: 'Punjab',
    rating: 4.8,
    reviewsCount: 64,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    skills: ['Stitching', 'Alterations'],
    dailyCapacity: '25 pieces/day',
    remainingCapacity: '25 pieces/day',
    rate: '₹22 / piece',
    availableToday: true,
    workPassport: {
      completedJobs: 94,
      onTimeRate: 94,
      qualityScore: 91,
      verifiedBadges: ['Consistent Delivery', 'Verified Identity']
    }
  }
];

export const MOCK_BUSINESSES = [
  {
    id: 'bus-1',
    name: 'Crafted Threads Boutique',
    industry: 'Tailoring & Apparel',
    city: 'Rajpura',
    state: 'Punjab',
    owner: 'Ananya Verma',
    rating: 4.8,
    activeWorkCount: 3,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'bus-2',
    name: 'Luminary Energy & Solar',
    industry: 'Renewable Contracting',
    city: 'Patiala',
    state: 'Punjab',
    owner: 'Harpreet Singh',
    rating: 4.9,
    activeWorkCount: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

export const MOCK_OPPORTUNITIES = [
  {
    id: 'opp-1',
    title: '100 Ethnic Kurtis Stitching Order',
    businessName: 'Crafted Threads Boutique',
    industry: 'Apparel',
    city: 'Rajpura',
    distanceKm: 3.2,
    skillRequired: 'Stitching',
    quota: '100 pieces',
    deadlineDays: 5,
    budgetPerUnit: '₹30 / piece',
    matchScore: 95,
    status: 'Open'
  },
  {
    id: 'opp-2',
    title: 'Rooftop Solar Wiring & Commissioning',
    businessName: 'Luminary Energy & Solar',
    industry: 'Electrical',
    city: 'Patiala',
    distanceKm: 12.5,
    skillRequired: 'Electrical Wiring',
    quota: '10 setups',
    deadlineDays: 3,
    budgetPerUnit: '₹1,200 / setup',
    matchScore: 92,
    status: 'Open'
  },
  {
    id: 'opp-3',
    title: 'Handicraft Gift Box Packaging',
    businessName: 'Virasat Artisan Crafts',
    industry: 'Packaging',
    city: 'Ambala',
    distanceKm: 15.0,
    skillRequired: 'Packaging',
    quota: '200 boxes',
    deadlineDays: 4,
    budgetPerUnit: '₹15 / box',
    matchScore: 88,
    status: 'Open'
  }
];

export const MOCK_PROJECTS = [
  {
    id: 'proj-501',
    title: '100 Ethnic Kurtis Stitching Order',
    businessName: 'Crafted Threads Boutique',
    skillName: 'Stitching',
    totalQuantity: 100,
    completedQuantity: 35,
    unitLabel: 'pieces',
    deadlineDate: '2026-08-25',
    status: 'In Production',
    atRisk: false,
    assignedWorkers: [
      { workerName: 'Sunita Sharma', allocatedQuantity: 35, completedQuantity: 20, status: 'Active' },
      { workerName: 'Priya Kaur', allocatedQuantity: 35, completedQuantity: 15, status: 'Active' },
      { workerName: 'Meenakshi Devi', allocatedQuantity: 30, completedQuantity: 0, status: 'Active' }
    ]
  }
];

export const ON_DEMAND_SERVICES = [
  {
    id: 'ods-electrician',
    categoryKey: 'electrician',
    name: 'Electrician & Electrical Wiring',
    icon: 'zap',
    tagline: 'House wiring, switchboard fix, short circuit repair & inverter setup',
    startingPrice: '₹399',
    unit: 'visit',
    availableCount: 42,
    avgResponseTime: '< 15 mins',
    rating: 4.9,
    reviewCount: 310,
    badgeColor: 'indigo',
    popularTasks: ['Complete Home Wiring', 'MCB & Fuse Repair', 'Fan & Light Fixtures', 'Inverter Connection', 'Solar Panel Cabling'],
    topWorker: {
      name: 'Gurpreet Singh',
      experience: '8 yrs exp',
      rating: 4.95,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      status: 'Ready in 10 mins'
    }
  },
  {
    id: 'ods-carpenter',
    categoryKey: 'carpenter',
    name: 'Carpenter & Custom Woodwork',
    icon: 'hammer',
    tagline: 'Furniture repair, door fitting, modular kitchen assembly & locks',
    startingPrice: '₹499',
    unit: 'visit',
    availableCount: 35,
    avgResponseTime: '< 20 mins',
    rating: 4.8,
    reviewCount: 245,
    badgeColor: 'amber',
    popularTasks: ['Door Lock Fitting', 'Modular Kitchen Repair', 'Bed & Table Assembly', 'Cabinet Customization', 'Wooden Polishing'],
    topWorker: {
      name: 'Ramesh Kumar',
      experience: '12 yrs exp',
      rating: 4.88,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'Ready in 15 mins'
    }
  },
  {
    id: 'ods-plumber',
    categoryKey: 'plumber',
    name: 'Plumber & Pipe Fittings',
    icon: 'droplet',
    tagline: 'Leak repair, tap installation, water tank cleaning & bath fittings',
    startingPrice: '₹349',
    unit: 'visit',
    availableCount: 38,
    avgResponseTime: '< 15 mins',
    rating: 4.9,
    reviewCount: 280,
    badgeColor: 'sky',
    popularTasks: ['Pipe Leakage Fix', 'Bathroom Fixture Install', 'Water Tank Flushing', 'Drainage Unclogging', 'Motor Pump Fitting'],
    topWorker: {
      name: 'Vikram Sharma',
      experience: '6 yrs exp',
      rating: 4.92,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      status: 'Ready in 12 mins'
    }
  },
  {
    id: 'ods-labour',
    categoryKey: 'labour',
    name: 'Daily Labour & Site Helpers',
    icon: 'hard-hat',
    tagline: 'Manual site helpers, loading/unloading, site clearance & shifting',
    startingPrice: '₹600',
    unit: 'day',
    availableCount: 85,
    avgResponseTime: 'Instant',
    rating: 4.95,
    reviewCount: 520,
    badgeColor: 'emerald',
    popularTasks: ['Heavy Loading / Unloading', 'Construction Material Shift', 'Demolition Cleanup', 'Godown Helper', 'Garden Clearance'],
    topWorker: {
      name: 'Sukhwinder & Crew',
      experience: 'Team of 5',
      rating: 4.96,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      status: 'Ready Now'
    }
  },
  {
    id: 'ods-painter',
    categoryKey: 'painter',
    name: 'Painter & Waterproofing',
    icon: 'brush',
    tagline: 'Wall touch-ups, interior/exterior paint, putty work & damp protection',
    startingPrice: '₹450',
    unit: 'day',
    availableCount: 29,
    avgResponseTime: '< 30 mins',
    rating: 4.85,
    reviewCount: 190,
    badgeColor: 'rose',
    popularTasks: ['Single Room Wall Paint', 'Damp Waterproofing', 'Wall Putty & Primer', 'Door & Grill Enamel', 'Texture Feature Wall'],
    topWorker: {
      name: 'Amit Varma',
      experience: '9 yrs exp',
      rating: 4.87,
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      status: 'Ready in 25 mins'
    }
  },
  {
    id: 'ods-mason',
    categoryKey: 'mason',
    name: 'Mason & Civil Craftsmen',
    icon: 'building',
    tagline: 'Brickwork, tile laying, floor repair, wall plastering & boundary walls',
    startingPrice: '₹750',
    unit: 'day',
    availableCount: 24,
    avgResponseTime: '< 25 mins',
    rating: 4.9,
    reviewCount: 165,
    badgeColor: 'purple',
    popularTasks: ['Tile & Marble Laying', 'Brick Wall Construction', 'Plastering & Cementing', 'Kitchen Platform Work', 'Floor Leveling'],
    topWorker: {
      name: 'Manjit Singh',
      experience: '14 yrs exp',
      rating: 4.91,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      status: 'Ready in 20 mins'
    }
  },
  {
    id: 'ods-welder',
    categoryKey: 'welder',
    name: 'Welder & Metal Fabricator',
    icon: 'flame',
    tagline: 'Main gate welding, window grill repair, iron shed & structural fix',
    startingPrice: '₹550',
    unit: 'visit',
    availableCount: 18,
    avgResponseTime: '< 30 mins',
    rating: 4.8,
    reviewCount: 130,
    badgeColor: 'amber',
    popularTasks: ['Gate & Hinge Repair', 'Railing Fabrication', 'Shed Framework Welding', 'Shutter Lock Fix', 'Custom Steel Work'],
    topWorker: {
      name: 'Jaspreet Metal Works',
      experience: '10 yrs exp',
      rating: 4.84,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      status: 'Ready in 30 mins'
    }
  },
  {
    id: 'ods-appliance',
    categoryKey: 'appliance',
    name: 'AC & Appliance Repair',
    icon: 'snowflake',
    tagline: 'AC servicing, gas charging, refrigerator, washing machine repair',
    startingPrice: '₹499',
    unit: 'visit',
    availableCount: 31,
    avgResponseTime: '< 15 mins',
    rating: 4.92,
    reviewCount: 410,
    badgeColor: 'cyan',
    popularTasks: ['Split/Window AC Service', 'Refrigerant Gas Filling', 'Washing Machine Drum Fix', 'RO Purifier Service', 'Microwave Repair'],
    topWorker: {
      name: 'Deepak Cool Tech',
      experience: '7 yrs exp',
      rating: 4.93,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'Ready in 10 mins'
    }
  }
];

export const OPEN_WORK_OFFERS = [
  {
    id: 'off-101',
    title: 'Emergency Main DB & Switchboard Rewiring',
    requesterName: 'Sharma Electronics & Goods',
    requesterRole: 'Shop Owner',
    skillRequired: 'Electrician',
    offeredBudget: '₹850',
    unit: 'total budget',
    city: 'Rajpura',
    area: 'Main Market, Sector 2',
    urgency: 'Immediate (< 1 hr)',
    postedTime: '10 mins ago',
    status: 'pending', // 'pending' | 'accepted' | 'declined'
    notes: 'Short circuit causing power trip in main shop counter. Bring 32A MCB.',
    acceptedBy: null
  },
  {
    id: 'off-102',
    title: '100 Cotton Kurtis Batch Stitching',
    requesterName: 'Ananya Verma',
    requesterRole: 'Boutique Owner',
    skillRequired: 'Tailor',
    offeredBudget: '₹30 / piece',
    unit: '100 pieces (₹3,000 total)',
    city: 'Rajpura',
    area: 'Model Town',
    urgency: 'Within 4 Days',
    postedTime: '25 mins ago',
    status: 'pending',
    notes: 'Cut cloth fabric will be delivered to home. Overlock finish needed.',
    acceptedBy: null
  },
  {
    id: 'off-103',
    title: 'Store Room Loading & Material Shift',
    requesterName: 'Prakash Hardware Store',
    requesterRole: 'Wholesaler',
    skillRequired: 'Daily Labour',
    offeredBudget: '₹700 / day',
    unit: '2 Helpers Needed',
    city: 'Patiala',
    area: 'Focal Point',
    urgency: 'Today 2:00 PM',
    postedTime: '1 hr ago',
    status: 'accepted',
    notes: 'Unloading 50 boxes of tile adhesive from mini truck.',
    acceptedBy: {
      workerName: 'Sukhwinder Singh & Team',
      rating: 4.96,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      acceptedTime: '15 mins ago'
    }
  },
  {
    id: 'off-104',
    title: 'Wooden Counter Lock & Shelf Repair',
    requesterName: 'Gurdeep Sweets',
    requesterRole: 'Business',
    skillRequired: 'Carpenter',
    offeredBudget: '₹500',
    unit: 'total job budget',
    city: 'Rajpura',
    area: 'GT Road',
    urgency: 'Tomorrow Morning',
    postedTime: '2 hrs ago',
    status: 'pending',
    notes: 'Fixing 2 sliding drawers and glass counter lock fittings.',
    acceptedBy: null
  }
];


