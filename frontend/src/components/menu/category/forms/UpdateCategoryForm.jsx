import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateCategoryForm({ setActiveAction }) {
  const [currentName, setCurrentName] = useState('');
  const [newName, setNewName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories', { position: 'top-right' });
      } finally {
        setFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentName) {
      toast.error('Please select a category to update', { position: 'top-right' });
      return;
    }

    setLoading(true);

    try {
      await axios.put('http://localhost:5000/api/categories', {
        currentName,
        newName: newName || currentName, // If new name is empty, keep the same name
      });

      toast.success('Category updated successfully!', { position: 'top-right' });

      // Update category list after renaming
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.name === currentName ? { ...category, name: newName || currentName } : category
        )
      );

      setCurrentName('');
      setNewName('');

      setTimeout(() => {
        setActiveAction(null);
      }, 2000);
    } catch (error) {
      console.error('Error updating category:', error);
      const errorMsg = error.response?.data?.message || 'Failed to update category';
      toast.error(errorMsg, { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setCurrentName('');
    setNewName('');
    setActiveAction(null);
  };

  return (
    <div className="flex justify-center items-center mt-0 lg:mt-20">
      <div className="dark:bg-darkmode-hover w-full h-full lg:h-auto lg:w-2/3 bg-lightmode-hover md:rounded-xl">
        <div className="flex justify-center font-bold text-3xl items-center pt-3">
          Update Category
        </div>
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit} className="flex justify-center items-center w-2/3">
            <div className="mt-5">
              <label htmlFor="name">Select Category to Update</label>
              <br />
              {fetchingCategories ? (
                <p>Loading Categories...</p>
              ) : (
                <select
                  id="name"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
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
              <div className="mt-5"></div>
              <label htmlFor="newName">New Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter new category name"
                id="newName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-8 w-56 rounded-md dark:bg-darkmode-components border dark:hover:bg-darkmode-hover"
              />
              <br />

              <div className="flex justify-center items-center my-5">
                <button
                  type="submit"
                  disabled={loading || !currentName}
                  className="border border-gray-500 dark:border-white rounded-md h-8 w-24 mr-8 duration-200 dark:hover:bg-darkmode-components hover:bg-lightmode-component disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update'}
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

export default UpdateCategoryForm;
