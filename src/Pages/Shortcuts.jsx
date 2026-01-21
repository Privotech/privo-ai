import React from 'react';
import ChatHistorySidebar from '../Components/ChatHistorySidebar';

const ShortcutsPage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <ChatHistorySidebar />
      <div className="flex-1">
        <main className="p-4 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Keyboard Shortcuts</h1>
          <ul className="space-y-3 border border-gray-800 bg-gray-950 rounded p-4 text-sm">
            <li className="flex justify-between"><span>Send message</span><span className="text-gray-400">Enter</span></li>
            <li className="flex justify-between"><span>New line</span><span className="text-gray-400">Shift + Enter</span></li>
            <li className="flex justify-between"><span>New chat</span><span className="text-gray-400">Alt + N</span></li>
          </ul>
        </main>
      </div>
    </div>
  );
};

export default ShortcutsPage;