import React from 'react'
import DarkModeToggle from './DarkModeToggle'

function UserInfo() {
  return (
    <div className='border p-2 mt-3 rounded-2xl h- bg-lightmode  dark:bg-darkmode-components md:rounded-2xl  
        w-full dark:border-0 dark:text-darkmode shadow-2xl
        hidden lg:block'>
      userinfo
      <div className='flex items-center'>
        <div className="name">
            username
        </div>
        <br />
        <div className="photo ">
            <img src="https://placehold.co/50x50" alt="" className='rounded-full float-left ml-28'/>
        </div>
      </div>
      <div className="name mt-0">
            restaurant mail
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
