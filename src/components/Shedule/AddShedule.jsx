import React, { useState } from 'react';
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    FormGroup,
    Select,
    MenuItem,
    InputLabel,
    Grid,
    Container,
    Card,
    Typography,
    Box,
    FormControl,
} from '@mui/material';
import axios from 'axios';

const AddSchedule = () => {
    // Default smart bins and available drivers
    const defaultBins = [
        { id: 'SB001', status: 'Full', Proccess: 'not' },
        { id: 'SB002', status: 'Available', Proccess: 'not' },
        { id: 'SB003', status: 'Full', Proccess: 'not' },
        { id: 'SB004', status: 'Available', Proccess: 'not' },
        { id: 'SB005', status: 'Full', Proccess: 'not' },
        { id: 'SB006', status: 'Available', Proccess: 'not' },
    ];

    const availableDrivers = [
        { id: 'D001', name: 'John Doe', available: true },
        { id: 'D002', name: 'Jane Smith', available: true },
        { id: 'D003', name: 'Mike Johnson', available: true },
        { id: 'D004', name: 'Emily Davis', available: true },
        { id: 'D005', name: 'Sarah Brown', available: true },
        { id: 'D006', name: 'David Wilson', available: true },
        { id: 'D007', name: 'Laura Miller', available: true },
        { id: 'D008', name: 'James Taylor', available: true },
        { id: 'D009', name: 'Linda Anderson', available: true },
        { id: 'D010', name: 'Robert Martinez', available: true },
    ];

    // State variables to manage form inputs
    const [scheduleId, setScheduleId] = useState('');
    const [selectedBins, setSelectedBins] = useState([]);
    const [driverId, setDriverId] = useState('');
    const [time, setTime] = useState('');
    const [route, setRoute] = useState('');

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSchedule = {
            scheduleId,
            smartBins: selectedBins,
            driverId,
            time,
            route,
        };

        try {
            // Send a POST request to the API
            const response = await axios.post('http://localhost:8080/api/waste/schedule/add', newSchedule);
            console.log('Response:', response.data);
            alert('Schedule added successfully!');

            // Reset form fields
            resetFormFields();
        } catch (error) {
            console.error('Error adding schedule:', error);
            alert('Failed to add schedule. Please try again.');
        }
    };

    // Resets form fields to their default values
    const resetFormFields = () => {
        setScheduleId('');
        setSelectedBins([]);
        setDriverId('');
        setTime('');
        setRoute('');
    };

    // Handles changes in the checkbox selection for smart bins
    const handleBinChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedBins([...selectedBins, value]); // Add bin if checked
        } else {
            setSelectedBins(selectedBins.filter((bin) => bin !== value)); // Remove bin if unchecked
        }
    };

    return (
        <div className="flex min-h-screen mt-20">
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Add New Schedule
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Schedule ID input */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Schedule ID"
                                    variant="outlined"
                                    value={scheduleId}
                                    onChange={(e) => setScheduleId(e.target.value)}
                                    required
                                    placeholder="e.g., S00003"
                                />
                            </Grid>

                            {/* Smart Bins selection */}
                            <Grid item xs={12}>
                                <Typography variant="h6">Smart Bins</Typography>
                                <FormGroup row>
                                    {defaultBins
                                        .filter(bin => bin.status === 'Full' && bin.Proccess === 'not')
                                        .map((bin) => (
                                            <FormControlLabel
                                                key={bin.id}
                                                control={
                                                    <Checkbox
                                                        checked={selectedBins.includes(bin.id)}
                                                        onChange={handleBinChange}
                                                        value={bin.id}
                                                    />
                                                }
                                                label={bin.id}
                                            />
                                        ))}
                                </FormGroup>
                            </Grid>

                            {/* Driver ID selection */}
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="driver-select-label">Driver ID</InputLabel>
                                    <Select
                                        labelId="driver-select-label"
                                        id="driver-select"
                                        value={driverId}
                                        onChange={(e) => setDriverId(e.target.value)}
                                        required
                                        label="Driver ID"
                                    >
                                        <MenuItem value="" disabled>
                                            Select Driver
                                        </MenuItem>
                                        {availableDrivers
                                            .filter((driver) => driver.available)
                                            .map((driver) => (
                                                <MenuItem key={driver.id} value={driver.id}>
                                                    {driver.name} ({driver.id})
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Time input */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Time"
                                    type="time"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </Grid>

                            {/* Route input */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Route"
                                    variant="outlined"
                                    value={route}
                                    onChange={(e) => setRoute(e.target.value)}
                                    required
                                    placeholder="e.g., City Center"
                                />
                            </Grid>

                            {/* Submit button */}
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center">
                                    <Button
                                        variant="contained"
                                        color="success"
                                        type="submit"
                                        size="large"
                                    >
                                        Add Schedule
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Container>
        </div>
    );
};

export default AddSchedule;
