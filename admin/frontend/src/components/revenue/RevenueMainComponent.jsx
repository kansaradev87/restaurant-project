import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

function RevenueMainComponent() {
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#06b6d4', '#0ea5e9'];

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/revenue/range`);
      if (response.data && Array.isArray(response.data.data)) {
        const data = response.data.data;
        processRevenueData(data);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (err) {
      console.error('Error fetching revenue data:', err);
      setError('Error fetching data from server.');
    } finally {
      setLoading(false);
    }
  };

  const processRevenueData = (data) => {
    setRevenues(data);
    const total = data.reduce((sum, rev) => sum + (rev.total || 0), 0);
    setTotalRevenue(total);
    processChartData(data);
  };

  const processChartData = (data) => {
    const dailyMap = {};
    const itemsMap = {};

    data.forEach(revenue => {
      if (revenue.paymentDate) {
        const date = revenue.paymentDate.split('T')[0];
        dailyMap[date] = (dailyMap[date] || 0) + (revenue.total || 0);
      }
      if (revenue.orders && Array.isArray(revenue.orders)) {
        revenue.orders.forEach(order => {
          if (order.itemName) {
            itemsMap[order.itemName] = (itemsMap[order.itemName] || 0) + 
              ((order.price || 0) * (order.quantity || 0));
          }
        });
      }
    });

    const dailyChartData = Object.entries(dailyMap)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const categoryChartData = Object.entries(itemsMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    setChartData(dailyChartData);
    setCategoryData(categoryChartData);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return dateString;
    }
  };

  const formatXAxis = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="dark:border-0 flex w-full">
      <div className="md:h-[80vh] h-screen bg-lightmode dark:bg-darkmode-components md:rounded-2xl w-full shadow-2xl overflow-auto">
        <div className="p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Revenue Dashboard</h1>

          {error && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 p-4 rounded-xl mb-4">
              <p>{error}</p>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="border rounded-xl p-5">
              <p className="text-gray-600 dark:text-gray-300 mb-2">Total Revenue</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{totalRevenue.toFixed(2)}</p>
            </div>
            <div className="border rounded-xl p-5">
              <p className="text-gray-600 dark:text-gray-300 mb-2">Transactions</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{revenues.length}</p>
            </div>
            <div className="border rounded-xl p-5">
              <p className="text-gray-600 dark:text-gray-300 mb-2">Average Per Transaction</p>
              <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                ₹{revenues.length > 0 ? (totalRevenue / revenues.length).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="border p-4 rounded-xl">
              <h2 className="text-lg font-semibold mb-4">Daily Revenue</h2>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" strokeOpacity={0.3} />
                    <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-gray-500">No chart data</div>
              )}
            </div>

            <div className="border p-4 rounded-xl">
              <h2 className="text-lg font-semibold mb-4">Revenue by Item</h2>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData.slice(0, 8)}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.slice(0, 8).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-gray-500">No item data</div>
              )}
            </div>
          </div>

          {/* Table of Transactions */}
          <div className="border p-4 rounded-xl mb-4">
            <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-darkmode-hover">
                  <tr>
                    <th className="p-3 text-left font-semibold">Table</th>
                    <th className="p-3 text-left font-semibold">Amount</th>
                    <th className="p-3 text-left font-semibold">Date</th>
                    <th className="p-3 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {revenues.map((rev, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">{rev.tableName || 'Unknown'}</td>
                      <td className="p-3 text-blue-600">₹{(rev.total || 0).toFixed(2)}</td>
                      <td className="p-3">{formatDate(rev.paymentDate)}</td>
                      <td className="p-3">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Paid</span>
                      </td>
                    </tr>
                  ))}
                  {revenues.length === 0 && !loading && (
                    <tr><td colSpan="4" className="text-center py-8 text-gray-500">No transactions found.</td></tr>
                  )}
                  {loading && (
                    <tr><td colSpan="4" className="text-center py-8 text-gray-500">Loading data...</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueMainComponent;
