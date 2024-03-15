import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { auth, fetchUserData, saveAverageTimes } from '../config/firebase';
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

// Function to parse time string and convert to 24-hour format
const parseTimeTo24HourFormat = (time: string) => {
  let [hours, minutes] = time.split(':');
  let hour = parseInt(hours, 10);

  if (time.toLowerCase().includes('am') && hour !== 12) {
    hour += 12;
  } else if (time.toLowerCase().includes('pm') && hour === 12) {
    hour = 0;
  }

  const decimalMinutes = minutes ? parseInt(minutes, 10) / 60 : 0;
  return hour + decimalMinutes;
};

// Function to calculate the average sleeping hours
const calculateAverageSleepHours = (userData: UserData[]) => {
  let totalSleepHours = 0;
  userData.forEach((data) => {
    const wakeUpTime = parseTimeTo24HourFormat(data.wakingTime);
    const sleepTime = parseTimeTo24HourFormat(data.sleepingTime);
    const sleepHours = sleepTime - wakeUpTime; // Calculate the difference in hours
    totalSleepHours += sleepHours;
  });
  return totalSleepHours / userData.length * -1; // Return the average
};

function convertMilitaryTimeToString(militaryTime: number) {
  // Extract hours and minutes
  let hours = Math.floor(militaryTime);
  let minutes = (militaryTime - hours) * 60;

  // If minutes is not an integer, round it to the nearest integer
  minutes = Math.round(minutes);

  // If minutes exceed 60, adjust hours and reset minutes
  if (minutes >= 60) {
    hours++;
    minutes -= 60;
  }

  // Format the hours and minutes
  let formattedHours = hours.toString().padStart(2, '0');
  let formattedMinutes = minutes.toString().padStart(2, '0');

  // Handle AM/PM format
  let ampm = 'AM';
  if (hours >= 12) {
    if (hours > 12) {
      formattedHours = (hours - 12).toString().padStart(2, '0');
    }
    ampm = 'PM';
  } else if (hours === 0) {
    formattedHours = '12';
  }

  // Format the time as "HH:MM AM/PM"
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
}

// Function to calculate the average wake-up time
const calculateAverageWakeUpTime = (userData: UserData[]) => {
  let totalWakeUpTime = 0;
  let count = 0;

  userData.forEach((data) => {
    const wakeUpTime = parseTimeTo24HourFormat(data.wakingTime);
    totalWakeUpTime += wakeUpTime;
    count++;
  });

  // Calculate the average wake-up time
  const averageWakeUpTime = totalWakeUpTime / count;
  return averageWakeUpTime;
};

// Function to calculate the average sleep time
const calculateAverageSleepTime = (userData: UserData[]) => {
  let totalSleepTime = 0;
  let count = 0;

  userData.forEach((data) => {
    const sleepTime = parseTimeTo24HourFormat(data.sleepingTime);
    totalSleepTime += sleepTime;
    count++;
  });

  // Calculate the average sleep time
  const averageSleepTime = totalSleepTime / count;
  return averageSleepTime;
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
          const averageWakeUp = calculateAverageWakeUpTime(userDataArray);
          const averageSleep = calculateAverageSleepTime(userDataArray);
          saveAverageTimes(userId, averageWakeUp.toFixed(2), averageSleep.toFixed(2));
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
          <div>
            Average Wake Up Time: {convertMilitaryTimeToString(calculateAverageWakeUpTime(userData))}
          </div>
          <div>
            Average Sleep Time: {convertMilitaryTimeToString(calculateAverageSleepTime(userData))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default StudentDashboard;