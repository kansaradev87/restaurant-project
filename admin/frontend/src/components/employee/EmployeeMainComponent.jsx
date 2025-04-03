import React from 'react'
import DarkModeToggle from '../common/DarkModeToggle'

function EmployeeMainComponent() {
  return (
    <div className="dark:border-0 flex ">
      <div className='md:h-[80vh] h-screen bg-lightmode  dark:bg-darkmode-components md:rounded-2xl rounded-none 
        w-full dark:border-0 dark:text-darkmode shadow-2xl
        md:w-full sm:w-full md:mb-5
      '>
        EmployeeMainComponent
      </div>
    </div>
  )
}

export default EmployeeMainComponent
