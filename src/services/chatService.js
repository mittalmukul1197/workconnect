// WorkConnect Real-Time Messaging & Chat Service
// Supports local storage persistence, cross-tab real-time BroadcastChannel sync, and initial demo seed conversations.

const CONVERSATIONS_KEY = 'workconnect_conversations';
const MESSAGES_KEY = 'workconnect_messages';
const CHANNEL_NAME = 'workconnect_chat_channel';

// BroadcastChannel for cross-tab instant synchronization
let broadcastChannel = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
  } catch (e) {
    console.warn('BroadcastChannel not supported or failed to initialize:', e);
  }
}

// Initial Seed Users dictionary for rich default profiles
const SEED_USERS = {
  'usr-bus-1': {
    id: 'usr-bus-1',
    name: 'Crafted Threads Boutique',
    role: 'business',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    profession: 'Tailoring & Apparel',
    online: true
  },
  'usr-hh-1': {
    id: 'usr-hh-1',
    name: 'Rahul Sharma',
    role: 'household',
    clientType: 'household',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    profession: 'Household Client',
    online: true
  },
  'usr-wrk-1': {
    id: 'usr-wrk-1',
    name: 'Sunita Sharma',
    role: 'worker',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    profession: 'Master Tailor & Garment Designer',
    online: true
  },
  'usr-wrk-2': {
    id: 'wrk-2',
    name: 'Gurpreet Singh',
    role: 'worker',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    profession: 'Senior Electrician & Solar Installer',
    online: false
  },
  'usr-wrk-3': {
    id: 'wrk-3',
    name: 'Priya Kaur',
    role: 'worker',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    profession: 'Garment Worker & Suit Specialist',
    online: true
  }
};

// Initial Seed Conversations & Messages
const DEFAULT_CONVERSATIONS = [
  {
    id: 'conv-bus1-wrk1',
    participant1Id: 'usr-bus-1',
    participant2Id: 'usr-wrk-1',
    participantsInfo: {
      'usr-bus-1': SEED_USERS['usr-bus-1'],
      'usr-wrk-1': SEED_USERS['usr-wrk-1']
    },
    lastMessage: 'I can start at 9 AM tomorrow.',
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    unreadCounts: {
      'usr-bus-1': 0,
      'usr-wrk-1': 0
    },
    updatedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString()
  },
  {
    id: 'conv-hh1-wrk2',
    participant1Id: 'usr-hh-1',
    participant2Id: 'usr-wrk-2',
    participantsInfo: {
      'usr-hh-1': SEED_USERS['usr-hh-1'],
      'usr-wrk-2': SEED_USERS['usr-wrk-2']
    },
    lastMessage: 'Hi Gurpreet, are you available for solar panel wiring setup this weekend?',
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    unreadCounts: {
      'usr-hh-1': 0,
      'usr-wrk-2': 1
    },
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  }
];

const DEFAULT_MESSAGES = {
  'conv-bus1-wrk1': [
    {
      id: 'msg-1',
      conversationId: 'conv-bus1-wrk1',
      senderId: 'usr-bus-1',
      receiverId: 'usr-wrk-1',
      text: 'Hello Sunita! We have a bulk order of 50 custom suits at Crafted Threads Boutique.',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      readAt: new Date(Date.now() - 1000 * 60 * 40).toISOString()
    },
    {
      id: 'msg-2',
      conversationId: 'conv-bus1-wrk1',
      senderId: 'usr-bus-1',
      receiverId: 'usr-wrk-1',
      text: 'Are you available tomorrow to start stitching?',
      timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      readAt: new Date(Date.now() - 1000 * 60 * 35).toISOString()
    },
    {
      id: 'msg-3',
      conversationId: 'conv-bus1-wrk1',
      senderId: 'usr-wrk-1',
      receiverId: 'usr-bus-1',
      text: 'Yes, I am available! My current daily capacity has 25 slots open for tomorrow.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      readAt: new Date(Date.now() - 1000 * 60 * 28).toISOString()
    },
    {
      id: 'msg-4',
      conversationId: 'conv-bus1-wrk1',
      senderId: 'usr-bus-1',
      receiverId: 'usr-wrk-1',
      text: 'Great! What time can you start?',
      timestamp: new Date(Date.now() - 1000 * 60 * 27).toISOString(),
      readAt: new Date(Date.now() - 1000 * 60 * 26).toISOString()
    },
    {
      id: 'msg-5',
      conversationId: 'conv-bus1-wrk1',
      senderId: 'usr-wrk-1',
      receiverId: 'usr-bus-1',
      text: 'I can start at 9 AM tomorrow.',
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      readAt: new Date(Date.now() - 1000 * 60 * 25).toISOString()
    }
  ],
  'conv-hh1-wrk2': [
    {
      id: 'msg-101',
      conversationId: 'conv-hh1-wrk2',
      senderId: 'usr-hh-1',
      receiverId: 'usr-wrk-2',
      text: 'Hi Gurpreet, are you available for solar panel wiring setup this weekend?',
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      readAt: null
    }
  ]
};

