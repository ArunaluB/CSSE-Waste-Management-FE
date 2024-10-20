import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';

// Styled components for the table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Styled component for table rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Schedule = () => {
  const navigate = useNavigate();
  
  // State to hold schedule data, loading, and error state
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch schedules from the backend API
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/waste/schedule/getSchedules');
        setSchedules(response.data); // Assuming the API returns an array of schedules
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch schedules');
        setLoading(false);
      }
    };
    
    fetchSchedules();
  }, []);

  const handleAddSchedule = () => {
    navigate('/addSchedule');
  };

  const handleViewFullBins = () => {
    navigate('/viewFullBins');
  };

  const handleAvailabilityDrivers = () => {
    navigate('/availableDrivers');
  };

  const handleEditSchedule = (scheduleId) => {
    navigate(`/updateSchedule/${scheduleId}`);
  };

  const handleDeleteSchedule = async (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await axios.delete(`http://localhost:8080/api/waste/schedule/delete/${scheduleId}`);
        // Remove the deleted schedule from the state
        setSchedules(schedules.filter(schedule => schedule.scheduleId !== scheduleId));
        alert('Schedule deleted successfully!');
      } catch (error) {
        console.error('Error deleting schedule:', error);
        alert('Failed to delete schedule. Please try again.');
      }
    }
  };

  // Render loading and error states
  if (loading) {
    return <div>Loading schedules...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="ml-20 mt-20 p-10 flex-1 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url('../assets/backB.png')" }}>
        <h1 className='text-3xl mb-6 text-[#EFFFCB] font-bold text-center'>All Schedules</h1>

        {/* Table Container */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Schedule Id</StyledTableCell>
                <StyledTableCell>Smart Bins</StyledTableCell>
                <StyledTableCell>Driver Id</StyledTableCell>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell>Route</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((schedule) => (
                <StyledTableRow key={schedule.scheduleId}>
                  <StyledTableCell>{schedule.scheduleId}</StyledTableCell>
                  <StyledTableCell>
                    {schedule.smartBins.map((bin) => (
                      <span key={bin} className="inline-block bg-green-600 text-white px-3 py-1 rounded-full mr-2 mb-2 text-sm">{bin}</span>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell>{schedule.driverId}</StyledTableCell>
                  <StyledTableCell>{schedule.time}</StyledTableCell>
                  <StyledTableCell>{schedule.route}</StyledTableCell>
                  <StyledTableCell>
                    <Button 
                      variant="contained" 
                      color="success" 
                      onClick={() => handleEditSchedule(schedule.scheduleId)}
                    >
                      Update
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error" 
                      onClick={() => handleDeleteSchedule(schedule.scheduleId)}
                      sx={{ marginLeft: 1 }} // Add some spacing between buttons
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Buttons */}
        <div className="mt-10 flex justify-center gap-8">
          <Button variant="contained" color="success" onClick={handleAddSchedule}>
            Add Schedule
          </Button>
          <Button variant="contained" color="success" onClick={handleViewFullBins}>
            View Full Bins
          </Button>
          <Button variant="contained" color="success" onClick={handleAvailabilityDrivers}>
            Availability Drivers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
