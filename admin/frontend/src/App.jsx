import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Table from './pages/Table'
import Menu from './pages/Menu'
import Revenue from './pages/Revenue'
import Employee from './pages/Employee'
import Layout from './pages/Layout'
import DisplayMenu from './pages/DisplayMenu'
import Category from './components/menu/category/Category'
import Item from './components/menu/item/Item'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='table' element={<Table />} />
            <Route path='menu' element={<Menu />} />
            <Route path='category' element={<Category />}/>
            <Route path='item' element={<Item />}/>
            <Route path='revenue' element={<Revenue />} />
            <Route path='employee' element={<Employee />} />
            <Route path='displaymenu' element={<DisplayMenu/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App