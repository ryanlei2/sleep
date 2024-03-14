import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { Button, ListGroup, Table } from 'react-bootstrap';

interface FeedbackData {
  id: string;
  data: {
    wakingTime: string;
    sleepingTime: string;
    timestamp: string;
    userId: string;
  };
}

function AdminDashboard() {
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'userData'), (snapshot) => {
      const feedbackData: FeedbackData[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const feedbackItem: FeedbackData = {
          id: doc.id,
          data: {
            wakingTime: data.wakingTime,
            sleepingTime: data.sleepingTime,
            timestamp: data.timestamp,
            userId: data.userId
          }
        };
        feedbackData.push(feedbackItem);
      });
      setFeedbackData(feedbackData);
    });
  
    return () => unsubscribe();
  }, []);
  

  
  
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'userFeedback', id));
      setFeedbackData(prevState => prevState.filter(feedback => feedback.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  return (
    <div
      style={{
        fontSize: '2rem',
        marginLeft: '90px',
        marginTop: '50px'
      }}
    >
      <h1 className='display-1' style={{ fontWeight: 'bolder' }}>Admin Dashboard</h1>
      <h3 className='display-2' style={{ marginTop: '30px', marginBottom: '30px' }}>Child Data</h3>
      
      {/* Iterate over feedbackData array and render table for each user */}
      <ul>
  {feedbackData.map((feedbackItem) => (
    <li
      key={feedbackItem.id}
      style={{
        border: '4px solid gray',
        boxShadow: '10px 10px 8px #888888',
        padding: '10px',
        listStyleType: 'none',
        marginBottom: '40px'
      }}
    >
      <p>UserID: {feedbackItem.data.userId}</p>
      <p>Date: {new Date(feedbackItem.data.timestamp.seconds * 1000).toLocaleString()}</p>
      <p>Waking Time: {feedbackItem.data.wakingTime}</p>
      <p>Sleeping Time: {feedbackItem.data.sleepingTime}</p>
      <Button onClick={() => handleDelete(feedbackItem.id)}>Delete</Button>
      <br></br><br></br>
    </li>
  ))}
</ul>

    </div>
  );
}

export default AdminDashboard;
