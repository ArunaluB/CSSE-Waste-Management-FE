import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

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

const AvailableDrivers = () => {
    const navigate = useNavigate();

    // State to store the list of drivers
    const [drivers, setDrivers] = useState([
        { driverId: 'D001', name: 'John Doe', status: 'Available' },
        { driverId: 'D002', name: 'Jane Smith', status: 'Available' },
        { driverId: 'D003', name: 'Bob Johnson', status: 'Unavailable' },
        { driverId: 'D004', name: 'Alice Brown', status: 'Available' },
        { driverId: 'D005', name: 'Michael Davis', status: 'Available' },
        { driverId: 'D006', name: 'Emily Wilson', status: 'Unavailable' },
    ]);

    // Fetch available drivers from the backend (placeholder for future implementation)
    useEffect(() => {
        // Uncomment and implement data fetching when backend is ready
        /*
        fetch('http://your-backend-api/availableDrivers')
            .then(response => response.json())
            .then(data => setDrivers(data))
            .catch(error => console.error('Error fetching drivers data:', error));
        */
    }, []);

    return (
        <div className="flex min-h-screen">
            <div
                className="ml-20 mt-24 p-10 flex-1 bg-cover bg-center bg-no-repeat bg-fixed"
                style={{ backgroundImage: "url('../assets/backB.png')" }}
            >
                <h1 className='text-3xl mb-6 text-[#EFFFCB] font-bold text-center'>Available Drivers</h1>

                {/* Table Container */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Driver ID</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {drivers.map((driver) => (
                                <StyledTableRow key={driver.driverId}>
                                    <StyledTableCell>{driver.driverId}</StyledTableCell>
                                    <StyledTableCell>{driver.name}</StyledTableCell>
                                    <StyledTableCell>{driver.status}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Button to navigate to the Add Schedule page */}
                <div className="mt-10 flex justify-center">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => navigate('/addSchedule')}
                    >
                        Add Schedule with Available Driver
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AvailableDrivers;
