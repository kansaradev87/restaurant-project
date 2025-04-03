import React from 'react'
import DarkModeToggle from '../common/DarkModeToggle'

function HomeMainComponent() {
  return (
    <div className="dark:border-0 flex ">
      <div className='md:h-[80vh] h-screen bg-lightmode  dark:bg-darkmode-components md:rounded-2xl rounded-none 
        dark:border-0 dark:text-darkmode shadow-2xl
        md:w-full sm:w-screen w-screen md:mb-5
      '>
        HomeMainComponent
      </div>
    </div>
  )
}

export default HomeMainComponent
