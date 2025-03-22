import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import AddTableForm from '../forms/AddTableForm';

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
                    border border-black dark:border-darkmode
                    w-full h-48 mr-2 ml-2 mb-2 mt-2
                    rounded-lg  
                    md:w-full md:h-64
                    md:ml-2 md:mr-2
                    flex justify-center items-center 
                    hover:bg-lightmode-hover dark:hover:bg-darkmode-hover
                    transition-all duration-300 ease-in-out
                    ' 
                    onClick={addTable}
                >
                    <IoMdAdd className='text-2xl' />
                    Add Table {/* Add icon styling */}
                </button>
                </div>
                )}
        {/* Conditionally render the AddTableForm when display is true */}
            {display && <AddTableForm setDisplay={setDisplay} />}
        </div>
    );
}

export default TableAddButton;
