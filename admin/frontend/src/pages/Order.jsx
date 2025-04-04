import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Order() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get('http://localhost:5000/api/categories');
        setCategories(categoriesResponse.data);
        
        // Fetch items
        const itemsResponse = await axios.get('http://localhost:5000/api/items');
        setItems(itemsResponse.data);
        
        // Initialize quantities for all items
        const initialQuantities = {};
        itemsResponse.data.forEach(item => {
          initialQuantities[item._id || item.id] = 1;
        });
        setQuantities(initialQuantities);
        
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

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000); // Hide toast after 3 seconds
  };

  // Update item quantity
  const updateQuantity = (itemId, delta) => {
    setQuantities(prev => {
      const newValue = Math.max(1, (prev[itemId] || 1) + delta);
      return { ...prev, [itemId]: newValue };
    });
  };

  // Group items by category
  const getItemsByCategory = (categoryId) => {
    return items.filter(item => {
      return (
        item.category === categoryId ||
        (item.category && item.category._id === categoryId) ||
        (item.category && item.category.id === categoryId) ||
        item.categoryId === categoryId ||
        item.category_id === categoryId
      );
    });
  };

  const orderSubmit = async (item) => {
    try {
      // Get the table name from the URL path
      const tableName = window.location.pathname.split('/').pop();
      
      // Find table ID by name first
      const tablesResponse = await axios.get('http://localhost:5000/api/tables');
      const table = tablesResponse.data.find(t => t.name === tableName);
      
      if (!table) {
        console.error("Table not found");
        showToast("Table not found", "error");
        return;
      }
      
      const tableId = table._id;
      const itemId = item._id || item.id;
      const quantity = quantities[itemId] || 1;
      
      // Submit the order for this table
      const response = await axios.post(`http://localhost:5000/api/tables/${tableId}/order`, {
        items: [{
          item: itemId,
          quantity: quantity,
          price: item.price
        }]
      });
      
      console.log("Order submitted successfully:", response.data);
      showToast(`Added ${quantity} ${item.name} to table ${table.name}`);
      
    } catch (error) {
      console.error("Error submitting order:", error);
      showToast("Failed to place order", "error");
    }
  };
  
  if (loading) {
    return <div className="p-4 text-center">Loading items...</div>;
  }

  return (
    <div className="dark:border-0 flex justify-center items-center min-h-screen">
      {/* Toast notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg ${
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {toast.message}
        </div>
      )}
      
      <div className='md:h-[80vh] h-screen bg-lightmode dark:bg-darkmode-components md:rounded-2xl rounded-none 
        dark:border-0 dark:text-darkmode shadow-2xl 
        md:w-full lg:w-5/6 w-screen md:mb-5
        overflow-y-auto'>
        <div className="container mx-auto p-4">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          
          {categories.length === 0 ? (
            <div className="text-center p-4 bg-gray-100 rounded">No categories available</div>
          ) : (
            categories.map((category) => {
              const categoryItems = getItemsByCategory(category._id || category.id);
              if (categoryItems.length === 0) {
                return null;
              }
              
              return (
                <div key={category._id || category.id} className="mb-8">
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b">{category.name}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryItems.map((item) => {
                      const itemId = item._id || item.id;
                      const quantity = quantities[itemId] || 1;
                      
                      return (
                        <div key={itemId} className="border rounded p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-lg">{item.name}</h3>
                            <div className="font-bold">₹{item.price?.toFixed(2) || 'N/A'}</div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border rounded">
                              <button 
                                onClick={() => updateQuantity(itemId, -1)}
                                className="px-3 py-1 border-r"
                              >
                                -
                              </button>
                              <span className="px-3 py-1">{quantity}</span>
                              <button 
                                onClick={() => updateQuantity(itemId, 1)}
                                className="px-3 py-1 border-l"
                              >
                                +
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => orderSubmit(item)} 
                              className='border border-red-500 rounded-md px-3 py-1 hover:bg-red-500 hover:text-white duration-200'
                            >
                              Add to Order
                            </button>
                          </div>
                        </div>
                      );
                    })}
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

export default Order;