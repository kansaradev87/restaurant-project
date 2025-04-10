// Order.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DarkModeToggle from '../components/common/DarkModeToggle';

function Order() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [activeCategory, setActiveCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get('http://localhost:5000/api/categories');
        setCategories(categoriesResponse.data);
        
        if (categoriesResponse.data.length > 0) {
          setActiveCategory(categoriesResponse.data[0]._id || categoriesResponse.data[0].id);
        }
        
        // Fetch items
        const itemsResponse = await axios.get('http://localhost:5000/api/items');
        setItems(itemsResponse.data);
        
        // Initialize quantities for all items - start with 1
        const initialQuantities = {};
        itemsResponse.data.forEach(item => {
          initialQuantities[item._id || item.id] = 1;
        });
        setQuantities(initialQuantities);
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

  // Update item quantity in the menu
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

  // Add item to cart - fixed to ensure it always adds only the specified quantity
  const addToCart = (item) => {
    const itemId = item._id || item.id;
    const itemQuantity = quantities[itemId] || 1; // Get current selection quantity
    
    setCart(prevCart => {
      // Check if the item is already in the cart
      const existingItemIndex = prevCart.findIndex(
        cartItem => (cartItem.item._id || cartItem.item.id) === itemId
      );
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity with exactly the selected amount
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += itemQuantity; // Add exactly the selected quantity
        showToast(`Added ${itemQuantity} ${item.name} to cart (${updatedCart[existingItemIndex].quantity} total)`);
        return updatedCart;
      } else {
        // Item doesn't exist, add it with exactly the selected quantity
        showToast(`Added ${itemQuantity} ${item.name} to cart`);
        return [...prevCart, { 
          item: item,
          quantity: itemQuantity, // Use exactly the selected quantity
          price: item.price
        }];
      }
    });
    
    // Reset the quantity selector back to 1 after adding to cart
    setQuantities(prev => ({
      ...prev,
      [itemId]: 1
    }));
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      const removedItem = newCart.splice(index, 1)[0];
      showToast(`Removed ${removedItem.item.name} from cart`, "info");
      return newCart;
    });
  };

  // Update quantity in cart - direct value assignment instead of increment
  const updateCartQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart[index].quantity = newQuantity; // Set to exact value
      return newCart;
    });
  };

  // Submit the entire order
  const submitOrder = async () => {
    if (cart.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }
    
    try {
      // Get the table name from the URL path
      const tableName = window.location.pathname.split('/').pop();
      
      // Find table ID by name first
      const tablesResponse = await axios.get('http://localhost:5000/api/tables');
      const table = tablesResponse.data.find(t => t.name === tableName);
      
      if (!table) {
        showToast("Table not found", "error");
        return;
      }
      
      const tableId = table._id;
      
      // Format cart items for the API
      const orderItems = cart.map(cartItem => ({
        item: cartItem.item._id || cartItem.item.id,
        quantity: cartItem.quantity,
        price: cartItem.price
      }));
      
      // Submit the order for this table
      const response = await axios.post(`http://localhost:5000/api/tables/${tableId}/order`, {
        items: orderItems
      });
      
      showToast(`Order placed successfully for table ${table.name}`);
      setCart([]); // Clear cart after successful order
      setCartVisible(false); // Hide cart after order
      
    } catch (error) {
      console.error("Error submitting order:", error);
      showToast("Failed to place order", "error");
    }
  };
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0).toFixed(2);

  // Get total number of items in cart (for badge)
  const cartItemCount = cart.reduce((total, item) => total + 1, 0);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen relative">
      {/* Toast notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center ${
          toast.type === 'error' ? 'bg-red-500 text-white' : 
          toast.type === 'info' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
        } transform transition-transform duration-300 ease-in-out`}>
          <span className="mr-2">
            {toast.type === 'error' ? '❌' : toast.type === 'info' ? 'ℹ️' : '✅'}
          </span>
          {toast.message}
        </div>
      )}
      
      {/* Cart button (fixed) */}
      <div className="fixed bottom-4 right-4 z-40">
        <button 
          onClick={() => setCartVisible(!cartVisible)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center relative"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
      
      {/* Cart overlay */}
      {cartVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-end">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full flex flex-col shadow-xl overflow-hidden">
            <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
              <h2 className="text-lg font-bold">Your Order</h2>
              <button onClick={() => setCartVisible(false)} className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                  <button 
                    onClick={() => setCartVisible(false)}
                    className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Order Now
                  </button>
                </div>
              ) : (
                <div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cart.map((item, index) => (
                      <div key={index} className="py-4 flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 dark:text-white">{item.item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">₹{item.price.toFixed(2)} each</p>
                        </div>
                        
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateCartQuantity(index, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                            </svg>
                          </button>
                          <span className="mx-2 w-8 text-center dark:text-gray-300">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(index, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                          </button>
                          
                          <button 
                            onClick={() => removeFromCart(index)}
                            className="ml-4 p-1 text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-gray-800 dark:text-white">Total</span>
                  <span className="font-bold text-gray-800 dark:text-white">₹{cartTotal}</span>
                </div>
                <button 
                  onClick={submitOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium shadow-sm transition-colors"
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Menu</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-3 py-1 text-sm text-gray-600 dark:text-gray-300">
            Table: {window.location.pathname.split('/').pop()}
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center shadow-sm">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
            {error}
          </div>
        )}
        
        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="inline-flex space-x-1 pb-1">
            {categories.map((category) => (
              <button
                key={category._id || category.id}
                onClick={() => setActiveCategory(category._id || category.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap
                  ${activeCategory === (category._id || category.id) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
          
        {categories.length === 0 ? (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">No categories available</p>
          </div>
        ) : (
          categories.map((category) => {
            const categoryId = category._id || category.id;
            if (categoryId !== activeCategory) return null;
            
            const categoryItems = getItemsByCategory(categoryId);
            if (categoryItems.length === 0) {
              return (
                <div key={categoryId} className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-gray-500 dark:text-gray-400">No items in this category</p>
                </div>
              );
            }
            
            return (
              <div key={categoryId} className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">
                  {category.name}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryItems.map((item) => {
                    const itemId = item._id || item.id;
                    const quantity = quantities[itemId] || 1;
                    
                    return (
                      <div key={itemId} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{item.name}</h3>
                          <div className="font-bold text-blue-600 dark:text-blue-400">₹{item.price?.toFixed(2) || 'N/A'}</div>
                        </div>
                        
                        
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                            <button 
                              onClick={() => updateQuantity(itemId, -1)}
                              className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 py-2 font-medium dark:text-gray-300">{quantity}</span>
                            <button 
                              onClick={() => updateQuantity(itemId, 1)}
                              className="px-3 py-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <DarkModeToggle />
                          
                          <button 
                            onClick={() => addToCart(item)} 
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-colors"
                          >
                            <span className="mr-1">+</span> Add to Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Order;