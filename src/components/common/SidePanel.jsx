import React from 'react'
import { NavLink } from 'react-router-dom'

function SidePanel() {
  return (
    <div className="dark:border-0 flex ">
      <div className='h-3/4 bg-lightmode  dark:bg-darkmode-components md:rounded-2xl rounded-none 
        w-full dark:border-0 dark:text-darkmode shadow-2xl
        hidden lg:block
      '>
        <ul className=''>
          <li className=' h-16 py-5 px-2  mb-2 rounded-xl duration-200 hover:dark:bg-darkmode-bg hover:bg-lightmode-component'><NavLink to="/" className={({isActive})=> {isActive ? "": ""}  }>Home</NavLink></li>
          <li className=' h-16 py-5 px-2  mb-2 rounded-xl duration-200 hover:dark:bg-darkmode-bg hover:bg-lightmode-component'><NavLink to="/table">Table</NavLink></li>
          <li className=' h-16 py-5 px-2  mb-2 rounded-xl duration-200 hover:dark:bg-darkmode-bg hover:bg-lightmode-component'><NavLink to="/expense">Expense</NavLink></li>
          <li className=' h-16 py-5 px-2  mb-2 rounded-xl duration-200 hover:dark:bg-darkmode-bg hover:bg-lightmode-component'><NavLink to="/revenue">Revenue</NavLink></li>
          <li className=' h-16 py-5 px-2  mt-2 rounded-xl duration-200 hover:dark:bg-darkmode-bg hover:bg-lightmode-component'><NavLink to="/employee">Employee</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default SidePanel