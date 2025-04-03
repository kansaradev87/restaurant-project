import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext.jsx'; // Import AuthContext
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      login(response.data.token); // Use login function from AuthContext
      toast.success('Login successful!');
      navigate('/home');
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('Another user is already logged in');
      } else {
        toast.error(error.response?.data?.message || 'Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='dark:bg-darkmode-hover bg-lightmode-hover w-80 p-6 rounded-lg shadow-lg'>
        <h2 className='text-center text-2xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleLogin} className='flex flex-col'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='h-10 rounded-md border dark:bg-darkmode-components dark:hover:bg-darkmode-hover mb-3 p-2'
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='h-10 rounded-md border dark:bg-darkmode-components dark:hover:bg-darkmode-hover mb-4 p-2'
          />
          <button
            type='submit'
            disabled={loading}
            className='h-10 bg-darkmode-components text-white rounded-md hover:bg-darkmode-hover disabled:bg-gray-500'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
