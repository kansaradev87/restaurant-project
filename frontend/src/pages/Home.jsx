import React from 'react'
import NavBar from '../components/common/NavBar'
import SidePanel from '../components/common/SidePanel'
import Hero from '../components/common/Hero'
import HomeMainComponent from '../components/home/HomeMainComponent'

function Home() {
  return (
    <div>
        <aside className=' pl-0 lg:pl-4 w-screen md:w-full md:justify-center sm:w-screen sm:justify-center sm:pl-0 sm:pt-0'>
                    <HomeMainComponent />
                </aside>
            </div>
        
  )
}

export default Home
