import React from 'react'
import DarkModeToggle from './DarkModeToggle'

function Hero() {
  return (
    <div className="dark:border-0 flex ">
      <div className='h-[82vh] bg-lightmode  dark:bg-darkmode-components md:rounded-2xl rounded-none 
        w-full dark:border-0 dark:text-darkmode shadow-2xl
        md:w-full sm:w-full
      '>
        hero
        <DarkModeToggle/>
      </div>
    </div>
  )
}

export default Hero
