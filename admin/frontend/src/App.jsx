import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import Home from './pages/Home';
import Table from './pages/Table';
import Menu from './pages/Menu';
import Revenue from './pages/Revenue';
import Employee from './pages/Employee';
import Layout from './pages/Layout';
import DisplayMenu from './pages/DisplayMenu';
import Category from './components/menu/category/Category';
import Item from './components/menu/item/Item';
import Login from './pages/Login';
import Order from './pages/Order';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        
        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/table" element={<Table />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/category" element={<Category />} />
            <Route path="/item" element={<Item />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/displaymenu" element={<DisplayMenu />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        <Route path='/order/:tableId' element={<Order/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
