import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayCategory() {
  const [Categories, setCategories] = useState([]); // Initialize Categories state
  const [fetchingCategories, setFetchingCategories] = useState(true); // Track fetching state
  const [message, setMessage] = useState(''); // For error/success messages

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data); // Set the fetched Categories in state
      } catch (error) {
        console.error('Error fetching Categories:', error);
        setMessage('Failed to load Categories');
      } finally {
        setFetchingCategories(false); // Set fetching state to false after request
      }
    };

    fetchCategories();
  }, []);

  // Display loading message or Categories based on the fetching state
  if (fetchingCategories) {
    return <div>Loading Categories...</div>;
  }

  return (
    <div>
  {message && <div className="error-message">{message}</div>} {/* Show error message if any */}
  {Categories.length === 0 ? (
    <div>No Categories available</div>
  ) : (
    <div className="flex justify-center items-center">
      <div className="border  dark:bg-darkmode-hover m-10 lg:w-auto w-full">
        <table className=''>
          <thead>
            <tr>
              <th className='text-3xl px-5'>Category Name</th> {/* ✅ Single header */}
            </tr>
          </thead>
          <tbody className='lg:w-auto w-full'>
            {Categories.map((category, index) => (
              <tr key={index} className='border dark:bg-darkmode-components lg:w-auto w-full'> {/* ✅ Each category gets its own <tr> */}
                <td className='lg:w-auto w-screen'>{category.name}</td> {/* ✅ Category name in its own row */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>

  );
}

export default DisplayCategory;
