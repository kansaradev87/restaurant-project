import React, { useState, useEffect } from 'react';
import { IoMdEye } from "react-icons/io";
import DisplayCategory from '../forms/DisplayCategory';

function DisplayCategoryButton() {
  const [display, setDisplay] = useState(false);

  const showCategories = () => {
    setDisplay(true);  // Show the list of tables
  };

  return (
    <div>
      {!display && (
        <div className='flex justify-center items-center md:justify-start md:items-start'>
          <button
            className='border border-black dark:border-darkmode w-full h-48 mr-2 ml-2 mb-2 mt-2 rounded-lg md:w-full md:h-64 md:ml-2 md:mr-2 flex justify-center items-center hover:bg-lightmode-hover dark:hover:bg-darkmode-hover transition-all duration-300 ease-in-out'
            onClick={showCategories}
          >
            <IoMdEye className='text-2xl' />
            Display Categories
          </button>
        </div>
      )}
      {display && <DisplayCategory setDisplay={setDisplay} />}
    </div>
  );
}

export default DisplayCategoryButton;