// Initialize Storage
export const initChatStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(CONVERSATIONS_KEY)) {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(DEFAULT_CONVERSATIONS));
  }
  if (!localStorage.getItem(MESSAGES_KEY)) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(DEFAULT_MESSAGES));
  }
};

// Get All Conversations for a given user
export const getConversations = (userId) => {
  initChatStorage();
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    const convs = raw ? JSON.parse(raw) : [];
    if (!userId) return convs;

    return convs.filter(
      (c) => c.participant1Id === userId || c.participant2Id === userId
    ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch (e) {
    console.error('Error fetching conversations:', e);
    return [];
  }
};

// Get Messages for a specific conversation ID
export const getMessages = (conversationId) => {
  initChatStorage();
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    const allMessagesMap = raw ? JSON.parse(raw) : {};
    return allMessagesMap[conversationId] || [];
  } catch (e) {
    console.error('Error fetching messages:', e);
    return [];
  }
};

// Get or Create Conversation between two users
export const getOrCreateConversation = (currentUser, otherUser) => {
  initChatStorage();
  if (!currentUser?.id || !otherUser?.id) return null;

  const raw = localStorage.getItem(CONVERSATIONS_KEY);
  let convs = raw ? JSON.parse(raw) : [];

  // Look for existing conversation between these two IDs
  let existing = convs.find(
    (c) =>
      (c.participant1Id === currentUser.id && c.participant2Id === otherUser.id) ||
      (c.participant1Id === otherUser.id && c.participant2Id === currentUser.id)
  );

  if (existing) {
    // Update participant info if missing or updated
    existing.participantsInfo = {
      ...existing.participantsInfo,
      [currentUser.id]: {
        id: currentUser.id,
        name: currentUser.name || 'User',
        role: currentUser.role || 'user',
        avatar: currentUser.avatar,
        profession: currentUser.profession || currentUser.industry || 'WorkConnect Member',
        online: true
      },
      [otherUser.id]: {
        id: otherUser.id,
        name: otherUser.name || 'User',
        role: otherUser.role || 'user',
        avatar: otherUser.avatar,
        profession: otherUser.profession || otherUser.industry || 'WorkConnect Member',
        online: true
      }
    };
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convs));
    return existing;
  }

  // Create new conversation
  const newConvId = `conv-${Date.now()}`;
  const newConv = {
    id: newConvId,
    participant1Id: currentUser.id,
    participant2Id: otherUser.id,
    participantsInfo: {
      [currentUser.id]: {
        id: currentUser.id,
        name: currentUser.name || 'User',
        role: currentUser.role || 'user',
        avatar: currentUser.avatar,
        profession: currentUser.profession || currentUser.industry || 'WorkConnect Member',
        online: true
      },
      [otherUser.id]: {
        id: otherUser.id,
        name: otherUser.name || 'User',
        role: otherUser.role || 'user',
        avatar: otherUser.avatar,
        profession: otherUser.profession || otherUser.industry || 'WorkConnect Member',
        online: true
      }
    },
    lastMessage: 'Conversation started',
    lastMessageTimestamp: new Date().toISOString(),
    unreadCounts: {
      [currentUser.id]: 0,
      [otherUser.id]: 0
    },
    updatedAt: new Date().toISOString()
  };

  convs.unshift(newConv);
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convs));

  // Init empty messages array for this conversation
  const rawMsgs = localStorage.getItem(MESSAGES_KEY);
  const msgsMap = rawMsgs ? JSON.parse(rawMsgs) : {};
  msgsMap[newConvId] = [];
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgsMap));

  notifyBroadcast({ type: 'CONVERSATION_CREATED', conversation: newConv });
  return newConv;
};

// Send Message
export const sendMessage = ({ conversationId, senderId, receiverId, text }) => {
  initChatStorage();
  const trimmed = (text || '').trim();
  if (!trimmed || !conversationId || !senderId || !receiverId) return null;

  const now = new Date().toISOString();
  const newMsg = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    conversationId,
    senderId,
    receiverId,
    text: trimmed,
    timestamp: now,
    readAt: null
  };

  // Add message to MESSAGES_KEY map
  const rawMsgs = localStorage.getItem(MESSAGES_KEY);
  const msgsMap = rawMsgs ? JSON.parse(rawMsgs) : {};
  const currentList = msgsMap[conversationId] || [];
  msgsMap[conversationId] = [...currentList, newMsg];
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgsMap));

  // Update conversation record
  const rawConvs = localStorage.getItem(CONVERSATIONS_KEY);
  let convs = rawConvs ? JSON.parse(rawConvs) : [];
  convs = convs.map((c) => {
    if (c.id === conversationId) {
      const currentUnread = c.unreadCounts ? (c.unreadCounts[receiverId] || 0) : 0;
      return {
        ...c,
        lastMessage: trimmed,
        lastMessageTimestamp: now,
        updatedAt: now,
        unreadCounts: {
          ...c.unreadCounts,
          [receiverId]: currentUnread + 1
        }
      };
    }
    return c;
  });
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convs));

  notifyBroadcast({ type: 'NEW_MESSAGE', message: newMsg, conversationId });

  // Optional Demo Auto-Reply helper for single tab demo testing
  triggerDemoAutoReplyIfNeeded({ conversationId, senderId, receiverId, text: trimmed });

  return newMsg;
};

// Mark conversation messages as read for a given user
export const markAsRead = (conversationId, userId) => {
  initChatStorage();
  if (!conversationId || !userId) return;

  // Clear unread count on conversation
  const rawConvs = localStorage.getItem(CONVERSATIONS_KEY);
  let convs = rawConvs ? JSON.parse(rawConvs) : [];
  let updated = false;

  convs = convs.map((c) => {
    if (c.id === conversationId && c.unreadCounts && c.unreadCounts[userId] > 0) {
      updated = true;
      return {
        ...c,
        unreadCounts: {
          ...c.unreadCounts,
          [userId]: 0
        }
      };
    }
    return c;
  });

  if (updated) {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convs));

    // Mark messages sent to userId as read
    const rawMsgs = localStorage.getItem(MESSAGES_KEY);
    const msgsMap = rawMsgs ? JSON.parse(rawMsgs) : {};
    if (msgsMap[conversationId]) {
      const now = new Date().toISOString();
      msgsMap[conversationId] = msgsMap[conversationId].map((m) => {
        if (m.receiverId === userId && !m.readAt) {
          return { ...m, readAt: now };
        }
        return m;
      });
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgsMap));
    }

    notifyBroadcast({ type: 'MESSAGES_READ', conversationId, userId });
  }
};

// Broadcast notification helper
const notifyBroadcast = (eventData) => {
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage(eventData);
    } catch (e) {
      console.warn('BroadcastChannel error:', e);
    }
  }
};

// Helper for simulated responses when user sends message in single-tab demo mode
const triggerDemoAutoReplyIfNeeded = ({ conversationId, senderId, receiverId, text }) => {
  // If messaging one of the demo users and they are NOT currently active in another window, respond with a helpful demo reply after 1.5 seconds
  const demoAutoReplies = {
    'usr-wrk-1': [
      'Thanks for reaching out! I can definitely help with your garment work order.',
      'I have reviewed the details and my daily capacity is available.',
      'Shall we finalize the work agreement on WorkConnect?'
    ],
    'usr-wrk-2': [
      'Hello! I received your inquiry for technical trade service.',
      'I am available tomorrow for site inspection and wiring installation.'
    ],
    'usr-bus-1': [
      'Thank you for your update! We have logged your capacity commitment.',
      'Please let us know if you need any fabric or raw material delivered to your location.'
    ]
  };

  const replies = demoAutoReplies[receiverId];
  if (!replies) return;

  const randomReply = replies[Math.floor(Math.random() * replies.length)];

  setTimeout(() => {
    const rawMsgs = localStorage.getItem(MESSAGES_KEY);
    const msgsMap = rawMsgs ? JSON.parse(rawMsgs) : {};
    const now = new Date().toISOString();

    const replyMsg = {
      id: `msg-reply-${Date.now()}`,
      conversationId,
      senderId: receiverId,
      receiverId: senderId,
      text: randomReply,
      timestamp: now,
      readAt: null
    };

    msgsMap[conversationId] = [...(msgsMap[conversationId] || []), replyMsg];
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgsMap));

    // Update conversation
    const rawConvs = localStorage.getItem(CONVERSATIONS_KEY);
    let convs = rawConvs ? JSON.parse(rawConvs) : [];
    convs = convs.map((c) => {
      if (c.id === conversationId) {
        const curUnread = c.unreadCounts ? (c.unreadCounts[senderId] || 0) : 0;
        return {
          ...c,
          lastMessage: randomReply,
          lastMessageTimestamp: now,
          updatedAt: now,
          unreadCounts: {
            ...c.unreadCounts,
            [senderId]: curUnread + 1
          }
        };
      }
      return c;
    });
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convs));

    notifyBroadcast({ type: 'NEW_MESSAGE', message: replyMsg, conversationId });
  }, 1200);
};

export const subscribeToChatEvents = (callback) => {
  const handleStorage = (e) => {
    if (e.key === CONVERSATIONS_KEY || e.key === MESSAGES_KEY) {
      callback({ type: 'STORAGE_UPDATE' });
    }
  };

  const handleBroadcast = (event) => {
    callback(event.data);
  };

  window.addEventListener('storage', handleStorage);
  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleBroadcast);
  }

  return () => {
    window.removeEventListener('storage', handleStorage);
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleBroadcast);
    }
  };
};
