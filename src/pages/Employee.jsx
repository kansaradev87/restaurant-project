import React from 'react'

import NavBar from '../components/common/NavBar'
import SidePanel from '../components/common/SidePanel'
import EmployeeMainComponent from '../components/employee/EmployeeMainComponent'
function Employee() {
  return (
    <div>
      <div className="main">
           <NavBar />
            <div className='flex justify-center pt-0  dark:bg-darkmode-bg sm:pt-0 md:pt-4'>
                <aside className=' lg:w-1/6 lg:visible ' >
                    <SidePanel />
                </aside>
                <aside className=' pl-0 lg:pl-4 w-screen lg:w-4/6 md:w-5/6 md:justify-center sm:w-screen sm:justify-center sm:pl-0 sm:pt-0'>
                    <EmployeeMainComponent />
                    
                </aside>
            </div>
        </div>
    </div>
  )
}

export default Employee
