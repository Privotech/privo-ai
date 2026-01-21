import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;