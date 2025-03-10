import React from 'react'
import DarkModeToggle from '../common/DarkModeToggle'

function ExpenseMainComponent() {
  return (
    <div className="dark:border-0 flex ">
      <div className='md:h-[82vh] h-screen bg-lightmode  dark:bg-darkmode-components md:rounded-2xl rounded-none 
        w-full dark:border-0 dark:text-darkmode shadow-2xl
        md:w-full sm:w-full
      '>
        ExpenseMainComponent
        <DarkModeToggle />
      </div>
    </div>
  )
}

export default ExpenseMainComponent
