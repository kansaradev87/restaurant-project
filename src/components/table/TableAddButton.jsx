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
                <button 
                className='border h-32 w-40 rounded-lg flex justify-center items-center mt-4 ml-5 hover:bg-lightmode-hover dark:hover:bg-darkmode-hover' 
                onClick={addTable}
                >
                <IoMdAdd />
                </button>
            )}
        {/* Conditionally render the AddTableForm when display is true */}
            {display && <AddTableForm setDisplay={setDisplay} />}
        </div>
    );
}

export default TableAddButton;
