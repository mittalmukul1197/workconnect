import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';

export const MessageWindow = ({ conversation, messages, onSendMessage, onBack, onNavigate }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Identify recipient user details
  const currentUserId = user?.id;
  const otherUserId = conversation
    ? (conversation.participant1Id === currentUserId
        ? conversation.participant2Id
        : conversation.participant1Id)
    : null;

  const recipient = conversation?.participantsInfo?.[otherUserId] || {
    name: 'WorkConnect User',
    role: 'worker',
    profession: 'Member',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    online: true
  };

  // Auto-scroll to bottom of chat area when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    onSendMessage(trimmed);
    setInputText('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const formatDateLabel = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      const today = new Date();
      if (date.toDateString() === today.toDateString()) {
        return t('chat.today') || 'Today';
      }
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  if (!conversation) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 text-slate-900">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
          <Icon name="message-square" className="w-8 h-8" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h3 className="font-bold text-base text-slate-900">{t('chat.selectConversation') || 'Select a Conversation'}</h3>
          <p className="text-xs text-slate-500 font-medium">
            {t('chat.selectConversationSubtitle') || 'Choose a contact from the list on the left to start chatting in real time.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden text-slate-900">
      {/* HEADER */}
      <div className="px-4 py-3.5 border-b border-slate-200/80 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          {/* Back button for mobile */}
          {onBack && (
            <button
              onClick={onBack}
              className="lg:hidden p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
              title={t('common.back') || 'Back'}
            >
              <Icon name="arrow-left" className="w-5 h-5" />
            </button>
          )}

          <div className="relative">
            <img
              src={recipient.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'}
              alt={recipient.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                recipient.online !== false ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900 truncate">{recipient.name}</h3>
              <Badge
                variant={recipient.role === 'worker' ? 'emerald' : 'indigo'}
                className="text-[10px] uppercase font-bold py-0"
              >
                {recipient.role === 'worker' ? (t('role.worker') || 'Worker') : (t('role.hirer') || 'Hirer')}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate">
              {recipient.profession || 'WorkConnect Member'} •{' '}
              <span className={recipient.online !== false ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                {recipient.online !== false ? (t('chat.online') || 'Online') : (t('chat.offline') || 'Offline')}
              </span>
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          {recipient.role === 'worker' && recipient.id && (
            <button
              onClick={() => onNavigate && onNavigate(`/workers/${recipient.id}`)}
              className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-all flex items-center gap-1.5"
            >
              <Icon name="shield-check" className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">{t('chat.viewPassport') || 'Passport'}</span>
            </button>
          )}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Icon name="message-square" className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-800">{t('chat.noMessagesYet') || 'No messages yet'}</p>
              <p className="text-xs text-slate-500">{t('chat.startConversation') || 'Say hello to start the conversation!'}</p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isSender = msg.senderId === currentUserId;
            const showDateHeader =
              index === 0 ||
              formatDateLabel(messages[index - 1].timestamp) !== formatDateLabel(msg.timestamp);

            return (
              <React.Fragment key={msg.id || index}>
                {showDateHeader && (
                  <div className="flex items-center justify-center my-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-0.5 rounded-full bg-slate-200/60">
                      {formatDateLabel(msg.timestamp)}
                    </span>
                  </div>
                )}

                <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} space-y-1`}>
                  <div
                    className={`max-w-[82%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed font-medium shadow-2xs ${
                      isSender
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-xs'
                        : 'bg-white border border-slate-200 text-slate-900 rounded-tl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  </div>

                  <div className="flex items-center gap-1.5 px-1">
                    <span className="text-[10px] text-slate-400 font-medium">{formatTime(msg.timestamp)}</span>
                    {isSender && (
                      <span title={msg.readAt ? 'Read' : 'Delivered'}>
                        <Icon
                          name="check-check"
                          className={`w-3.5 h-3.5 ${msg.readAt ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}
                        />
                      </span>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* MESSAGE INPUT */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-200/80 bg-white">
        <div className="flex items-end gap-2 bg-slate-100/80 border border-slate-200/80 rounded-2xl p-1.5 focus-within:border-indigo-500 focus-within:bg-white transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chat.typeMessage') || 'Type a message...'}
            className="flex-1 bg-transparent px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none resize-none max-h-28 overflow-y-auto leading-relaxed"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-center ${
              inputText.trim()
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            title={t('chat.send') || 'Send message'}
          >
            <Icon name="send" className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
