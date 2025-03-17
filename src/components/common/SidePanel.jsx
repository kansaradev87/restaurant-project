import React from 'react'
import { NavLink } from 'react-router-dom'
import UserInfo from './UserInfo'
import LogOut from './LogOut'

function SidePanel() {
  return (
    <div className="dark:border-0  ">
      {/*this is the side panel consisting links for lg screens hides in smaller screens along with hover and darkmode integration*/}
      <div className='h-3/4 bg-lightmode  dark:bg-darkmode-components md:rounded-2xl rounded-none 
        w-full dark:border-0 dark:text-darkmode shadow-2xl
        hidden lg:block
      '>
        <ul className="flex flex-col gap-2 p-4">
  {/* Each NavLink wraps the li for better touch targets */}
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `block rounded-xl duration-200 
              ${isActive ? 
                'bg-lightmode-active text-lightmode-active-text dark:bg-darkmode-active dark:text-darkmode-active-text' : 
                'hover:bg-lightmode-hover hover:text-lightmode-hover-text dark:hover:bg-darkmode-hover dark:hover:text-darkmode-hover-text'
              }`
            }
          >
            <li className="flex items-center h-16 px-4">
              <span className="text-lg font-medium">Home</span>
            </li>
          </NavLink>
          
          <NavLink 
            to="/table" 
            className={({isActive}) => 
              `block rounded-xl duration-200 
              ${isActive ? 
                'bg-lightmode-active text-lightmode-active-text dark:bg-darkmode-active dark:text-darkmode-active-text' : 
                'hover:bg-lightmode-hover hover:text-lightmode-hover-text dark:hover:bg-darkmode-hover dark:hover:text-darkmode-hover-text'
              }`
            }
          >
            <li className="flex items-center h-16 px-4">
              <span className="text-lg font-medium">Table</span>
            </li>
          </NavLink>
          
          <NavLink 
            to="/expense" 
            className={({isActive}) => 
              `block rounded-xl duration-200 
              ${isActive ? 
                'bg-lightmode-active text-lightmode-active-text dark:bg-darkmode-active dark:text-darkmode-active-text' : 
                'hover:bg-lightmode-hover hover:text-lightmode-hover-text dark:hover:bg-darkmode-hover dark:hover:text-darkmode-hover-text'
              }`
            }
          >
            <li className="flex items-center h-16 px-4">
              <span className="text-lg font-medium">Expense</span>
            </li>
          </NavLink>
          
          <NavLink 
            to="/revenue" 
            className={({isActive}) => 
              `block rounded-xl duration-200 
              ${isActive ? 
                'bg-lightmode-active text-lightmode-active-text dark:bg-darkmode-active dark:text-darkmode-active-text' : 
                'hover:bg-lightmode-hover hover:text-lightmode-hover-text dark:hover:bg-darkmode-hover dark:hover:text-darkmode-hover-text'
              }`
            }
          >
            <li className="flex items-center h-16 px-4">
              <span className="text-lg font-medium">Revenue</span>
            </li>
          </NavLink>
          
          <NavLink 
            to="/employee" 
            className={({isActive}) => 
              `block rounded-xl duration-200 
              ${isActive ? 
                'bg-lightmode-active text-lightmode-active-text dark:bg-darkmode-active dark:text-darkmode-active-text' : 
                'hover:bg-lightmode-hover hover:text-lightmode-hover-text dark:hover:bg-darkmode-hover dark:hover:text-darkmode-hover-text'
              }`
            }
          >
            <li className="flex items-center h-16 px-4">
              <span className="text-lg font-medium">Employee</span>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className='h-1/4'>
        <UserInfo />
        <LogOut />
      </div>
    </div>
  )
}

export default SidePanel