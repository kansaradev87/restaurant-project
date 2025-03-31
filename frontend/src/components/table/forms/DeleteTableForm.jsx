import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteTableForm({ setActiveAction }) {
  const [name, setName] = useState('');
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingTables, setFetchingTables] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch tables when component mounts
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tables');
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
    
    if (!name) {
      setMessage('Please select a table to delete');
      return;
    }
    
    setLoading(true);

    try {
      // Send delete request to your backend
      const response = await axios.delete(`http://192.168.29.132:5000/api/tables/${name}`);

      setMessage('Table deleted successfully!');
      setName('');
      
      // Add a delay before returning to main page
      setTimeout(() => {
        setActiveAction(null); // Hide the form and show buttons again after success
      }, 2000);
    } catch (error) {
      console.error('Error deleting table:', error);
      setMessage(error.response?.data?.message || 'Failed to delete table');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setName('');
    setMessage('');
    
    // Add a subtle transition before hiding
    const formElement = document.querySelector('.delete-form-container');
    if (formElement) {
      formElement.classList.add('fade-out');
      
      // Wait for transition to complete before hiding
      setTimeout(() => {
        setActiveAction(null); // Hide the form and show buttons again when canceled
      }, 300); // Match this to your CSS transition time
    } else {
      setActiveAction(null);
    }
  };

  return (
    <div className='delete-form-container flex justify-center items-center mt-0 lg:mt-36 transition-all duration-300 ease-in-out'>
      <div className='dark:bg-darkmode-hover w-full h-full lg:h-auto lg:w-2/3 bg-lightmode-hover md:rounded-xl'>
        <div className='flex justify-center font-bold text-3xl items-center pt-3'>
          Delete Table
        </div>
        <div className='flex justify-center items-center'>
          <form onSubmit={handleSubmit} className='flex justify-center items-center w-2/3'>
            <div className='mt-5'>
              <label htmlFor="name">Select Table to Delete</label>
              <br />
              {fetchingTables ? (
                <p>Loading tables...</p>
              ) : (
                <select
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  disabled={loading || !name}
                  className='border  border-gray-500 dark:border-white rounded-md h-8 w-24 mr-8 duration-200 dark:hover:bg-darkmode-components hover:bg-lightmode-component disabled:opacity-50'
                >
                  {loading ? 'Deleting...' : 'Delete'}
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

export default DeleteTableForm;