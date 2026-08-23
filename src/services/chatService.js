// WorkConnect Real-Time Messaging & Chat Service
// Supports local storage persistence, cross-tab real-time BroadcastChannel sync, and initial demo seed conversations.
// Upgraded to support:
// 1. Global real-time sync across different browsers/devices using Firebase Firestore if configured.
// 2. Out-of-the-box local real-time sync across different browser profiles & different browsers (Chrome, Edge, etc.)
//    using an integrated local WebSocket dev server attached directly to the Vite dev server!

import { db, isFirebaseConfigured } from './firebaseClient';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot 
} from 'firebase/firestore';

const CONVERSATIONS_KEY = 'workconnect_conversations';
const MESSAGES_KEY = 'workconnect_messages';
const CHANNEL_NAME = 'workconnect_chat_channel';

// Local WebSocket Server sync connection for cross-profile and cross-browser synchronization
let localSocket = null;
const socketCallbacks = new Set();

const initLocalSocket = () => {
  if (typeof window === 'undefined') return;
  if (localSocket && (localSocket.readyState === WebSocket.CONNECTING || localSocket.readyState === WebSocket.OPEN)) {
    return;
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}/chat-sync`;
  
  try {
    localSocket = new WebSocket(wsUrl);
    
    localSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'NEW_MESSAGE') {
          const { message, conversationId } = data;
          
          // Merge message into local storage
          const rawMsgs = localStorage.getItem(MESSAGES_KEY);
          const msgsMap = rawMsgs ? JSON.parse(rawMsgs) : {};
          const currentList = msgsMap[conversationId] || [];
          
          if (!currentList.some((m) => m.id === message.id)) {
            msgsMap[conversationId] = [...currentList, message];
            localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgsMap));
          }
          
          // Trigger callbacks to update React state
          socketCallbacks.forEach((cb) => cb({ type: 'SOCKET_UPDATE', conversationId }));
        } else if (data.type === 'MESSAGES_READ') {
          const { conversationId, userId } = data;
          
          // Sync read status locally
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
          
          // Trigger callbacks to update React state
          socketCallbacks.forEach((cb) => cb({ type: 'SOCKET_UPDATE', conversationId }));
        }
      } catch (e) {
        console.warn('Failed to parse socket message:', e);
      }
    };
    
    localSocket.onclose = () => {
      // Reconnect after 3 seconds if disconnected
      setTimeout(initLocalSocket, 3000);
    };

    localSocket.onerror = () => {
      localSocket.close();
    };
  } catch (e) {
    console.warn('Failed to initialize WebSocket client:', e);
  }
};

const sendOverSocket = (data) => {
  if (localSocket && localSocket.readyState === WebSocket.OPEN) {
    try {
      localSocket.send(JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to send over local WebSocket:', e);
    }
  }
};

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
      'usr-bus-1': 1,
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

// Initialize Storage (and seed Firestore if configured)
export const initChatStorage = async () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(CONVERSATIONS_KEY)) {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(DEFAULT_CONVERSATIONS));
  }
  if (!localStorage.getItem(MESSAGES_KEY)) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(DEFAULT_MESSAGES));
  } else {
    // Purge any previously auto-generated bot reply messages from storage
    try {
      const raw = localStorage.getItem(MESSAGES_KEY);
      const allMsgs = raw ? JSON.parse(raw) : {};
      let cleaned = false;
      Object.keys(allMsgs).forEach((convId) => {
        const origLen = allMsgs[convId].length;
        allMsgs[convId] = allMsgs[convId].filter(m => !m.id || !m.id.startsWith('msg-reply-'));
        if (allMsgs[convId].length !== origLen) cleaned = true;
      });
      if (cleaned) {
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMsgs));
      }
    } catch (e) {
      console.warn('Storage cleanup notice:', e);
    }
  }

  // Seeding default templates to Firebase Firestore
  if (isFirebaseConfigured() && db) {
    try {
      const convsSnap = await getDocs(collection(db, 'conversations'));
      if (convsSnap.empty) {
        for (const c of DEFAULT_CONVERSATIONS) {
          await setDoc(doc(db, 'conversations', c.id), c);
        }
        for (const cid of Object.keys(DEFAULT_MESSAGES)) {
          for (const m of DEFAULT_MESSAGES[cid]) {
            await setDoc(doc(db, 'messages', m.id), m);
          }
        }
        console.log("🔥 Successfully seeded default chat template elements in Firestore!");
      }
    } catch (e) {
      console.warn("Firebase seeding notice:", e);
    }
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
    
    if (isFirebaseConfigured() && db) {
      try {
        setDoc(doc(db, 'conversations', existing.id), existing);
      } catch (e) {
        console.error("Firebase Sync Error (getOrCreateConversation):", e);
      }
    }
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

  if (isFirebaseConfigured() && db) {
    try {
      setDoc(doc(db, 'conversations', newConvId), newConv);
    } catch (e) {
      console.error("Firebase Sync Error (new conversation):", e);
    }
  }

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
  let updatedConv = null;
  convs = convs.map((c) => {
    if (c.id === conversationId) {
      const currentUnread = c.unreadCounts ? (c.unreadCounts[receiverId] || 0) : 0;
      updatedConv = {
        ...c,
        lastMessage: trimmed,
        lastMessageTimestamp: now,
        updatedAt: now,
        unreadCounts: {
          ...c.unreadCounts,
          [receiverId]: currentUnread + 1
        }
      };
      return updatedConv;
    }
    return c;
  });
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convs));

  const payload = { type: 'NEW_MESSAGE', message: newMsg, conversationId };
  notifyBroadcast(payload);
  sendOverSocket(payload);

  // Sync to Firebase if configured
  if (isFirebaseConfigured() && db) {
    try {
      setDoc(doc(db, 'messages', newMsg.id), newMsg);
      if (updatedConv) {
        setDoc(doc(db, 'conversations', conversationId), updatedConv);
      }
    } catch (e) {
      console.error("Firebase Sync Error (sendMessage):", e);
    }
  }

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
  let updatedConv = null;

  convs = convs.map((c) => {
    if (c.id === conversationId && c.unreadCounts && c.unreadCounts[userId] > 0) {
      updated = true;
      updatedConv = {
        ...c,
        unreadCounts: {
          ...c.unreadCounts,
          [userId]: 0
        }
      };
      return updatedConv;
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
      const updatedMsgs = [];
      msgsMap[conversationId] = msgsMap[conversationId].map((m) => {
        if (m.receiverId === userId && !m.readAt) {
          const updatedMsg = { ...m, readAt: now };
          updatedMsgs.push(updatedMsg);
          return updatedMsg;
        }
        return m;
      });
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgsMap));

      // Sync reads to Firebase if configured
      if (isFirebaseConfigured() && db) {
        try {
          if (updatedConv) {
            setDoc(doc(db, 'conversations', conversationId), updatedConv);
          }
          updatedMsgs.forEach((um) => {
            setDoc(doc(db, 'messages', um.id), um);
          });
        } catch (e) {
          console.error("Firebase Sync Error (markAsRead):", e);
        }
      }
    }

    const payload = { type: 'MESSAGES_READ', conversationId, userId };
    notifyBroadcast(payload);
    sendOverSocket(payload);
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

export const subscribeToChatEvents = (callback) => {
  initLocalSocket();
  socketCallbacks.add(callback);

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

  // Firebase Real-time Subscription listeners if Firebase environment variables are configured
  let unsubscribeMsgs = () => {};
  let unsubscribeConvs = () => {};

  if (isFirebaseConfigured() && db) {
    try {
      // 1. Subscribe to conversations updates
      unsubscribeConvs = onSnapshot(collection(db, 'conversations'), (snapshot) => {
        const fbConvs = [];
        snapshot.forEach((docSnap) => {
          fbConvs.push(docSnap.data());
        });
        if (fbConvs.length > 0) {
          const raw = localStorage.getItem(CONVERSATIONS_KEY);
          let localConvs = raw ? JSON.parse(raw) : [];
          
          fbConvs.forEach((fc) => {
            const idx = localConvs.findIndex(lc => lc.id === fc.id);
            if (idx > -1) {
              localConvs[idx] = { ...localConvs[idx], ...fc };
            } else {
              localConvs.unshift(fc);
            }
          });
          localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(localConvs));
          callback({ type: 'FIREBASE_UPDATE' });
        }
      }, (err) => {
        console.warn("Firebase Conversations subscription warning:", err);
      });

      // 2. Subscribe to messages updates
      unsubscribeMsgs = onSnapshot(collection(db, 'messages'), (snapshot) => {
        const fbMsgs = [];
        snapshot.forEach((docSnap) => {
          fbMsgs.push(docSnap.data());
        });
        if (fbMsgs.length > 0) {
          const raw = localStorage.getItem(MESSAGES_KEY);
          let localMsgsMap = raw ? JSON.parse(raw) : {};

          fbMsgs.forEach((fm) => {
            const cid = fm.conversationId;
            if (!localMsgsMap[cid]) {
              localMsgsMap[cid] = [];
            }
            const idx = localMsgsMap[cid].findIndex(lm => lm.id === fm.id);
            if (idx > -1) {
              localMsgsMap[cid][idx] = { ...localMsgsMap[cid][idx], ...fm };
            } else {
              localMsgsMap[cid].push(fm);
            }
            localMsgsMap[cid].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          });
          
          localStorage.setItem(MESSAGES_KEY, JSON.stringify(localMsgsMap));
          callback({ type: 'FIREBASE_UPDATE' });
        }
      }, (err) => {
        console.warn("Firebase Messages subscription warning:", err);
      });
    } catch (e) {
      console.error("Failed to initialize Firebase listeners:", e);
    }
  }

  return () => {
    window.removeEventListener('storage', handleStorage);
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleBroadcast);
    }
    unsubscribeConvs();
    unsubscribeMsgs();
    socketCallbacks.delete(callback);
  };
};
