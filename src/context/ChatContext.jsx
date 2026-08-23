import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  initChatStorage,
  getConversations,
  getMessages,
  sendMessage as apiSendMessage,
  markAsRead as apiMarkAsRead,
  getOrCreateConversation,
  subscribeToChatEvents
} from '../services/chatService';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);

  // Initialize and load conversations when user changes or chat events fire
  // Initialize and load conversations when user changes or chat events fire
  const reloadData = useCallback(() => {
    initChatStorage();
    if (!user?.id) {
      setConversations((prev) => prev.length > 0 ? [] : prev);
      setMessages((prev) => prev.length > 0 ? [] : prev);
      return;
    }

    // If active conversation exists, mark as read BEFORE reading conversations
    if (activeConversationId) {
      apiMarkAsRead(activeConversationId, user.id);
      const msgs = getMessages(activeConversationId);
      
      setMessages((prev) => {
        // Compare message list to avoid redundant renders
        const prevIds = prev.map((m) => `${m.id}::${m.timestamp}::${m.readAt}`).join(',');
        const nextIds = msgs.map((m) => `${m.id}::${m.timestamp}::${m.readAt}`).join(',');
        if (prevIds !== nextIds) {
          return msgs;
        }
        return prev;
      });
    }

    const userConvs = getConversations(user.id);
    // Force active conversation unread count to 0 in local state as well
    const updatedUserConvs = userConvs.map((c) => {
      if (c.id === activeConversationId && c.unreadCounts && c.unreadCounts[user.id]) {
        return {
          ...c,
          unreadCounts: { ...c.unreadCounts, [user.id]: 0 }
        };
      }
      return c;
    });

    setConversations((prev) => {
      // Simple change detection for conversations
      const prevIdsStr = prev.map(c => `${c.id}::${c.lastMessageTimestamp}::${c.unreadCounts?.[user.id] || 0}`).join(',');
      const nextIdsStr = updatedUserConvs.map(c => `${c.id}::${c.lastMessageTimestamp}::${c.unreadCounts?.[user.id] || 0}`).join(',');
      if (prevIdsStr !== nextIdsStr) {
        return updatedUserConvs;
      }
      return prev;
    });
  }, [user?.id, activeConversationId]);

  useEffect(() => {
    setActiveConversationId(null);
    setMessages([]);
  }, [user?.id]);

  useEffect(() => {
    reloadData();
  }, [user?.id, reloadData]);

  // Subscribe to real-time cross-tab and storage events, plus a polling fallback
  useEffect(() => {
    const unsubscribe = subscribeToChatEvents(() => {
      reloadData();
    });

    // 1-second polling to ensure sync even if BroadcastChannel or storage events are blocked by browser policies
    const pollInterval = setInterval(() => {
      reloadData();
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(pollInterval);
    };
  }, [reloadData]);

  // Handle setting active conversation
  const selectConversation = useCallback((convId) => {
    setActiveConversationId(convId);
    if (convId && user?.id) {
      apiMarkAsRead(convId, user.id);
      const msgs = getMessages(convId);
      setMessages(msgs);
      const userConvs = getConversations(user.id);
      setConversations(userConvs);
    } else {
      setMessages([]);
    }
  }, [user?.id]);

  // Send a message in active conversation
  const sendMessageText = useCallback((text) => {
    if (!activeConversationId || !user?.id) return null;

    const conv = conversations.find((c) => c.id === activeConversationId);
    if (!conv) return null;

    const receiverId = conv.participant1Id === user.id ? conv.participant2Id : conv.participant1Id;

    const newMsg = apiSendMessage({
      conversationId: activeConversationId,
      senderId: user.id,
      receiverId,
      text
    });

    if (newMsg) {
      setMessages((prev) => [...prev, newMsg]);
      // Active conversation is currently open, mark read immediately
      apiMarkAsRead(activeConversationId, user.id);
      const updatedConvs = getConversations(user.id);
      setConversations(updatedConvs);
    }
    return newMsg;
  }, [activeConversationId, user?.id, conversations]);

  // Quick Action: Open chat with another user (e.g. from profile or directory)
  const openChatWithUser = useCallback((otherUser, onNavigate) => {
    if (!user?.id || !otherUser?.id) return;

    const conv = getOrCreateConversation(user, otherUser);
    if (conv) {
      setActiveConversationId(conv.id);
      setMessages(getMessages(conv.id));
      apiMarkAsRead(conv.id, user.id);
      setConversations(getConversations(user.id));
      if (onNavigate) {
        onNavigate('/messages');
      }
    }
  }, [user]);

  // Total unread count for logged-in user across all conversations (excluding open active conversation)
  const unreadCount = conversations.reduce((total, conv) => {
    if (!user?.id || !conv.unreadCounts) return total;
    if (conv.id === activeConversationId) return total; // Currently open conversation has 0 unread
    return total + (conv.unreadCounts[user.id] || 0);
  }, 0);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        activeConversationId,
        setActiveConversationId: selectConversation,
        messages,
        sendMessage: sendMessageText,
        openChatWithUser,
        unreadCount,
        reloadData
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
