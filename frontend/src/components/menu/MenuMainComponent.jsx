import React from 'react'
import DarkModeToggle from '../common/DarkModeToggle'
import { NavLink } from 'react-router-dom'

function MenuMainComponent() {
  return (
    <div className="dark:border-0 flex">
      <div className='md:h-[80vh] h-screen bg-lightmode dark:bg-darkmode-components md:rounded-2xl rounded-none 
        w-full dark:border-0 dark:text-darkmode shadow-2xl
        
        md:w-full sm:w-full md:mb-5
      '>
        <div className='lg:grid lg:grid-cols-2 h-[80vh] gap-4
        md:grid-cols-1'>
          <NavLink 
            to='/category' 
            className='border flex justify-center items-center 
            hover:bg-lightmode-hover dark:hover:bg-darkmode-hover 
            rounded-xl m-4 text-3xl font-semibold lg:mr-0
            h-[38vh] sm:h-[45vh] lg:h-[76vh]'
          >
            category
          </NavLink>
          <NavLink 
            to='/item' 
            className='border flex justify-center items-center 
            hover:bg-lightmode-hover dark:hover:bg-darkmode-hover 
            rounded-xl m-4 text-3xl font-semibold  lg:ml-0
            h-[38vh] sm:h-[45vh] lg:h-[76vh]'
          >
            item
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default MenuMainComponent
