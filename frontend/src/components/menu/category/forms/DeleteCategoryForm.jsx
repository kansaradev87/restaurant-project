import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteCategoryForm({ setActiveAction }) {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);


  // Fetch Categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error('Please select a category to delete', { position: 'top-right' });
      return;
    }

    setLoading(true);

    try {
      await axios.delete(`http://192.168.29.132:5000/api/categories/${name}`);

      toast.success('Category deleted successfully!', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
      setName('');

      // Refresh the categories list
      setCategories(categories.filter(category => category.name !== name));

      // Hide form after success
      setTimeout(() => {
        setActiveAction(null);
      }, 2000);
    } catch (error) {
      console.error('Error deleting category:', error);
      const errorMsg = error.response?.data?.message || 'Failed to delete category';
      
      console.error('Error deleting category:', error);
            toast.error(error.response?.data?.message || 'Failed to add category', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setName('');

    setActiveAction(null);
  };

  return (
    <div className="delete-form-container flex justify-center items-center mt-0 lg:mt-36 transition-all duration-300 ease-in-out">
      <div className="dark:bg-darkmode-hover w-full h-full lg:h-auto lg:w-2/3 bg-lightmode-hover md:rounded-xl">
        <div className="flex justify-center font-bold text-3xl items-center pt-3">
          Delete Category
        </div>
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit} className="flex justify-center items-center w-2/3">
            <div className="mt-5">
              <label htmlFor="name">Select Category to Delete</label>
              <br />
              {fetchingCategories ? (
                <p>Loading Categories...</p>
              ) : (
                <select
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-8 w-56 rounded-md dark:bg-darkmode-components border dark:hover:bg-darkmode-hover"
                >
                  <option value="">-- Select a category --</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
              <br />
              
              <div className="flex justify-center items-center my-5">
                <button
                  type="submit"
                  disabled={loading || !name}
                  className="border border-gray-500 dark:border-white rounded-md h-8 w-24 mr-8 duration-200 dark:hover:bg-darkmode-components hover:bg-lightmode-component disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={handleCancel}
                  className="border rounded-md h-8 w-24 border-red-600 hover:bg-red-600 hover:text-lightmode duration-200"
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

export default DeleteCategoryForm;
