import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { auth, fetchUserData } from '../config/firebase';
import { DocumentData, Timestamp } from 'firebase/firestore';
import moment from 'moment';

interface UserData {
  wakingTime: string;
  sleepingTime: string;
  timestamp: Timestamp;
}

const formatDate = (timestamp: any) => {
  const date = timestamp.toDate();
  return moment(date).format('MMMM D, YYYY');
};

const calculateAverageSleepHours = (userData: UserData[]) => {
  let totalSleepHours = 0;
  userData.forEach((data) => {
    const wakeUpTime = moment(data.wakingTime, 'HH:mm');
    const sleepTime = moment(data.sleepingTime, 'HH:mm');
    const sleepHours = sleepTime.diff(wakeUpTime, 'hours', true);
    totalSleepHours += sleepHours;
  });
  return totalSleepHours / userData.length;
};

const SleepDataTable = () => {
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
          </tr>
        </thead>
        <tbody>
          {userData.map((data, index) => (
            <tr key={index}>
              <td>{formatDate(data.timestamp)}</td>
              <td>{data.wakingTime}</td>
              <td>{data.sleepingTime}</td>
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

export default SleepDataTable;
