import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios

function AddTableForm({ setActiveAction }) {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // sending data to your backend
      const response = await axios.post('http://192.168.29.132:5000/api/tables', {
        name,
        capacity: parseInt(capacity),
      });

      setMessage('Table added successfully!');
      setName('');
      setCapacity('');
      setTimeout(() => {
        setActiveAction(null); // hiding the form and show buttons again after a success
      }, 2000); // Wait for 2 seconds before hiding the form
    } catch (error) {
      console.error('Error adding table:', error);
      setMessage(error.response?.data?.message || 'Failed to add table');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setName('');
    setCapacity('');
    setMessage('');
    setActiveAction(null); // Hide the form and show buttons again when canceled
  };

  return (
    <div className='flex justify-center items-center mt-0 lg:mt-36'>
      <div className='dark:bg-darkmode-hover w-full h-full lg:h-auto lg:w-2/3 bg-lightmode-hover md:rounded-xl'>
        <div className='flex justify-center font-bold text-3xl items-center pt-3'>
          Add Table
        </div>
        <div className='flex justify-center items-center'>
          <form onSubmit={handleSubmit} className='flex justify-center items-center w-2/3'>
            <input type="hidden" name="id" />
            <div className='mt-5'>
              <label htmlFor="name">Name </label>
              <br />
              <input
                type="text"
                placeholder='Enter table name'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='h-8 w-56 rounded-md dark:bg-darkmode-components border dark:hover:bg-darkmode-hover'
              />
              <br />
              <div className="mt-5"></div>
              <label htmlFor="capacity">Table Capacity </label>
              <br />
              <input
                type="number"
                placeholder='Enter table capacity'
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
                  disabled={loading}
                  className='border border-gray-500 dark:border-white rounded-md h-8 w-24 mr-8 duration-200 dark:hover:bg-darkmode-components hover:bg-lightmode-component'
                >
                  {loading ? 'Saving...' : 'Add Table'}
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

export default AddTableForm;
