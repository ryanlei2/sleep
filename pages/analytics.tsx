import React, { useEffect, useState } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { Container } from 'react-bootstrap';

function analytics() {
  const [averageWakeUpTime, setAverageWakeUpTime] = useState<string>('');
  const [averageSleepTime, setAverageSleepTime] = useState<string>('');

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const userAverageTimeRef = collection(db, 'userAverageTime');
      const q = query(userAverageTimeRef, where('userId', '==', userId));

      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setAverageWakeUpTime(data.avgWakeUpTime);
            console.log(averageWakeUpTime)
            setAverageSleepTime(data.avgSleepTime);
          });
        })
        .catch((error) => {
          console.error('Error getting average times:', error);
        });
    }
  }, []);

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
  
// Function to calculate cyclic sleep times
const calculateCyclicSleepTimes = (averageWakeUpTime: number, numCycles: number): string[] => {
    // Parse average wake-up time into hours and minutes
    const hours = Math.floor(averageWakeUpTime);
    const minutes = Math.round((averageWakeUpTime - hours) * 60);
    
    // Calculate wake-up hour and minute in 24-hour format
    let wakeUpHour = hours;
    let wakeUpMinute = minutes;
  
    // Adjust wake-up hour if it's past 12
    if (wakeUpHour > 12) {
      wakeUpHour -= 12;
    }
  
    // Convert wake-up hour to 24-hour format if it's after 12:00 PM
    if (hours >= 12) {
      wakeUpHour += 12;
    }
  
    // Calculate sleep time
    let sleepHour = wakeUpHour;
    let sleepMinute = wakeUpMinute - numCycles * 90; // Adjust sleep time based on cycles
  
    // Adjust sleep time if it's negative
    while (sleepMinute < 0) {
      sleepMinute += 60;
      sleepHour -= 1;
    }
  
    // Adjust sleep hour if it's negative
    while (sleepHour < 0) {
      sleepHour += 24;
    }
  
    // Convert sleep hour to 12-hour format
    let sleepHour12 = sleepHour;
    let ampm = 'PM';
    if (sleepHour12 >= 12) {
      ampm = 'AM';
      if (sleepHour12 > 12) {
        sleepHour12 -= 12;
      }
    }
  
    // Format sleep time
    const sleepTime = `${sleepHour12.toString().padStart(2, '0')}:${sleepMinute.toString().padStart(2, '0')} ${ampm}`;
    
    return [sleepTime];
};

  const averageWakeUpTimeValue = parseFloat(averageWakeUpTime);

  // Calculate cyclic sleep times for 6, 5, and 4 cycles
  const sleepTimes6 = calculateCyclicSleepTimes(averageWakeUpTimeValue, 6);
  const sleepTimes5 = calculateCyclicSleepTimes(averageWakeUpTimeValue, 5);
  const sleepTimes4 = calculateCyclicSleepTimes(averageWakeUpTimeValue, 4);

  return (
    <Container className='display-1' style={{ marginTop:'150px', textAlign:'center' }}>
      <div>
  <p>Average Wake Up Time: {convertMilitaryTimeToString(parseFloat(averageWakeUpTime))}</p>
  <p style={{ border: '2px solid green', padding: '5px' }}>Cyclic Sleep Times for 6 cycles: {sleepTimes6.join(', ')}</p>
  <p style={{ border: '2px solid orange', padding: '5px' }}>Cyclic Sleep Times for 5 cycles: {sleepTimes5.join(', ')}</p>
  <p style={{ border: '2px solid red', padding: '5px' }}>Cyclic Sleep Times for 4 cycles: {sleepTimes4.join(', ')}</p>
  {/* Other analytics components */}
</div>
{/* parseFloat(averageWakeUpTime) > 12 ? parseFloat(averageWakeUpTime)-12 + 'AM' : parseFloat(averageWakeUpTime) + 'PM' */}
    </Container>
    
  );
}

export default analytics;
