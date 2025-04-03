import axios from 'axios';
import React, { useEffect, useState } from 'react';

function DisplayItem() {
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
    return items.filter(item => item.categoryId === categoryId);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading items...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      {categories.length === 0 ? (
        <div className="text-center p-4 bg-gray-100 rounded">No categories available</div>
      ) : (
        categories.map((category) => {
          const categoryItems = getItemsByCategory(category.id);
          
          return (
            <div key={category.id} className="mb-8">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b">{category.name}</h2>
              
              {categoryItems.length === 0 ? (
                <p className="text-gray-500 italic">No items in this category</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryItems.map((item) => (
                    <div key={item.id} className="border rounded p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <div className="font-bold">${item.price?.toFixed(2) || 'N/A'}</div>
                      </div>
                      {item.description && (
                        <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default DisplayItem;