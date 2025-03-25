import React, { useState } from 'react'
import TableAddButton from './buttons/TableAddButton'
import TableDeleteButton from './buttons/TableDeleteButton'
import TableUpdateButton from './buttons/TableUpdateButton'
import TableDisplayButton from './buttons/TableDisplayButton'
import AddTableForm from './forms/AddTableForm'
import DeleteTableForm from './forms/DeleteTableForm'
import UpdateTableForm from './forms/UpdateTableForm'
import DisplayTable from './forms/DisplayTable'

function TableMainComponent() {
  // main state to track which form is currently active
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="dark:border-0 flex overflow-x-hidden">
      <div className='
        md:h-[80vh] h-screen bg-lightmode dark:bg-darkmode-components md:rounded-2xl rounded-none 
        dark:border-0 dark:text-darkmode shadow-lg 
        md:w-full sm:w-screen w-screen md:mb-5
        overflow-y-auto
      '>
        {activeForm === 'add' && <AddTableForm setDisplay={() => setActiveForm(null)} />}
        {activeForm === 'delete' && <DeleteTableForm setDisplay={() => setActiveForm(null)} />} 
        {activeForm === 'update' && <UpdateTableForm setDisplay={() => setActiveForm(null)} />}
        {activeForm === 'display' && <DisplayTable setDisplay={() => setActiveForm(null)} />} 

        {/*displays buttons when forms are inactive when clicked buttons are invisible and displays form based on button clicked * */}
        {!activeForm && (
          <div className="grid lg:grid-cols-2 mt-2">
            <div onClick={() => setActiveForm('add')}>
              <TableAddButton isStandalone={false} />
            </div>
            <div onClick={() => setActiveForm('delete')}>
              <TableDeleteButton isStandalone={false} />
            </div>
            <div onClick={() => setActiveForm('update')}>
              <TableUpdateButton isStandalone={false} />
            </div>
            <div onClick={() => setActiveForm('display')}>
              <TableDisplayButton isStandalone={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TableMainComponent