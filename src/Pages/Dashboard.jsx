import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Welcome to your PRIVOAI dashboard.</p>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
