import React from 'react'
import DarkModeToggle from './DarkModeToggle'
import MenuBar from './MenuBar'
import MenuButton from './MenuButton'

function NavBar() {
  return (
    <div className='flex justify-center dark:bg-darkmode-bg dark:border-0
    md:mt-9
    '>
        {/* items center-centers vertically */}
        
        <div className="relative h-14 w-full flex items-center text-2xl shadow-2xl
            bg-lightmode dark:bg-darkmode-components dark:text-darkmode dark:border-0
            md:w-5/6 md:text-3xl md:rounded-xl px-4">
            <div className="text-sm visible lg:hidden dark:border-0">
                <MenuButton />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 dark:border-0">
                Navbar
            </div>
        </div>
    </div>
  )
}

export default NavBar