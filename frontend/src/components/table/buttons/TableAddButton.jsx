import React from 'react';
import { IoMdAdd } from "react-icons/io";

function TableAddButton({ isStandalone = true, onClick }) {
  // Only use internal state when component is used standalone
  // Otherwise, rely on the parent component to control visibility
  
  if (isStandalone) {
    // Original implementation for standalone use
    const [display, setDisplay] = useState(false);
    
    const addTable = () => {
      setDisplay(true);
    }

    return (
      <div>
        {!display && (
          <div className='flex justify-center items-center md:justify-start md:items-start'>
            <button
              className='border border-black dark:border-darkmode w-full h-48 mr-2 ml-2 mb-2 mt-2 rounded-lg md:w-full md:h-64 md:ml-2 md:mr-2 flex justify-center items-center hover:bg-lightmode-hover dark:hover:bg-darkmode-hover transition-all duration-300 ease-in-out'
              onClick={addTable}
            >
              <IoMdAdd className='text-2xl' />
              Add Table
            </button>
          </div>
        )}
        {display && <AddTableForm setDisplay={setDisplay} />}
      </div>
    );
  } else {
    // Simplified version to be controlled by parent
    return (
      <div className='flex justify-center items-center md:justify-start md:items-start'>
        <button
          className='border border-black dark:border-darkmode w-full h-48 mr-2 ml-2 mb-2 mt-2 rounded-lg md:w-full md:h-64 md:ml-2 md:mr-2 flex justify-center items-center hover:bg-lightmode-hover dark:hover:bg-darkmode-hover transition-all duration-300 ease-in-out'
          onClick={onClick}
        >
          <IoMdAdd className='text-2xl' />
          Add Table
        </button>
      </div>
    );
  }
}

export default TableAddButton;