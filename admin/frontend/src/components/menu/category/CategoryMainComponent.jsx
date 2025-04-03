import React, { useState } from 'react';
import AddCategoryButton from './buttons/AddCategoryButton';
import DeleteCategoryButton from './buttons/DeleteCategoryButton';
import UpdateCategoryButton from './buttons/UpdateCategoryButton';
import DisplayCategoryButton from './buttons/DisplayCategoryButton';
import AddCategoryForm from './forms/AddCategoryForm';
import DeleteCategoryForm from './forms/DeleteCategoryForm';
import UpdateCategoryForm from './forms/UpdateCategoryForm';
import DisplayCategory from './forms/DisplayCategory';

function CategoryMainComponent() {
  // State to track which form is currently active
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="dark:border-0 flex overflow-x-hidden">
      <div className="md:h-[80vh] h-screen bg-lightmode dark:bg-darkmode-components md:rounded-2xl rounded-none 
        dark:border-0 dark:text-darkmode shadow-lg 
        md:w-full sm:w-screen w-screen md:mb-5
        overflow-y-auto
      ">
        {/* Render the active form based on the state */}
        {activeForm === 'add' && <AddCategoryForm setDisplay={() => setActiveForm(null)} />}
        {activeForm === 'delete' && <DeleteCategoryForm setDisplay={() => setActiveForm(null)} />}
        {activeForm === 'update' && <UpdateCategoryForm setDisplay={() => setActiveForm(null)} />}
        {activeForm === 'display' && <DisplayCategory setDisplay={() => setActiveForm(null)} />}

        {/* When no form is active, show the buttons */}
        {!activeForm && (
          <div className="grid lg:grid-cols-2 mt-2">
            <div onClick={() => setActiveForm('add')}>
              <AddCategoryButton isStandalone={false} />
            </div>
            <div onClick={() => setActiveForm('delete')}>
              <DeleteCategoryButton isStandalone={false} />
            </div>
            <div onClick={() => setActiveForm('update')}>
              <UpdateCategoryButton isStandalone={false} />
            </div>
            <div onClick={() => setActiveForm('display')}>
              <DisplayCategoryButton isStandalone={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryMainComponent;
