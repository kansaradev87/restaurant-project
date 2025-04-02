import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteItemForm() {
  const [name, setName] = useState('');
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
    
    if (!name || !category) {
      toast.error('Please provide both name and category');
      return;
    }
    
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/items/${name}/${category}`);
      
      toast.success('Item deleted successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
      
      setName('');
      setCategory('');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error(error.response?.data?.message || 'Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center mt-10'>
      <div className='dark:bg-darkmode-hover w-full lg:w-2/3 bg-lightmode-hover md:rounded-xl p-5'>
        <h2 className='text-center text-2xl font-bold'>Delete Item</h2>
        <form onSubmit={handleSubmit} className='flex flex-col items-center mt-5'>
          <label htmlFor='name'>Item Name</label>
          <input
            type='text'
            id='name'
            placeholder='Enter item name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='h-8 w-56 rounded-md border dark:bg-darkmode-components'
          />

          <label htmlFor='category' className='mt-3'>Category</label>
          <select
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='h-8 w-56 rounded-md border dark:bg-darkmode-components'
          >
            <option value=''>Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          <div className='flex justify-center items-center mt-5'>
            <button
              type='submit'
              disabled={loading}
              className='border rounded-md h-8 w-24 mr-4 dark:hover:bg-darkmode-components hover:bg-lightmode-component'
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DeleteItemForm;
