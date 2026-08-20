import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEFAULT_DEMO_BUSINESS = {
  id: 'usr-bus-1',
  email: 'business@demo.com',
  name: 'Crafted Threads Boutique',
  role: 'business',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98765 43210',
  city: 'Rajpura',
  state: 'Punjab',
  industry: 'Tailoring & Apparel',
  verified: true,
  rating: 4.8
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
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_BUSINESS;
  });
  const [token, setToken] = useState(() => localStorage.getItem('workconnect_token') || 'demo-jwt-token');

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
  };

  const loginAsDemoWorker = () => {
    setUser(DEFAULT_DEMO_WORKER);
    setToken('demo-wrk-token');
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
        loginAsDemoWorker,
        switchRole,
        logout,
        isAuthenticated: !!user,
        isBusiness: user?.role === 'business',
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
