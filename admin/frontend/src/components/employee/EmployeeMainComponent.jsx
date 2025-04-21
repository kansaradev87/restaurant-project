import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, ResponsiveContainer } from 'recharts';
import { Search, Plus, Edit2, Trash2, FileText } from 'lucide-react';

import axios from 'axios';

function EmployeeMainComponent() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'stats'

  // Form state for new employee
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    department: '',
    joinDate: '',
    salary: '',
    contact: '',
  });

  // Fetch employees data from API
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
      setFilteredEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  // Search filter
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  // Handlers for form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add employee handler
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/employees', newEmployee, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchEmployees(); // Refresh employee list
      setShowAddModal(false);
      setNewEmployee({
        name: '',
        role: '',
        department: '',
        joinDate: '',
        salary: '',
        contact: '',
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  // Edit employee handler
  const handleEditEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/employees/${currentEmployee._id}`, currentEmployee, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchEmployees(); // Refresh employee list
      setShowEditModal(false);
      setCurrentEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  // Delete employee handler
  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to remove this employee?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/employees/${id}`);

        fetchEmployees(); // Refresh employee list
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="dark:border-0 flex">
  <div className="md:h-[80vh] h-screen bg-lightmode dark:bg-darkmode-components md:rounded-2xl rounded-none 
    w-full dark:border-0 dark:text-darkmode shadow-2xl overflow-auto
    md:w-full sm:w-full md:mb-5 p-4">
    
    <div className="mb-6">
      <h1 className="text-2xl font-bold dark:text-darkmode">Employee Management</h1>
    </div>
    
    {/* Controls Bar */}
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-500 dark:text-darkmode" />
        </div>
        <input 
          type="text" 
          className="pl-10 pr-4 py-2 w-full border border-lightmode dark:border-darkmode rounded-md bg-white dark:bg-darkmode-bg 
                    text-gray-900 dark:text-darkmode focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <button 
          className={`px-4 py-2 rounded-md ${viewMode === 'list' 
            ? 'bg-blue-600 text-darkmode' 
            : 'bg-lightmode-component dark:bg-darkmode-bg text-gray-800 dark:text-darkmode'}`}
          onClick={() => setViewMode('list')}
        >
          <FileText size={18} className="inline mr-1" />
          List
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${viewMode === 'stats' 
            ? 'bg-blue-600 text-darkmode' 
            : 'bg-lightmode-component dark:bg-darkmode-bg text-gray-800 dark:text-darkmode'}`}
          onClick={() => setViewMode('stats')}
        >
          <div className="flex items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" className="mr-1" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="12" width="4" height="8" />
              <rect x="10" y="8" width="4" height="12" />
              <rect x="17" y="4" width="4" height="16" />
            </svg>
            Stats
          </div>
        </button>
        <button 
          className="flex items-center bg-green-600 hover:bg-green-700 text-darkmode px-4 py-2 rounded-md"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} className="mr-1" />
          Add
        </button>
      </div>
    </div>
    
    {/* Main Content Area */}
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-darkmode">Loading employees...</p>
        </div>
      </div>
    ) : (
      <>
        {viewMode === 'list' ? (
          /* Employee List Table */
          <div className="bg-white dark:bg-darkmode-bg rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-darkmode-hover">
                <thead className="bg-lightmode-component dark:bg-darkmode-components">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-lightmode uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-lightmode uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-lightmode uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-lightmode uppercase tracking-wider">
                      Salary
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-lightmode uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-darkmode-bg divide-y divide-gray-200 dark:divide-darkmode-hover">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr key={employee._id} className="hover:bg-lightmode-hover dark:hover:bg-darkmode-hover">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-darkmode">
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-lightmode">
                          {employee.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-lightmode">
                          {employee.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-lightmode">
                          ₹{Number(employee.salary).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 mr-3"
                            onClick={() => {
                              setCurrentEmployee(employee);
                              setShowEditModal(true);
                            }}
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
                            onClick={() => handleDeleteEmployee(employee._id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-lightmode">
                        No employees found matching your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Statistics View - Simple version */
          <div className="bg-white dark:bg-darkmode-bg rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4 dark:text-darkmode">Department Distribution</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { dept: 'Kitchen', count: employees.filter(e => e.department === 'Kitchen').length, color: 'bg-blue-500' },
                { dept: 'Service', count: employees.filter(e => e.department === 'Service').length, color: 'bg-green-500' },
                { dept: 'Housekeeping', count: employees.filter(e => e.department === 'Housekeeping').length, color: 'bg-yellow-500' },
                { dept: 'Finance', count: employees.filter(e => e.department === 'Finance').length, color: 'bg-purple-500' }
              ].map((item) => (
                <div key={item.dept} className="bg-lightmode dark:bg-darkmode-components rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium dark:text-darkmode">{item.dept}</h3>
                    <span className={`${item.color} text-darkmode rounded-full px-2 py-1 text-xs`}>
                      {item.count} employees
                    </span>
                  </div>
                  <div className="w-full bg-lightmode-component dark:bg-darkmode-bg rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${item.color}`}
                      style={{ width: `${(item.count / employees.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    )}
    
    {/* Add Employee Modal */}
    {showAddModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-darkmode-components rounded-lg shadow-lg max-w-md w-full">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-darkmode">
            <h3 className="text-lg font-medium text-gray-900 dark:text-darkmode">Add New Employee</h3>
          </div>
          <form onSubmit={handleAddEmployee}>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Role</label>
                  <select 
                    name="role" 
                    value={newEmployee.role}
                    onChange={handleInputChange}
                    className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Manager">Manager</option>
                    <option value="Chef">Chef</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Cleaner">Cleaner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Department</label>
                  <select 
                    name="department" 
                    value={newEmployee.department}
                    onChange={handleInputChange}
                    className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Service">Service</option>
                    <option value="Finance">Finance</option>
                    <option value="Housekeeping">Housekeeping</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Join Date</label>
                  <input 
                    type="date" 
                    name="joinDate" 
                    value={newEmployee.joinDate}
                    onChange={handleInputChange}
                    className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Salary</label>
                  <input 
                    type="number" 
                    name="salary" 
                    value={newEmployee.salary}
                    onChange={handleInputChange}
                    className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Contact Number</label>
                <input 
                  type="tel" 
                  name="contact" 
                  value={newEmployee.contact}
                  onChange={handleInputChange}
                  className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-darkmode flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-lightmode-component text-gray-800 dark:bg-darkmode-bg dark:text-darkmode rounded-md hover:bg-lightmode-hover dark:hover:bg-darkmode-hover"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-darkmode rounded-md hover:bg-green-700"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    
    {/* Edit Employee Modal */}
    {showEditModal && currentEmployee && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-darkmode-components rounded-lg shadow-lg max-w-md w-full">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-darkmode">
            <h3 className="text-lg font-medium text-gray-900 dark:text-darkmode">Edit Employee</h3>
          </div>
          <form onSubmit={handleEditEmployee}>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={currentEmployee.name}
                  onChange={handleEditInputChange}
                  className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Role</label>
                  <select 
                    name="role" 
                    value={currentEmployee.role}
                    onChange={handleEditInputChange}
                    className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Manager">Manager</option>
                    <option value="Chef">Chef</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Cleaner">Cleaner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Department</label>
                  <select 
                    name="department" 
                    value={currentEmployee.department}
                    onChange={handleEditInputChange}
                    className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Service">Service</option>
                    <option value="Finance">Finance</option>
                    <option value="Housekeeping">Housekeeping</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Join Date</label>
                  <input 
                    type="date" 
                    name="joinDate" 
                    value={currentEmployee.joinDate}
                    onChange={handleEditInputChange}
                    className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Salary</label>
                  <input 
                    type="number" 
                    name="salary" 
                    value={currentEmployee.salary}
                    onChange={handleEditInputChange}
                    className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-lightmode mb-1">Contact Number</label>
                <input 
                  type="tel" 
                  name="contact" 
                  value={currentEmployee.contact}
                  onChange={handleEditInputChange}
                  className="w-full border border-lightmode dark:border-darkmode rounded-md py-2 px-3 bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode"
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-darkmode flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-lightmode-component text-gray-800 dark:bg-darkmode-bg dark:text-darkmode rounded-md hover:bg-lightmode-hover dark:hover:bg-darkmode-hover"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-darkmode rounded-md hover:bg-blue-700"
              >
                Update Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    
  </div>
</div>
  );
}

export default EmployeeMainComponent;