import React, { useState } from 'react';
import AddItemButton from './buttons/AddItemButton';
import DeleteItemButton from './buttons/DeleteItemButton';
import UpdateItemButton from './buttons/UpdateItemButton';
import DisplayItemButton from './buttons/DisplayItemButton';
import AddItemForm from './forms/AddItemForm';
import DeleteItemForm from './forms/DeleteItemForm';
import UpdateItemForm from './forms/UpdateItemForm';
import DisplayItem from './forms/DisplayItem';

function ItemMainComponent() {
  // State to track which form is currently active
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="dark:border-0 flex overflow-x-hidden">
      <title>Item</title>
      <div className="md:h-[80vh] h-screen bg-lightmode dark:bg-darkmode-components md:rounded-2xl rounded-none 
        dark:border-0 dark:text-darkmode shadow-lg 
        md:w-full sm:w-screen w-screen md:mb-5
        overflow-y-auto
      ">
        {/* Render the active form based on the state */}
        {activeForm === 'add' && <AddItemForm setDisplay={() => setActiveForm(null)} />}
        {activeForm === 'delete' && <DeleteItemForm setDisplay={() => setActiveForm(null)} />}
        {activeForm === 'update' && <UpdateItemForm setDisplay={() => setActiveForm(null)} />}
        {activeForm === 'display' && <DisplayItem setDisplay={() => setActiveForm(null)} />}

        {/* When no form is active, show the buttons */}
        {!activeForm && (
          <div className="grid lg:grid-cols-2 mt-2">
            <div onClick={() => setActiveForm('add')}>
              <AddItemButton isStandalone={false} />
            </div>
            <div onClick={() => setActiveForm('delete')}>
              <DeleteItemButton isStandalone={false} />
            </div>
            <div onClick={() => setActiveForm('update')}>
              <UpdateItemButton isStandalone={false} />
            </div>
            <div onClick={() => setActiveForm('display')}>
              <DisplayItemButton isStandalone={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemMainComponent;
