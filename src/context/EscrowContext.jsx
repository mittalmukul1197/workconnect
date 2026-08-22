import React, { createContext, useContext, useState, useEffect } from 'react';

const EscrowContext = createContext(null);

const ESCROW_STORAGE_KEY = 'workconnect_escrow_deals';

// Initial default deals state
const DEFAULT_DEALS = {
  'proj-501': {
    id: 'proj-501',
    title: '100 Ethnic Kurtis Stitching Order',
    businessName: 'Crafted Threads Boutique',
    workerName: 'Sunita Sharma (Master Tailor)',
    amount: '₹3,000',
    unitDetails: '100 pieces @ ₹30 / piece',
    businessAgreed: false,
    workerAgreed: false,
    escrowStatus: 'pending_agreements', // 'pending_agreements' | 'ready_to_pay' | 'paid_in_escrow' | 'work_submitted' | 'released_to_worker'
    paidAmount: '₹3,000',
    updatedAt: new Date().toISOString()
  },
  'off-101': {
    id: 'off-101',
    title: 'Emergency Main DB & Switchboard Rewiring',
    businessName: 'Sharma Electronics',
    workerName: 'Gurpreet Singh (Electrician)',
    amount: '₹850',
    unitDetails: 'Immediate Switchboard Rewiring',
    businessAgreed: true,
    workerAgreed: false,
    escrowStatus: 'pending_agreements',
    paidAmount: '₹850',
    updatedAt: new Date().toISOString()
  },
  'off-102': {
    id: 'off-102',
    title: '100 Cotton Kurtis Batch Stitching',
    businessName: 'Ananya Verma Boutique',
    workerName: 'Priya Kaur (Garment Worker)',
    amount: '₹3,000',
    unitDetails: '100 pieces batch',
    businessAgreed: false,
    workerAgreed: true,
    escrowStatus: 'pending_agreements',
    paidAmount: '₹3,000',
    updatedAt: new Date().toISOString()
  }
};

export const EscrowProvider = ({ children }) => {
  const [deals, setDeals] = useState(() => {
    try {
      const saved = localStorage.getItem(ESCROW_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_DEALS;
    } catch {
      return DEFAULT_DEALS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ESCROW_STORAGE_KEY, JSON.stringify(deals));
    } catch (e) {
      console.warn('Failed to save escrow deals to storage:', e);
    }
  }, [deals]);

  // Worker clicks Agree
  const agreeAsWorker = (dealId) => {
    setDeals((prev) => {
      const existing = prev[dealId] || DEFAULT_DEALS['proj-501'];
      const updatedWorkerAgreed = true;
      const isBoth = updatedWorkerAgreed && existing.businessAgreed;
      return {
        ...prev,
        [dealId]: {
          ...existing,
          workerAgreed: true,
          escrowStatus: isBoth ? 'ready_to_pay' : 'pending_agreements',
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  // Business clicks Agree
  const agreeAsBusiness = (dealId) => {
    setDeals((prev) => {
      const existing = prev[dealId] || DEFAULT_DEALS['proj-501'];
      const updatedBusinessAgreed = true;
      const isBoth = existing.workerAgreed && updatedBusinessAgreed;
      return {
        ...prev,
        [dealId]: {
          ...existing,
          businessAgreed: true,
          escrowStatus: isBoth ? 'ready_to_pay' : 'pending_agreements',
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  // Business pays into WorkConnect Vault
  const payToEscrow = (dealId) => {
    setDeals((prev) => {
      const existing = prev[dealId] || DEFAULT_DEALS['proj-501'];
      return {
        ...prev,
        [dealId]: {
          ...existing,
          escrowStatus: 'paid_in_escrow',
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  // Worker submits completed work
  const submitWork = (dealId) => {
    setDeals((prev) => {
      const existing = prev[dealId] || DEFAULT_DEALS['proj-501'];
      return {
        ...prev,
        [dealId]: {
          ...existing,
          escrowStatus: 'work_submitted',
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  // WorkConnect releases payout to Worker
  const releasePayout = (dealId) => {
    setDeals((prev) => {
      const existing = prev[dealId] || DEFAULT_DEALS['proj-501'];
      return {
        ...prev,
        [dealId]: {
          ...existing,
          escrowStatus: 'released_to_worker',
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  const getDeal = (dealId) => {
    return deals[dealId] || {
      id: dealId,
      title: '100 Ethnic Kurtis Stitching Order',
      businessName: 'Crafted Threads Boutique',
      workerName: 'Sunita Sharma (Master Tailor)',
      amount: '₹3,000',
      unitDetails: '100 pieces @ ₹30 / piece',
      businessAgreed: false,
      workerAgreed: false,
      escrowStatus: 'pending_agreements'
    };
  };

  return (
    <EscrowContext.Provider
      value={{
        deals,
        getDeal,
        agreeAsWorker,
        agreeAsBusiness,
        payToEscrow,
        submitWork,
        releasePayout
      }}
    >
      {children}
    </EscrowContext.Provider>
  );
};

export const useEscrow = () => {
  const context = useContext(EscrowContext);
  if (!context) throw new Error('useEscrow must be used within EscrowProvider');
  return context;
};
