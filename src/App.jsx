/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PaymentDashboardPage from './components/PaymentServise/DashboardPage/DashboardPage';
import SignIn from './components/comman/Home/SignIn';
import SignUp from './components/comman/Home/SignUp';
import Layout from './Layout/Layout';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = createBrowserRouter([
    {
      path: `/dashboard/:userId`, // Fix the dynamic route here
      element: (
        <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
          <PaymentDashboardPage isDarkMode={isDarkMode} />
        </Layout>
      ),
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);
  

  return (
    <RouterProvider router={router} />
  );
}

export default App;
