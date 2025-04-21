import { React, useState, useEffect } from 'react';
import DarkModeToggle from '../common/DarkModeToggle';
import TransactionTable from '../revenue/TransactionTable';
import axios from 'axios';
import DisplayTable from '../table/forms/DisplayTable';

function HomeMainComponent() {
  const [revenues, setRevenues] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return dateString;
    }
  };

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
  };

  return (
    <div className="dark:border-0 flex">
      <div
        className="md:h-[80vh] h-screen bg-lightmode dark:bg-darkmode-components md:rounded-2xl rounded-none 
        dark:border-0 dark:text-darkmode shadow-2xl md:w-full sm:w-screen w-screen md:mb-5"
      >
        

        {/* Made this div responsive */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 p-4">
          <div className="flex-1 w-full">
            <TransactionTable revenues={revenues} loading={loading} formatDate={formatDate} />
          </div>
          <div className="w-full lg:w-auto -mt-6">
            <DisplayTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeMainComponent;
