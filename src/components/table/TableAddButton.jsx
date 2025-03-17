import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import AddTableForm from './AddTableForm';

function TableAddButton() {
    const [display, setDisplay] = useState(false);  // Control the visibility of AddTableForm

    // Function to toggle the display state when the button is clicked
    const addTable = () => {
        setDisplay(true);  // Show the AddTableForm
    }

    return (
        <div>
        {/* Conditionally render the button only when display is false */}
                {!display && (
                    <div className='
                    flex justify-center items-center
                    md:justify-start md:items-start'>
                    <button
                    className='
                    border 
                    w-48 h-36 
                    md:w-52 md:h-32 
                    rounded-lg  
                    mt-4 ml-0 md:ml-8
                    flex justify-center items-center 
                    hover:bg-lightmode-hover dark:hover:bg-darkmode-hover
                    transition-all duration-300 ease-in-out
                    ' 
                    onClick={addTable}
                >
                    <IoMdAdd className='text-2xl' /> {/* Add icon styling */}
                </button>
                </div>
                )}
        {/* Conditionally render the AddTableForm when display is true */}
            {display && <AddTableForm setDisplay={setDisplay} />}
        </div>
    );
}

export default TableAddButton;
