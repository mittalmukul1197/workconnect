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
