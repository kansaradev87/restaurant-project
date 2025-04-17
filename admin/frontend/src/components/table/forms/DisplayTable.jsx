import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayTable() {
  const [tables, setTables] = useState([]);
  const [fetchingTables, setFetchingTables] = useState(true);
  const [message, setMessage] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]); // Store all items for reference
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        // First fetch all menu items to have a reference for names
        const itemsResponse = await axios.get('http://localhost:5000/api/items');
        setItems(itemsResponse.data);
        
        // Then fetch tables with their order information
        const tablesResponse = await axios.get('http://localhost:5000/api/tables');
        setTables(tablesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to load tables or items data');
      } finally {
        setFetchingTables(false);
      }
    };

    fetchTables();
    
    // Refresh tables data every 30 seconds to keep orders updated
    const intervalId = setInterval(fetchTables, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleTableClick = (table) => {
    setSelectedTable(table);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTable(null);
  };

  // Function to get item name by ID
  const getItemName = (itemId) => {
    const item = items.find(item => (item._id === itemId || item.id === itemId));
    return item ? item.name : `Item #${itemId}`;
  };

  // Function to handle payment process
  const handlePayment = async () => {
    if (!selectedTable || !selectedTable._id || selectedTable.orders.length === 0) {
      setMessage('No orders to process payment');
      return;
    }

    setProcessingPayment(true);
    
    try {
      // Call the API endpoint to process payment
      const response = await axios.post('http://localhost:5000/api/revenue/process-payment', {
        tableId: selectedTable._id,
        orders: selectedTable.orders,
        total: selectedTable.orders.reduce((sum, order) => sum + (order.price * order.quantity), 0).toFixed(2)
      });
      
      // Update the local state to reflect the changes
      setTables(prevTables => 
        prevTables.map(table => 
          table._id === selectedTable._id 
          ? {...table, orders: [], status: 'Available'} 
          : table
        )
      );
      
      // Update selected table
      setSelectedTable({...selectedTable, orders: [], status: 'Available'});
      
      setMessage('Payment processed successfully');
      
      // Close modal after 2 seconds
      setTimeout(() => {
        closeModal();
        setMessage('');
      }, 2000);
      
    } catch (error) {
      console.error('Error processing payment:', error);
      setMessage('Failed to process payment. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  // Display loading message or tables based on the fetching state
  if (fetchingTables) {
    return <div className="flex justify-center items-center min-h-screen">Loading tables...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {message && <div className={`p-4 rounded mb-4 ${message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>}
      
      <h1 className="text-2xl font-bold mb-6">Restaurant Tables</h1>
      
      {tables.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">No tables available</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {tables.map((table) => (
            <button
              onClick={() => handleTableClick(table)}
              className={`flex justify-center items-center rounded-md
                w-full max-w-[9rem] sm:max-w-[11rem] h-24 sm:h-28 md:h-32 lg:h-36
                mx-auto my-2 sm:my-3 md:my-4
                dark:text-white font-medium
                transition-colors duration-200
                ${table.status === "Available" ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}
                ${table.orders && table.orders.length > 0 ? 'ring-2 ring-blue-400' : ''}`}
              key={table._id}
            >
              <div className="text-center px-2">
                <p className="font-bold text-xs sm:text-sm md:text-base">Table: {table.name}</p>
                <p className="text-xs sm:text-sm mt-1">Capacity: {table.capacity}</p>
                <p className="text-xs sm:text-sm mt-1 font-semibold">
                  {table.status === 'Available' ? 'Available' : 'Occupied'}
                </p>
                {table.orders && table.orders.length > 0 && (
                  <p className="text-xs bg-blue-600 text-white px-2 py-1 rounded mt-1">
                    {table.orders.length} orders
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Modal for Table Details */}
      {showModal && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold dark:text-white">Table: {selectedTable.name}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <p className="dark:text-white mb-2">
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-2 ${selectedTable.status === "Available" ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {selectedTable.status}
                  </span>
                </p>
                <p className="dark:text-white"><span className="font-medium">Capacity:</span> {selectedTable.capacity}</p>
                <p className="dark:text-white"><span className="font-medium">Created:</span> {new Date(selectedTable.createdAt).toLocaleString()}</p>
              </div>
              
              {/* QR Code */}
              <div className="mb-6">
                <h3 className="font-bold mb-2 dark:text-white">QR Code</h3>
                <div className="flex justify-center bg-white p-4 rounded-lg">
                  {selectedTable.qrCode ? (
                    <img src={selectedTable.qrCode} alt="Table QR Code" className="max-w-full h-auto" />
                  ) : (
                    <p>QR Code not available</p>
                  )}
                </div>
              </div>
              
              {/* Orders Section */}
              <div>
                <h3 className="font-bold mb-2 dark:text-white">Orders</h3>
                {selectedTable.orders && selectedTable.orders.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Qty</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {selectedTable.orders.map((order, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                              {order.item && typeof order.item === 'object' 
                                ? order.item.name 
                                : getItemName(order.item)}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{order.quantity}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">₹{order.price?.toFixed(2) || '0.00'}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <td colSpan="2" className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">Total</td>
                          <td className="px-4 py-2 text-sm font-bold text-gray-900 dark:text-white">
                            ₹{selectedTable.orders.reduce((sum, order) => sum + (order.price * order.quantity), 0).toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No orders for this table</p>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                {selectedTable.orders && selectedTable.orders.length > 0 && (
                  <button
                    onClick={handlePayment}
                    disabled={processingPayment}
                    className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors duration-200 ${processingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {processingPayment ? 'Processing...' : 'Process Payment'}
                  </button>
                )}
                <button
                  onClick={closeModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayTable;