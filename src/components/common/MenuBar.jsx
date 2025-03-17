import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'
function MenuBar({onLinkClick}) {
  const [isOpen,setOpen]=useState(false)
  return (
    <div className=''>
      {/* this is menubar added hover and isactive for small screens with necessary links in with used for routing */}
      <ul className='bg-lightmode w-60 p-2 sm:w-72 sm:p-4 rounded-md
      dark:bg-darkmode-components
      '>
        <NavLink to='/' onClick={onLinkClick} className={({isActive}) => 
              `block rounded-md p-3 text-lg  duration-200 
              ${isActive ? 
                'bg-lightmode-active text-lightmode-active-text dark:bg-darkmode-active dark:text-darkmode-active-text' : 
                'hover:bg-lightmode-hover hover:text-lightmode-hover-text dark:hover:bg-darkmode-hover dark:hover:text-darkmode-hover-text'
              }`
            }>
              <li >Home</li>
        </NavLink>
        <NavLink to='/table' onClick={onLinkClick} className={({isActive}) => 
              `block rounded-md p-3 text-lg  duration-200 
              ${isActive ? 
                'bg-lightmode-active text-lightmode-active-text dark:bg-darkmode-active dark:text-darkmode-active-text' : 
                'hover:bg-lightmode-hover hover:text-lightmode-hover-text dark:hover:bg-darkmode-hover dark:hover:text-darkmode-hover-text'
              }`
            }>
              <li>Table</li>
        </NavLink>
        <NavLink to='/expense' onClick={onLinkClick} className={({isActive}) => 
              `block rounded-md p-3 text-lg  duration-200 
              ${isActive ? 
                'bg-lightmode-active text-lightmode-active-text dark:bg-darkmode-active dark:text-darkmode-active-text' : 
                'hover:bg-lightmode-hover hover:text-lightmode-hover-text dark:hover:bg-darkmode-hover dark:hover:text-darkmode-hover-text'
              }`
            }>
              <li>Expense</li>
        </NavLink>
        <NavLink to='/revenue' onClick={onLinkClick} className={({isActive}) => 
              `block rounded-md p-3 text-lg  duration-200 
              ${isActive ? 
                'bg-lightmode-active text-lightmode-active-text dark:bg-darkmode-active dark:text-darkmode-active-text' : 
                'hover:bg-lightmode-hover hover:text-lightmode-hover-text dark:hover:bg-darkmode-hover dark:hover:text-darkmode-hover-text'
              }`
            }>
              <li>Revenue</li>
        </NavLink>
        <NavLink to='/employee' onClick={onLinkClick} className={({isActive}) => 
              `block rounded-md p-3 text-lg  duration-200 
              ${isActive ? 
                'bg-lightmode-active text-lightmode-active-text dark:bg-darkmode-active dark:text-darkmode-active-text' : 
                'hover:bg-lightmode-hover hover:text-lightmode-hover-text dark:hover:bg-darkmode-hover dark:hover:text-darkmode-hover-text'
              }`
            }>
              <li>Employee</li>
          </NavLink>
          <div className='flex  rounded-md p-3 text-lg  duration-200'>
            Dark Mode
            <DarkModeToggle />
          </div>
      </ul>
    </div>
  )
}

export default MenuBar
