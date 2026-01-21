import React from 'react';
import ChatHistorySidebar from '../Components/ChatHistorySidebar';

const HelpPage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <ChatHistorySidebar />
      <div className="flex-1">
        <main className="p-4 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Help</h1>
          <div className="space-y-4 border border-gray-800 bg-gray-950 rounded p-4 text-sm">
            <p>Use the chat to ask questions or get assistance. Messages support code blocks and inline code for clarity.</p>
            <p>If you encounter issues, check your network or backend server at <code>http://localhost:7000</code>.</p>
            <p>For account problems, re-login from the sidebar or profile page.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HelpPage;