import React, { useState } from 'react';
import { IoMdCreate } from "react-icons/io";
import UpdateItemForm from '../forms/UpdateItemForm';

function UpdateIemButton() {
const [display, setDisplay] = useState(false);

const updateCategory = () => {
    setDisplay(true);  // Show the updateCategoryForm
};

return (
    <div>
    {!display && (
        <div className='flex justify-center items-center md:justify-start md:items-start'>
        <button
            className='border border-black dark:border-darkmode w-full h-48 mr-2 ml-2 mb-2 mt-2 rounded-lg md:w-full md:h-64 md:ml-2 md:mr-2 flex justify-center items-center hover:bg-lightmode-hover dark:hover:bg-darkmode-hover transition-all duration-300 ease-in-out'
            onClick={updateCategory}
        >
            <IoMdCreate className='text-2xl' />
            Update Item
        </button>
        </div>
    )}
    {display && <UpdateItemForm setDisplay={setDisplay} />}
    </div>
);
}

export default UpdateIemButton;
