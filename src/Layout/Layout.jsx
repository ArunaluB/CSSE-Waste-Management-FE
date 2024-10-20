/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Layout.js
import React from 'react';
import Navbar from '../components/comman/Navbar/Navbar';
import Sidebar from '../components/comman/Sidebar/Sidebar';

const Layout = ({ children, isDarkMode, setIsDarkMode }) => {
  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isDarkMode={isDarkMode} />
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
