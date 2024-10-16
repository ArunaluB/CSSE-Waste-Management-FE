/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/comman/Navbar/Navbar';
import Sidebar from './components/comman/Sidebar/Sidebar';
import PaymentDashboardPage from './components/PaymentServise/DashboardPage/DashboardPage';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PaymentDashboardPage isDarkMode={isDarkMode} />,
    },
  ]);

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isDarkMode={isDarkMode} />
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <RouterProvider router={router} />
        </main>
      </div>
    </div>
  );
}

export default App;
