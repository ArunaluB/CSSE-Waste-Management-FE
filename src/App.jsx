/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/comman/Navbar/Navbar';
import Sidebar from './components/comman/Sidebar/Sidebar';
import PaymentDashboardPage from './components/PaymentServise/DashboardPage/DashboardPage';
import './App.css';
import DriverList from './components/Driver/DriverList';
import ScheduleDetails from './components/Driver/ScheduleDetails';
import WasteDetails from './components/Driver/WasteDetails';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PaymentDashboardPage isDarkMode={isDarkMode} />,
    },
    {
      path: "/d",
      element: <DriverList isDarkMode={isDarkMode} />,
    },
    {
      path: "/schedule/:driverId",
      element: <ScheduleDetails isDarkMode={isDarkMode} />,
    },
    {
      path: "/waste-details",
      element: <WasteDetails isDarkMode={isDarkMode} />,
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
