import React from 'react'
import DarkModeToggle from './DarkModeToggle'

function UserInfo() {
  return (
    <div className='border p-2 mt-3 rounded-2xl h- bg-lightmode  dark:bg-darkmode-components md:rounded-2xl  
        w-full dark:border-0 dark:text-darkmode shadow-2xl
        hidden lg:block'>
      <div className='flex items-center'>
        <br />
      </div>
      <div className="name mt-0">
            username
        </div>
        <div className="appearance flex items-center ">
            <div className=''>
                Appearance
            </div>
            <div className=' mt-1'>
                <DarkModeToggle />
            </div>
        </div>

    </div>
  )
}

export default UserInfo
