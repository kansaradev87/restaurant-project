import { useState } from 'react'
import './App.css'
import NavBar from './components/common/NavBar'
import MenuBar from './components/common/MenuBar'
import DarkModeToggle from './components/common/DarkModeToggle'
import SidePanel from './components/common/SidePanel'
import Hero from './components/common/Hero'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Table from './pages/Table'
import Expense from './pages/Expense'
import Revenue from './pages/Revenue'
import Employee from './pages/Employee'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/table' element={<Table />}  />
          <Route path='/expense' element={<Expense />}  />
          <Route path='/revenue' element={<Revenue />}  />
          <Route path='/employee' element={<Employee />}  />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App