import React from 'react'

import NavBar from '../components/common/NavBar'
import SidePanel from '../components/common/SidePanel'
import Hero from '../components/common/Hero'
import MenuMainComponent from '../components/menu/MenuMainComponent'
function Menu() {
  return (
    <div>

                <aside className=' pl-0 lg:pl-4 w-screen md:w-full md:justify-center sm:w-screen sm:justify-center sm:pl-0 sm:pt-0'>
                    <MenuMainComponent />
                    
                </aside>
            </div>
  )
}

export default Menu
