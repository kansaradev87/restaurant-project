import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LogOut() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.post('http://localhost:5000/api/auth/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        logout();
        navigate('/'); // Redirect to login page
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  return (
    <button
      onClick={handleLogout}
      className='border p-2.5 mt-3 rounded-2xl bg-lightmode dark:bg-darkmode-components md:rounded-2xl 
        border-red-600 w-full dark:border dark:text-darkmode shadow-2xl hidden lg:block 
        justify-center hover:bg-red-600 duration-200 hover:text-darkmode 
        dark:hover:bg-red-600 hover:dark:text-lightmode'
    >
      Logout
    </button>
  );
}

export default LogOut;
