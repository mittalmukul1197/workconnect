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
    <div className="h-full flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden text-slate-900">
      {/* Header */}
      <div className="p-4 border-b border-slate-200/80 space-y-3 bg-slate-50/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Icon name="message-square" className="w-4 h-4" />
            </div>
            <h2 className="font-black text-lg text-slate-900">{t('chat.messages') || 'Messages'}</h2>
          </div>
          <span className="text-xs text-slate-500 font-bold bg-white px-2.5 py-1 rounded-full border border-slate-200">
            {conversations.length} {t('chat.chats') || 'Chats'}
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Icon name="search" className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('chat.searchConversations') || 'Search conversations...'}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <Icon name="x" className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <Icon name="search" className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-bold text-slate-600">{t('chat.noConversations') || 'No conversations found'}</p>
            <p className="text-[11px] text-slate-400">
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
                className={`w-full p-3 rounded-xl flex items-start gap-3 transition-all text-left ${
                  isActive
                    ? 'bg-indigo-50/80 border border-indigo-200/80 shadow-xs'
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={recipient.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'}
                    alt={recipient.name}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-200 shadow-xs"
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      recipient.online !== false ? 'bg-emerald-500' : 'bg-slate-400'
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs truncate ${unread > 0 ? 'font-black text-slate-900' : 'font-bold text-slate-900'}`}>
                      {recipient.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium flex-shrink-0 ml-2">
                      {formatTimestamp(conv.lastMessageTimestamp || conv.updatedAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100 flex-shrink-0">
                      {recipient.role === 'worker' ? (t('role.worker') || 'Worker') : (t('role.hirer') || 'Hirer')}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate">{recipient.profession}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className={`text-xs truncate ${unread > 0 ? 'font-bold text-slate-900' : 'text-slate-500'}`}>
                      {conv.lastMessage || 'No messages yet'}
                    </p>

                    {unread > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-[10px] min-w-[18px] text-center shadow-xs animate-pulse">
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
