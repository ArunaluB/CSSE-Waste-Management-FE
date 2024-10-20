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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!schedule) {
    return <div>No schedule found.</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '30%',
        minHeight: '100vh', // Full viewport height
      }}
    >
      <div style={{ width: 678, height: 499, position: 'relative' }}>
        <div
          style={{
            left: 243,
            top: 0,
            position: 'absolute',
            color: '#ffffff',
            fontSize: 28.91,
            fontFamily: 'Poppins',
            fontWeight: '400',
            wordWrap: 'break-word',
          }}
        >
          Driver Schedules
        </div>
        <div
          style={{
            width: 666,
            height: 456,
            left: 0,
            top: 43,
            position: 'absolute',
            background: 'rgba(209, 226, 219, 0.45)',
            borderRadius: 18,
          }}
        />
        <Link to={`/waste-details`} style={{ textDecoration: 'none' }}>
          <div
            style={{
              width: 218,
              height: 37,
              left: 412,
              top: 421,
              position: 'absolute',
              background: '#AEE2CE',
              boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25) inset',
              borderRadius: 11,
              cursor: 'pointer',
            }}
          />
          <div
            style={{
              left: 460,
              top: 428,
              position: 'absolute',
              color: 'black',
              fontSize: 16.3,
              fontFamily: 'Poppins',
              fontWeight: '400',
              wordWrap: 'break-word',
            }}
          >
            Add waste details
          </div>
        </Link>

        <div
          style={{
            width: 590,
            height: 210,
            left: 40,
            top: 149,
            position: 'absolute',
            background: 'white',
            boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25) inset',
            borderRadius: 8,
          }}
        />

        {schedule.smartBins.map((binId, index) => (
          <div key={index}>
            <div style={{ width: 24, height: 24, left: 321, top: 166 + index * 30, position: 'absolute' }}>
              <img
                style={{ width: 18, height: 18, left: 3, top: 3, position: 'absolute' }}
                src="/True.png"
                alt="icon"
              />
            </div>
            <div
              style={{
                left: 61,
                top: 165 + index * 30,
                position: 'absolute',
                color: 'black',
                fontSize: 16.3,
                fontFamily: 'Poppins',
                fontWeight: '400',
                wordWrap: 'break-word',
              }}
            >
              {binId}
            </div>
            <div
              style={{
                left: 346,
                top: 165 + index * 30,
                position: 'absolute',
                color: '#0C4A4E',
                fontSize: 16.3,
                fontFamily: 'Poppins',
                fontWeight: '400',
                wordWrap: 'break-word',
              }}
            >
              {schedule.collectionDates[index]} {/* Assuming there's a collection date for each bin */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleDetails;
