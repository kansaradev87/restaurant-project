import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayTable() {
  const [tables, setTables] = useState([]); // Initialize tables state
  const [fetchingTables, setFetchingTables] = useState(true); // Track fetching state
  const [message, setMessage] = useState(''); // For error/success messages

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://192.168.29.132:5000/api/tables');
        setTables(response.data); // Set the fetched tables in state
      } catch (error) {
        console.error('Error fetching tables:', error);
        setMessage('Failed to load tables');
      } finally {
        setFetchingTables(false); // Set fetching state to false after request
      }
    };

    fetchTables();
  }, []);

  // Display loading message or tables based on the fetching state
  if (fetchingTables) {
    return <div>Loading tables...</div>;
  }

  return (
    <div>
      {message && <div className="error-message">{message}</div>} {/* Show error message if any */}
      {tables.length === 0 ? (
        <div>No tables available</div>
      ) : (
        <div className='grid grid-cols-2'>
          {tables.map((table) => (
            <div
            className={`flex justify-center items-center border w-44 rounded-md mt-4 ml-2 h-36 ${table.status="Available" ? 'bg-green-500' : 'bg-red-500'}`} // Conditionally set the background color
            key={table._id}
          >
              <div>
                <p>Table Name: {table.name}</p>
                <p>Capacity: {table.capacity}</p>
                <p>status: {table.status==='Available'?'Available':'Occupied'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DisplayTable;
