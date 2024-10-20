/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/comman/Navbar/Navbar';
import Sidebar from './components/comman/Sidebar/Sidebar';
import PaymentDashboardPage from './components/PaymentServise/DashboardPage/DashboardPage';
import Home from './Home';
import Schedule from './components/Shedule/Shedule';
import AddSchedule from './components/Shedule/AddShedule';
import ViewFullBins from './components/Shedule/ViewFullBins';
import AvailableDrivers from './components/Shedule/AvailableDrivers';
import UpdateSchedule from './components/Shedule/UpdateSchedule';
import DriverList from './components/Driver/DriverList';
import ScheduleDetails from './components/Driver/ScheduleDetails';
import WasteDetails from './components/Driver/WasteDetails'; // Import the UpdateSchedule component

import backgroundImage from './assets/backB.png';

import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update the router to include the UpdateSchedule component
  const router = createBrowserRouter([
    {
      path: "/", // Root path will render Home component
      element: <Home />,
    },
    {
      path: "/schedule", // Path for schedule
      element: <Schedule />,
    },
    {
      path: "/addSchedule", // Path for adding a schedule
      element: <AddSchedule />,
    },
    {
      path: "/viewFullBins", // Path for viewing full bins
      element: <ViewFullBins />,
    },
    {
      path: "/availableDrivers", // Path for available drivers
      element: <AvailableDrivers />,
    },
    {
      path: "/driverList",
      element: <DriverList />,
    },
    {
      path: "/scheduleDetails",
      element: <ScheduleDetails />,
    },
    {
      path: "/wasteDetails", 
      element: <WasteDetails />,
    },
    {
      path: "/updateSchedule/:scheduleId", // Path for updating a schedule, with a parameter
      element: <UpdateSchedule />, // Assuming you'll create this component
    },
    {
      path: "/dashboard", // Optional path for the Payment Dashboard
      element: <PaymentDashboardPage isDarkMode={isDarkMode} />,
    },
  ]);

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isDarkMode={isDarkMode} />
        <main
         style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', // Make the background cover the entire area
          backgroundRepeat: 'no-repeat', // Prevents the image from repeating
          backgroundPosition: 'center', // Centers the image
          }}
         className="flex-1 overflow-y-auto dark:bg-gray-900"
        >
          <RouterProvider router={router} />
        </main>
      </div>
    </div>
  );
}

export default App;
