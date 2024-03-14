import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { auth, fetchUserData } from '../config/firebase';
import { DocumentData, Timestamp } from 'firebase/firestore'; // Import Timestamp
import moment from 'moment'; // Import moment for formatting

interface UserData {
  wakingTime: string;
  sleepingTime: string;
  quality: string;
  timestamp: Timestamp; // Change type to Timestamp
}

const formatDate = (timestamp: any) => {
  const date = timestamp.toDate(); // Convert Firebase Timestamp to JavaScript Date
  return moment(date).format('MMMM D, YYYY'); // Format date using moment.js
};

const convertTo24HourFormat = (time: string) => {
  let [hours, minutes] = time.split(':');
  const isPM = time.toLowerCase().includes('pm');
  if (isPM && parseInt(hours, 10) !== 12) {
    hours = String(parseInt(hours, 10) + 12);
  } else if (!isPM && parseInt(hours, 10) === 12) {
    hours = '00';
  }
  return `${hours}:${minutes}`;
};

const calculateAverageSleepHours = (userData: UserData[]) => {
  let totalSleepHours = 0;
  userData.forEach((data) => {
    const wakeUpTime = moment(convertTo24HourFormat(data.wakingTime), 'HH:mm');
    const sleepTime = moment(convertTo24HourFormat(data.sleepingTime), 'HH:mm');
    const sleepHours = sleepTime.diff(wakeUpTime, 'hours', true); // Calculate the difference in hours
    totalSleepHours += sleepHours;
  });
  return totalSleepHours / userData.length; // Return the average
};

const StudentDashboard = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [averageSleepHours, setAverageSleepHours] = useState<number | null>(null);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      fetchUserData(userId)
        .then((data: DocumentData[]) => {
          const userDataArray: UserData[] = data.map((doc) => ({
            wakingTime: doc.wakingTime,
            sleepingTime: doc.sleepingTime,
            timestamp: doc.timestamp, // Keep it as Timestamp
            quality: doc.quality
          }));
          setUserData(userDataArray);
          const averageHours = calculateAverageSleepHours(userDataArray);
          setAverageSleepHours(averageHours);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, []);

  return (
    <Container>
      <Table striped bordered hover style={{ fontSize: '3.2rem', marginTop: '150px' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Wake Up Time</th>
            <th>Sleep Time</th>
            <th>Quality</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data, index) => (
            <tr key={index}>
              <td>{formatDate(data.timestamp)}</td>
              <td>{data.wakingTime}</td>
              <td>{data.sleepingTime}</td>
              <td>{data.quality}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {averageSleepHours !== null && (
        <div style={{ fontSize: '2rem', marginTop: '20px' }}>
          Average Sleep Hours: {averageSleepHours.toFixed(2)} hours
        </div>
      )}
    </Container>
  );
};

export default StudentDashboard;
