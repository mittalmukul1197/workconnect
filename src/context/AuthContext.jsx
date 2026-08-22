/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_DEMO_BUSINESS = {
  id: 'usr-bus-1',
  email: 'business@demo.com',
  name: 'Crafted Threads Boutique',
  role: 'business',
  clientType: 'business',
  phone: '+91 98765 43210',
  city: 'Rajpura',
  state: 'Punjab',
  industry: 'Tailoring & Apparel',
  verified: true,
  rating: 4.8
};

const DEFAULT_DEMO_HOUSEHOLD = {
  id: 'usr-hh-1',
  email: 'household@demo.com',
  name: 'Rahul Sharma',
  role: 'household',
  clientType: 'household',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98765 22222',
  city: 'Rajpura',
  state: 'Punjab',
  industry: 'Household Client',
  verified: true,
  rating: 4.9
};

const DEFAULT_DEMO_WORKER = {
  id: 'usr-wrk-1',
  email: 'worker@demo.com',
  name: 'Sunita Sharma',
  role: 'worker',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98765 11111',
  city: 'Rajpura',
  state: 'Punjab',
  profession: 'Master Tailor & Designer',
  hasDisability: true,
  disabilityTypes: ['Locomotor / Physical Disability'],
  disabilityType: 'Locomotor / Physical Disability',
  disabilityOther: '',
  accessibilityNeeds: ['Wheelchair accessible workplace', 'Flexible working hours'],
  accessibilityOther: '',
  additionalAccessibilityNotes: 'Requires step-free ramp access at ground level or elevator.',
  disabilityAccommodations: ['Wheelchair accessible workplace', 'Flexible working hours'],
  verified: true,
  rating: 4.9,
  workPassport: {
    totalCompletedJobs: 147,
    onTimeRate: 96,
    qualityScore: 94,
    overallRating: 4.9,
    verifiedBadges: [
      'KYC Verified',
      'Top Rated Artisan',
      'High Reliability',
      '♿ PwD Inclusive Worker'
    ]
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('workconnect_user');
      if (!saved || saved === 'undefined') return null;
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('workconnect_token') || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('workconnect_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('workconnect_user');
      }
    } catch (e) {
      console.error('Error persisting user to localStorage:', e);
    }
  }, [user]);

  const loginAsDemoBusiness = () => {
    setUser(DEFAULT_DEMO_BUSINESS);
    setToken('demo-bus-token');
    return DEFAULT_DEMO_BUSINESS;
  };

  const loginAsDemoHousehold = () => {
    setUser(DEFAULT_DEMO_HOUSEHOLD);
    setToken('demo-hh-token');
    return DEFAULT_DEMO_HOUSEHOLD;
  };

  const loginAsDemoWorker = () => {
    setUser(DEFAULT_DEMO_WORKER);
    setToken('demo-wrk-token');
    return DEFAULT_DEMO_WORKER;
  };

  const registerCustomUser = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      verified: true,
      rating: 5.0,
      avatar: userData.role === 'worker'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      ...userData
    };
    setUser(newUser);
    setToken(`custom-token-${Date.now()}`);
    return newUser;
  };

  const loginWithCredentials = (email, password) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    const cleanPassword = (password || '').trim();

    // Check predefined demo accounts with strict password validation
    if (cleanEmail === 'business@demo.com') {
      if (cleanPassword !== 'demo123') {
        return { error: 'Invalid password. Business demo password is demo123' };
      }
      return { user: loginAsDemoBusiness() };
    }
    if (cleanEmail === 'household@demo.com') {
      if (cleanPassword !== 'demo123') {
        return { error: 'Invalid password. Household demo password is demo123' };
      }
      return { user: loginAsDemoHousehold() };
    }
    if (cleanEmail === 'worker@demo.com') {
      if (cleanPassword !== 'demo123') {
        return { error: 'Invalid password. Worker demo password is demo123' };
      }
      return { user: loginAsDemoWorker() };
    }

    if (cleanEmail.includes('business')) {
      if (cleanPassword !== 'demo123') {
        return { error: 'Invalid password. Demo password is demo123' };
      }
      return { user: loginAsDemoBusiness() };
    } else if (cleanEmail.includes('household')) {
      if (cleanPassword !== 'demo123') {
        return { error: 'Invalid password. Demo password is demo123' };
      }
      return { user: loginAsDemoHousehold() };
    } else if (cleanEmail.includes('worker')) {
      if (cleanPassword !== 'demo123') {
        return { error: 'Invalid password. Demo password is demo123' };
      }
      return { user: loginAsDemoWorker() };
    } else {
      if (!cleanPassword) {
        return { error: 'Password is required' };
      }
      // Auto-register new user
      const newUser = registerCustomUser({
        name: cleanEmail.split('@')[0] || 'User',
        email: cleanEmail,
        role: 'household',
        clientType: 'household',
        phone: '+91 98765 99999',
        city: 'Rajpura'
      });
      return { user: newUser };
    }
  };

  const switchRole = (targetRole) => {
    if (targetRole === 'business') {
      loginAsDemoBusiness();
    } else if (targetRole === 'household') {
      loginAsDemoHousehold();
    } else {
      loginAsDemoWorker();
    }
  };

  const updateUserProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      try {
        localStorage.setItem('workconnect_user', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving updated user profile:', e);
      }
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('workconnect_user');
      localStorage.removeItem('workconnect_token');
    } catch (e) {
      console.error('Error clearing localStorage on logout:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginAsDemoBusiness,
        loginAsDemoHousehold,
        loginAsDemoWorker,
        loginWithCredentials,
        registerCustomUser,
        updateUserProfile,
        switchRole,
        logout,
        isAuthenticated: !!user,
        isHousehold: user?.role === 'household' || user?.clientType === 'household',
        isBusiness: user?.role === 'business' && user?.clientType !== 'household',
        isWorker: user?.role === 'worker'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
