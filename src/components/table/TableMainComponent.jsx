import React from 'react'
import TableAddButton from './buttons/TableAddButton'
import TableDeleteButton from './buttons/TableDeleteButton'
import TableUpdateButton from './buttons/TableUpdateButton'
import TableDisplayButton from './buttons/TableDisplayButton'

function TableMainComponent() {
  return (
    <div className="dark:border-0 flex overflow-x-hidden"> {/* Hide horizontal scroll */}
      <div className='
        md:h-[80vh] h-screen bg-lightmode dark:bg-darkmode-components md:rounded-2xl rounded-none 
        dark:border-0 dark:text-darkmode shadow-lg 
        md:w-full sm:w-screen w-screen md:mb-5
        overflow-y-auto  {/* Enable vertical scroll */}
      '>
        <div className="grid lg:grid-cols-2  mt-2 ">
        <TableAddButton/>
        <TableDeleteButton/>
        <TableUpdateButton/>
        <TableDisplayButton/>
        </div>

        
      </div>
    </div>
  )
}

export default TableMainComponent
