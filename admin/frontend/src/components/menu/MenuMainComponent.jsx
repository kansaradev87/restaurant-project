import React from 'react'
import DarkModeToggle from '../common/DarkModeToggle'
import { NavLink } from 'react-router-dom'

function MenuMainComponent() {
  return (
    <div className="dark:border-0 flex w-full">
      <div className='md:h-[80vh] h-screen bg-lightmode dark:bg-darkmode-components md:rounded-2xl rounded-none 
        w-full dark:border-0 dark:text-darkmode shadow-2xl md:mb-5 overflow-hidden'>
        
        {/* Main container with different layouts based on screen size */}
        <div className='h-full w-full flex flex-col lg:grid lg:grid-cols-2 gap-1'>
          
          {/* Categories and Items section */}
          <div className='flex flex-col sm:flex-row lg:flex-col w-full  lg:h-auto'>
            <NavLink 
              to='/category' 
              className='border flex justify-center items-center 
              hover:bg-lightmode-hover dark:hover:bg-darkmode-hover 
              rounded-xl m-2 md:m-4 text-xl md:text-2xl lg:text-3xl font-semibold
              h-[30vh] sm:h-[25vh] md:h-[30vh] lg:h-[36vh] w-auto sm:w-1/2 lg:w-auto'
            >
              Category
            </NavLink>
            
            <NavLink 
              to='/item' 
              className='border flex justify-center items-center 
              hover:bg-lightmode-hover dark:hover:bg-darkmode-hover 
              rounded-xl m-2 md:m-4  text-xl md:text-2xl lg:text-3xl font-semibold
              h-[30vh] sm:h-[25vh] md:h-[30vh] lg:h-[36vh] w-auto sm:w-1/2 lg:w-auto'
            >
              Item
            </NavLink>
          </div>
          
          {/* Display Table section */}
          <div className='border rounded-xl m-2 md:m-4 
                hover:bg-lightmode-hover dark:hover:bg-darkmode-hover
                h-[30vh] sm:h-[35vh] md:h-[30vh] lg:h-auto w-auto'>
            <NavLink 
              to='/displaymenu'
              className='flex justify-center items-center w-full h-full text-xl md:text-2xl lg:text-3xl font-semibold'
            >
              Display menu
            </NavLink>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MenuMainComponent