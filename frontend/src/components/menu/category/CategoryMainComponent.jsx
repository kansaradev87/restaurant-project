import React from 'react'
import AddCategoryButton from './buttons/AddCategoryButton'
import DeleteCategoryButton from './buttons/DeleteCategoryButton'
import UpdateCategoryButton from './buttons/UpdateCategoryButton'
import DisplayCategoryButton from './buttons/DisplayCategoryButton'
function CategoryMainComponent() {
  return (
    <div className="dark:border-0 flex ">
      <div className='md:h-[80vh] h-screen bg-lightmode  dark:bg-darkmode-components md:rounded-2xl rounded-none 
        dark:border-0 dark:text-darkmode shadow-2xl
        md:w-full sm:w-screen w-screen md:mb-5
      '>
        <div className='grid grid-cols-2 border'>
          
          <AddCategoryButton />
          <DeleteCategoryButton />
          <UpdateCategoryButton />
          <DisplayCategoryButton />
        </div>
      </div>
    </div>
  )
}

export default CategoryMainComponent
