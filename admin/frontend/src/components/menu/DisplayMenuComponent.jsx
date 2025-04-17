import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DarkModeToggle from '../common/DarkModeToggle';

function DisplayMenu() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get('http://localhost:5000/api/categories');
        setCategories(categoriesResponse.data);
        
        // Fetch items
        const itemsResponse = await axios.get('http://localhost:5000/api/items');
        setItems(itemsResponse.data);
        
        // Debug: Log the first item to see its structure
        if (itemsResponse.data.length > 0) {
          console.log("Sample item structure:", itemsResponse.data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load menu data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Group items by category
  const getItemsByCategory = (categoryId) => {
    // Debug log to examine data
    console.log(`Filtering for category ID: ${categoryId}`);
    console.log(`Available category IDs in items:`, items.map(item => item.category));
    
    // Filter items that belong to this specific category
    return items.filter(item => {
      // Check which property holds the category information
      // Assuming the category is either stored directly as 'category' or as a reference 'categoryId'
      return (
        // Direct match (if category is stored as a string or number)
        item.category === categoryId ||
        // Match by ID (if category is stored as an object with an ID)
        (item.category && item.category._id === categoryId) ||
        // Match by string ID
        (item.category && item.category.id === categoryId) ||
        // Match by categoryId field
        item.categoryId === categoryId ||
        // Match by category_id field (snake case)
        item.category_id === categoryId
      );
    });
  };

  if (loading) {
    return <div className="p-4 text-center">Loading items...</div>;
  }
  
  return (
    
    <div className="dark:border-0 flex"><title>Display Menu</title>
      <div className='md:h-[80vh] h-screen bg-lightmode dark:bg-darkmode-components md:rounded-2xl rounded-none 
        dark:border-0 dark:text-darkmode shadow-2xl
        md:w-full sm:w-screen w-screen md:mb-5
        overflow-y-auto'>
        <div className="container mx-auto p-4">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          
          {categories.length === 0 ? (
            <div className="text-center p-4 bg-gray-100 rounded">No categories available</div>
          ) : (
            categories.map((category) => {
              // Get only items for this specific category
              const categoryItems = getItemsByCategory(category._id || category.id);
              
              // Skip categories with no items
              if (categoryItems.length === 0) {
                return null;
              }
              
              return (
                <div key={category._id || category.id} className="mb-8">
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b">{category.name}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryItems.map((item) => (
                      <div key={item._id || item.id} className="border rounded p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <div className="font-bold">₹{item.price?.toFixed(2) || 'N/A'}</div>
                        </div>
                        {item.description && (
                          <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }).filter(Boolean) // Remove null entries from empty categories
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayMenu;