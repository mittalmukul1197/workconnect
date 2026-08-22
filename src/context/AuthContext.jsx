import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEFAULT_DEMO_BUSINESS = {
  id: 'usr-bus-1',
  email: 'business@demo.com',
  name: 'Crafted Threads Boutique',
  role: 'business',
  clientType: 'business',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98765 43210',
  city: 'Rajpura',
  state: 'Punjab',
  industry: 'Tailoring & Apparel',
  verified: true,
  rating: 4.8
};

export const DEFAULT_DEMO_HOUSEHOLD = {
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

export const DEFAULT_DEMO_WORKER = {
  id: 'usr-wrk-1',
  email: 'worker@demo.com',
  name: 'Sunita Sharma',
  role: 'worker',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98765 11111',
  city: 'Rajpura',
  state: 'Punjab',
  profession: 'Master Tailor & Designer',
  verified: true,
  rating: 4.9
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('workconnect_user');
    return saved ? JSON.parse(saved) : null; // Default to null so user must log in or select demo
  });
  const [token, setToken] = useState(() => localStorage.getItem('workconnect_token') || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('workconnect_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('workconnect_user');
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

  const loginWithCredentials = (email, password) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    let loggedUser = null;

    if (cleanEmail === 'business@demo.com' || cleanEmail.includes('business')) {
      loggedUser = loginAsDemoBusiness();
    } else if (cleanEmail === 'household@demo.com' || cleanEmail.includes('household')) {
      loggedUser = loginAsDemoHousehold();
    } else if (cleanEmail === 'worker@demo.com' || cleanEmail.includes('worker')) {
      loggedUser = loginAsDemoWorker();
    } else {
      // Auto-register new user
      loggedUser = registerCustomUser({
        name: cleanEmail.split('@')[0] || 'User',
        email: cleanEmail,
        role: 'business',
        clientType: 'household',
        phone: '+91 98765 99999',
        city: 'Rajpura'
      });
    }
    return loggedUser;
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

  const switchRole = (targetRole) => {
    if (targetRole === 'business') {
      loginAsDemoBusiness();
    } else {
      loginAsDemoWorker();
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('workconnect_user');
    localStorage.removeItem('workconnect_token');
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
