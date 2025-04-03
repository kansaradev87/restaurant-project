import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayTable() {
  const [tables, setTables] = useState([]); // Initialize tables state
  const [fetchingTables, setFetchingTables] = useState(true); // Track fetching state
  const [message, setMessage] = useState(''); // For error/success messages

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tables');
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
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5'>
          {tables.map((table) => (
            <button
            className={`flex justify-center items-center rounded-md
              w-full max-w-[9rem] sm:max-w-[11rem] h-24 sm:h-28 md:h-32 lg:h-36
              mx-auto my-2 sm:my-3 md:my-4
              dark:text-white font-medium
              transition-colors duration-200
              ${table.status === "Available" ? ' bg-green-500 hover:bg-green-600 text-white' : ' bg-red-500 hover:bg-red-600 text-white'}`}
            key={table._id}
          >
            <div className="text-center px-2">
              <p className="font-bold text-xs sm:text-sm md:text-base">Table: {table.name}</p>
              <p className="text-xs sm:text-sm mt-1">Capacity: {table.capacity}</p>
              <p className="text-xs sm:text-sm mt-1 font-semibold">
                {table.status === 'Available' ? 'Available' : 'Occupied'}
                <img src={table.qrCode} alt={table.name} />
              </p>
            </div>
          </button>
          
          ))}
        </div>
      )}
    </div>
  );
}

export default DisplayTable;
