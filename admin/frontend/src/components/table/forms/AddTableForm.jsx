import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

function AddTableForm({ setActiveAction }) {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/tables', {
        name,
        capacity: parseInt(capacity),
      });

      toast.success('Table added successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light', // or 'dark'
      });

      setMessage('Table added successfully!');
      setName('');
      setCapacity('');
      setTimeout(() => {
        setActiveAction(null);
      }, 2000);
    } catch (error) {
      console.error('Error adding table:', error);
      setMessage(error.response?.data?.message || 'Failed to add table');
      toast.error(error.response?.data?.message || 'Failed to add table', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setName('');
    setCapacity('');
    setMessage('');
    setActiveAction(null);
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
      <ToastContainer />
    </div>
  );
}

export default AddTableForm;