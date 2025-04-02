import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddItemForm({ setActiveAction }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !price || !category) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/items', {
        name,
        price: Number(price),
        category
      });
      
      toast.success('Item added successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      
      // Reset form fields
      setName('');
      setPrice('');
      setCategory('');
      
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error(error.response?.data?.message || 'Failed to add item', {
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
    setPrice('');
    setCategory('');
  };

  return (
    <div className='flex justify-center items-center mt-0 lg:mt-36'>
      <div className='dark:bg-darkmode-hover w-full h-full lg:h-auto lg:w-2/3 bg-lightmode-hover md:rounded-xl'>
        <div className='flex justify-center font-bold text-3xl items-center pt-3'>
          Add Item
        </div>
        <div className='flex justify-center items-center'>
          <form onSubmit={handleSubmit} className='flex justify-center items-center w-2/3'>
            <div className='mt-5'>
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                placeholder='Enter item name'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='h-8 w-56 rounded-md dark:bg-darkmode-components border dark:hover:bg-darkmode-hover'
              />
              <br />
              
              <label htmlFor="price">Price</label>
              <br />
              <input
                type="number"
                placeholder='Enter price'
                id='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                className='h-8 w-56 rounded-md dark:bg-darkmode-components border dark:hover:bg-darkmode-hover'
              />
              <br />
              
              <label htmlFor="category">Category</label>
              <br />
              <select
                id='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='h-8 w-56 rounded-md dark:bg-darkmode-components border dark:hover:bg-darkmode-hover'
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <br />
              
              <div className="flex justify-center items-center my-5">
                <button
                  type="submit"
                  disabled={loading}
                  className='border border-gray-500 dark:border-white rounded-md h-8 w-24 mr-8 duration-200 dark:hover:bg-darkmode-components hover:bg-lightmode-component'
                >
                  {loading ? 'Saving...' : 'Add'}
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

export default AddItemForm;