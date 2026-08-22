import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';

export const ConversationList = ({ conversations, activeId, onSelectConversation }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const currentUserId = user?.id;

  const filteredConversations = conversations.filter((conv) => {
    const otherUserId = conv.participant1Id === currentUserId ? conv.participant2Id : conv.participant1Id;
    const recipient = conv.participantsInfo?.[otherUserId] || {};
    const nameMatch = (recipient.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const roleMatch = (recipient.profession || '').toLowerCase().includes(searchQuery.toLowerCase());
    const msgMatch = (conv.lastMessage || '').toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || roleMatch || msgMatch;
  });

  const formatTimestamp = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return t('chat.justNow') || 'Just now';
      if (diffMins < 60) return `${diffMins}m`;
      if (diffHours < 24) return `${diffHours}h`;
      if (diffDays === 1) return t('chat.yesterday') || 'Yesterday';
      if (diffDays < 7) return `${diffDays}d`;
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden text-slate-900">
      {/* Header & Search */}
      <div className="p-4 sm:p-5 border-b border-slate-100 space-y-3.5 bg-slate-50/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
              <Icon name="message-square" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-base text-slate-900">{t('chat.messages') || 'Messages'}</h2>
              <p className="text-[11px] text-slate-500 font-medium">Direct Workforce Inbox</p>
            </div>
          </div>
          <span className="text-xs text-indigo-700 font-black bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            {conversations.length} {t('chat.chats') || 'Chats'}
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Icon name="search" className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('chat.searchConversations') || 'Search conversations...'}
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <Icon name="x" className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Icon name="search" className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-700">{t('chat.noConversations') || 'No conversations found'}</p>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              {searchQuery
                ? (t('chat.tryDifferentSearch') || 'Try searching for another user or role.')
                : (t('chat.startMessageFromProfile') || 'Start a conversation from a worker profile or job offer.')}
            </p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const otherUserId = conv.participant1Id === currentUserId ? conv.participant2Id : conv.participant1Id;
            const recipient = conv.participantsInfo?.[otherUserId] || {
              name: 'WorkConnect User',
              role: 'worker',
              profession: 'Member',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
              online: true
            };

            const unread = conv.unreadCounts ? (conv.unreadCounts[currentUserId] || 0) : 0;
            const isActive = conv.id === activeId;

            return (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all text-left border ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-50/90 to-purple-50/50 border-indigo-300 shadow-sm'
                    : 'bg-white hover:bg-slate-50/80 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={recipient.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'}
                    alt={recipient.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-xs"
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      recipient.online !== false ? 'bg-emerald-500' : 'bg-slate-400'
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs truncate ${unread > 0 ? 'font-black text-slate-900' : 'font-extrabold text-slate-900'}`}>
                      {recipient.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold flex-shrink-0 ml-2">
                      {formatTimestamp(conv.lastMessageTimestamp || conv.updatedAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border ${
                      recipient.role === 'worker'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    }`}>
                      {recipient.role === 'worker' ? 'WORKER' : 'BUSINESS'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium truncate">{recipient.profession}</span>
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <p className={`text-xs truncate ${unread > 0 ? 'font-bold text-slate-900' : 'text-slate-500 font-medium'}`}>
                      {conv.lastMessage || 'No messages yet'}
                    </p>

                    {unread > 0 && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-indigo-600 text-white font-black text-[10px] min-w-[18px] text-center shadow-sm">
                        {unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
