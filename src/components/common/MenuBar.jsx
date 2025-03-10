import React, { useState } from 'react'
import Hamburger from 'hamburger-react'
import DarkModeToggle from './DarkModeToggle'
function MenuBar() {
  const [isOpen,setOpen]=useState(false)
  return (
    <div>
      <ul className='bg-lightmode w-60 p-2 sm:w-72 sm:p-4 rounded-md
      dark:bg-darkmode-components
      '>
        <li className='hover:dark:bg-red-500 hover:rounded-md hover:bg-red-500 p-3'>kdk</li>
        <li className='hover:dark:bg-red-500 hover:rounded-md hover:bg-red-500 p-3'>jhj</li>
        <li className='hover:dark:bg-red-500 hover:rounded-md hover:bg-red-500 p-3'>lhu</li>
        <li className='hover:dark:bg-red-500 hover:rounded-md hover:bg-red-500 p-3'>iu</li>
        <li className='hover:dark:bg-red-500 hover:rounded-md hover:bg-red-500 p-3'>oi</li>
      </ul>
    </div>
  )
}

export default MenuBar
