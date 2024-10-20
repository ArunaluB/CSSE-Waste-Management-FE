import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ScheduleDetails = () => {
  const { scheduleId } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/schedule/getSchedule?scheduleId=${scheduleId}`);
        setSchedule(response.data);
      } catch (err) {
        setError('Error fetching schedule details');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [scheduleId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!schedule) return <div>No schedule found.</div>;

  return (
    <div className="schedule-details">
      <h1>Driver Schedules</h1>
      <Link to={`/waste-details`} className="add-waste-button">
        Add waste details
      </Link>
      {schedule.smartBins.map((binId, index) => (
        <div key={index} className="bin-info">
          <div>{binId}</div>
          <div>{schedule.collectionDates[index]}</div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleDetails;
