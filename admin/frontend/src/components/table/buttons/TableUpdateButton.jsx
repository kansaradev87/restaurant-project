import React, { useState } from 'react';
import { IoMdCreate } from "react-icons/io";

function TableUpdateButton() {
const [display, setDisplay] = useState(false);

const updateTable = () => {
    setDisplay(true);  // Show the UpdateTableForm
};

return (
    <div>
    {!display && (
        <div className='flex justify-center items-center md:justify-start md:items-start'>
        <button
            className='border border-black dark:border-darkmode w-full h-48 mr-2 ml-2 mb-2 mt-2 rounded-lg md:w-full md:h-64 md:ml-2 md:mr-2 flex justify-center items-center hover:bg-lightmode-hover dark:hover:bg-darkmode-hover transition-all duration-300 ease-in-out'
            onClick={updateTable}
        >
            <IoMdCreate className='text-2xl' />
            Update Table
        </button>
        </div>
    )}
    {display && <UpdateTableForm setDisplay={setDisplay} />}
    </div>
);
}

export default TableUpdateButton;
