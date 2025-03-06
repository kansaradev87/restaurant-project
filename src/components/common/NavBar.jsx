import React from 'react'
import DarkModeToggle from './DarkModeToggle'

function NavBar() {
  return (
    <div className=' flex justify-center dark:bg-darkmode-bg 
    md:my-9
    '>
        {/* items center-centers vertically */}
        <div className='h-14 w-full  flex items-center justify-center  text-2xl
        bg-lightmode dark:bg-darkmode-components dark:text-darkmode
        md:flex md:justify-center md:items-center md:w-5/6 md:text-3xl md:rounded-xl
        '> 
            navbar
        </div>
    </div>
  )
}

export default NavBar
