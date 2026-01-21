import React from 'react';
import ChatHistorySidebar from '../Components/ChatHistorySidebar';

const UpgradePage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <ChatHistorySidebar />
      <div className="flex-1">
        <main className="p-4 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Upgrade</h1>
          <p className="text-gray-300 mb-4">Explore premium features and plan options.</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-gray-800 bg-gray-950 rounded p-4">
              <h2 className="text-lg font-semibold">Free</h2>
              <ul className="text-sm text-gray-400 mt-2 space-y-1">
                <li>Basic chat</li>
                <li>Session history</li>
              </ul>
            </div>
            <div className="border border-emerald-700 bg-gray-950 rounded p-4">
              <h2 className="text-lg font-semibold">Pro</h2>
              <ul className="text-sm text-gray-400 mt-2 space-y-1">
                <li>Priority replies</li>
                <li>Advanced models</li>
                <li>Early features</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UpgradePage;