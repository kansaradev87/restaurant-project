import React from 'react'
import DarkModeToggle from '../../common/DarkModeToggle'

function ItemMainComponent() {
  return (
    <div className="dark:border-0 flex ">
      <div className='md:h-[80vh] h-screen bg-lightmode  dark:bg-darkmode-components md:rounded-2xl rounded-none 
        dark:border-0 dark:text-darkmode shadow-2xl
        md:w-full sm:w-screen w-screen md:mb-5
      '>
        ItemMainComponent
      </div>
    </div>
  )
}

export default ItemMainComponent
