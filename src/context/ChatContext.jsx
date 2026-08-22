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
  const reloadData = useCallback(() => {
    initChatStorage();
    if (!user?.id) {
      setConversations([]);
      setMessages([]);
      return;
    }

    const userConvs = getConversations(user.id);
    setConversations(userConvs);

    // If active conversation exists, update its messages
    if (activeConversationId) {
      const msgs = getMessages(activeConversationId);
      setMessages(msgs);
      apiMarkAsRead(activeConversationId, user.id);
    } else if (userConvs.length > 0) {
      // Default select first conversation if none selected
      setActiveConversationId(userConvs[0].id);
      const msgs = getMessages(userConvs[0].id);
      setMessages(msgs);
      apiMarkAsRead(userConvs[0].id, user.id);
    }
  }, [user?.id, activeConversationId]);

  useEffect(() => {
    reloadData();
  }, [user?.id, reloadData]);

  // Subscribe to real-time cross-tab and storage events
  useEffect(() => {
    const unsubscribe = subscribeToChatEvents(() => {
      reloadData();
    });
    return () => unsubscribe();
  }, [reloadData]);

  // Handle setting active conversation
  const selectConversation = useCallback((convId) => {
    setActiveConversationId(convId);
    if (convId) {
      const msgs = getMessages(convId);
      setMessages(msgs);
      if (user?.id) {
        apiMarkAsRead(convId, user.id);
      }
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
      // Refresh conversations list for latest timestamp
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

  // Total unread count for logged-in user across all conversations
  const unreadCount = conversations.reduce((total, conv) => {
    if (!user?.id || !conv.unreadCounts) return total;
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
