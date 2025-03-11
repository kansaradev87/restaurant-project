import React from 'react'

import NavBar from '../components/common/NavBar'
import SidePanel from '../components/common/SidePanel'
import Hero from '../components/common/Hero'
import { Outlet } from 'react-router-dom'
import UserInfo from '../components/common/UserInfo'

function Layout() {
  return (
    <div>
      <div className="main">
        <NavBar />
        <div className='flex justify-center pt-0 dark:bg-darkmode-bg sm:pt-0 md:pt-4'>
          <div className="w-full md:w-5/6 flex">
            <aside className='lg:w-1/4 lg:visible'>
                <SidePanel />
            </aside>
            <aside className='pl-0 w-full flex justify-center'>
                <div className="w-full">
                    <Outlet />
                </div>
            </aside>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Layout
