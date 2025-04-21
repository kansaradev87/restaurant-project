import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RevenueChart from './RevenueChart';
import TransactionTable from './TransactionTable';

function RevenueMainComponent() {
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const COLORS = ['#ff5733', '#33b5ff', '#ff8c00', '#00c853', '#ff4081', '#9c27b0'];

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
            itemsMap[order.itemName] = (itemsMap[order.itemName] || 0) + ((order.price || 0) * (order.quantity || 0));
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
          <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-lightmode">Revenue Dashboard</h1>
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
            <RevenueChart chartType="line" data={chartData} COLORS={COLORS} formatXAxis={formatXAxis} dataKey="revenue" name="Revenue" />
            <RevenueChart chartType="pie" data={categoryData} COLORS={COLORS} isPieChart />
          </div>

          {/* Transaction Table */}
          <TransactionTable revenues={revenues} loading={loading} formatDate={formatDate} />
        </div>
      </div>
    </div>
  );
}

export default RevenueMainComponent;
