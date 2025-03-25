import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios

function UpdateTableForm({ setActiveAction }) {
  const [currentName, setCurrentName] = useState('');
  const [newName, setNewName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingTables, setFetchingTables] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch tables when component mounts
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://192.168.29.132:5000/api/tables');
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
        setMessage('Failed to load tables');
      } finally {
        setFetchingTables(false);
      }
    };

    fetchTables();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentName) {
      setMessage('Please select a table to update');
      return;
    }
    
    setLoading(true);

    try {
      // sending data to your backend for updating a table
      const response = await axios.put('http://192.168.29.132:5000/api/tables', {
        currentName,
        newName: newName || currentName,
        capacity: capacity ? parseInt(capacity) : undefined,
      });

      setMessage('Table updated successfully!');
      setCurrentName('');
      setNewName('');
      setCapacity('');
      setTimeout(() => {
        setActiveAction(null); // hiding the form and show buttons again after a success
      }, 2000); // Wait for 2 seconds before hiding the form
    } catch (error) {
      console.error('Error updating table:', error);
      setMessage(error.response?.data?.message || 'Failed to update table');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setCurrentName('');
    setNewName('');
    setCapacity('');
    setMessage('');
    setActiveAction(null); // Hide the form and show buttons again when canceled
  };

  return (
    <div className='flex justify-center items-center mt-0 lg:mt-20'>
      <div className='dark:bg-darkmode-hover w-full h-full lg:h-auto lg:w-2/3 bg-lightmode-hover md:rounded-xl'>
        <div className='flex justify-center font-bold text-3xl items-center pt-3'>
          Update Table
        </div>
        <div className='flex justify-center items-center'>
          <form onSubmit={handleSubmit} className='flex justify-center items-center w-2/3'>
            <div className='mt-5'>
              <label htmlFor="name">Select Table to Update</label>
              <br />
              {fetchingTables ? (
                <p>Loading tables...</p>
              ) : (
                <select
                  id='name'
                  value={currentName}
                  onChange={(e) => {
                    setCurrentName(e.target.value);
                    // Optionally pre-fill current values
                    const selectedTable = tables.find(table => table.name === e.target.value);
                    if (selectedTable) {
                      setCapacity(selectedTable.capacity.toString());
                    }
                  }}
                  className='h-8 w-56 rounded-md dark:bg-darkmode-components border dark:hover:bg-darkmode-hover'
                >
                  <option value="">-- Select a table --</option>
                  {tables.map(table => (
                    <option key={table._id} value={table.name}>
                      {table.name} (Capacity: {table.capacity})
                    </option>
                  ))}
                </select>
              )}
              <br />
              <div className="mt-5"></div>
              <label htmlFor="newName">New Name (Optional)</label>
              <br />
              <input
                type="text"
                placeholder='Enter new table name'
                id='newName'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className='h-8 w-56 rounded-md dark:bg-darkmode-components border dark:hover:bg-darkmode-hover'
              />
              <br />
              <div className="mt-5"></div>
              <label htmlFor="capacity">New Table Capacity</label>
              <br />
              <input
                type="number"
                placeholder='Enter new table capacity'
                id='capacity'
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className='h-8 w-56 rounded-md dark:bg-darkmode-components border dark:hover:bg-darkmode-hover'
              />
              <br />
              {message && (
                <div
                  className={`mt-3 text-center ${
                    message.includes('Failed') || message.includes('Error') ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {message}
                </div>
              )}
              <div className="flex justify-center items-center my-5">
                <button
                  type="submit"
                  disabled={loading || !currentName}
                  className='border border-gray-500 dark:border-white rounded-md h-8 w-24 mr-8 duration-200 dark:hover:bg-darkmode-components hover:bg-lightmode-component disabled:opacity-50'
                >
                  {loading ? 'Updating...' : 'Update'}
                </button>
                <button
                  onClick={handleCancel}
                  className='border rounded-md h-8 w-24 border-red-600 hover:bg-red-600 hover:text-lightmode duration-200'
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTableForm;