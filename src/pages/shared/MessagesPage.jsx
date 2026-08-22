import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChat } from '../../context/ChatContext';
import { ConversationList } from '../../components/chat/ConversationList';
import { MessageWindow } from '../../components/chat/MessageWindow';

export const MessagesPage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { conversations, activeConversation, activeConversationId, setActiveConversationId, messages, sendMessage } = useChat();
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'chat'

  const handleSelectConversation = (convId) => {
    setActiveConversationId(convId);
    setMobileView('chat');
  };

  const handleBackToList = () => {
    setMobileView('list');
  };

  return (
    <div className="space-y-4 animate-fade-in text-slate-900 h-[calc(100vh-7rem)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{t('chat.messagesTitle') || 'Real-Time Workforce Chat'}</h1>
          <p className="text-xs text-slate-500 font-medium">
            {t('chat.messagesSubtitle') || 'Direct, instant end-to-end communication between Hirers & Workers.'}
          </p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">
        {/* LEFT COLUMN: Conversation List */}
        <div
          className={`md:col-span-4 h-full min-h-0 ${
            mobileView === 'chat' ? 'hidden md:block' : 'block'
          }`}
        >
          <ConversationList
            conversations={conversations}
            activeId={activeConversationId}
            onSelectConversation={handleSelectConversation}
          />
        </div>

        {/* RIGHT COLUMN: Message Window */}
        <div
          className={`md:col-span-8 h-full min-h-0 ${
            mobileView === 'list' ? 'hidden md:block' : 'block'
          }`}
        >
          <MessageWindow
            conversation={activeConversation}
            messages={messages}
            onSendMessage={sendMessage}
            onBack={handleBackToList}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
};
