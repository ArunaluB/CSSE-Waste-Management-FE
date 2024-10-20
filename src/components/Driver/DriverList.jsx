import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  // Fetch drivers from the API when the component mounts
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('https://your-api-url/driver/getAll');
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  // Filter driver list by name or ID
  const filteredDrivers = drivers.filter(driver => 
    driver.driverName.toLowerCase().includes(filter.toLowerCase()) ||
    driver.driverId.toLowerCase().includes(filter.toLowerCase())
  );

  // Function to handle driver card click and navigate to schedule page
  const handleDriverClick = driverId => {
    navigate(`/schedule/${driverId}`);
  };

  return (
    <div className="relative min-h-screen flex justify-center ml-[20%]">
      <main className="pt-20">
        <div className="driver-list-container">
          <h1 className="header-title">All Drivers</h1>
          <input 
            type="text" 
            placeholder="Enter driver name or ID" 
            className="search-input"
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
          />
          {/* Driver List Headers */}
          <div className="driver-list-headers">
            <span>Driver ID</span>
            <span>Driver Name</span>
            <span>Availability</span>
          </div>

          {/* Render filtered driver list */}
          {filteredDrivers.map((driver) => (
            <div key={driver.driverId} onClick={() => handleDriverClick(driver.driverId)} className="driver-card">
              <div>{driver.driverId}</div>
              <div>{driver.driverName}</div>
              <div style={{ color: driver.available ? '#28A745' : '#DC3545' }}>
                {driver.available ? 'Available' : 'Not Available'}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DriverList;
