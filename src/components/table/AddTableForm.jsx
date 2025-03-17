import React, { useState } from 'react'

function AddTableForm() {
    const [display,setDisplay]=useState();
  return (
    <div className='flex justify-center items-center mt-36'>
        <div className=' dark:bg-darkmode-hover w-2/3 bg-lightmode-hover rounded-xl'>
            <div className='flex justify-center font-bold text-3xl items-center pt-3'>
                add table
            </div>
            <div className='flex justify-center items-center'>
                <form action="submit" method="get" className='flex justify-center items-center  w-2/3'>
                    <input type="hidden" name="id" />
                    <div className='mt-5'>
                        <label htmlFor="name">name </label>
                        <br />
                        <input type="text" placeholder='enter table name' id='name' className='h-8 w-56  rounded-md dark:bg-darkmode-components border dark:hover:bg-darkmode-hover'/>
                        <br />
                        <div className="mt-5"></div>
                        <label htmlFor="capacity">table capacity </label>
                        <br />
                        <input type="number" placeholder='enter table capacity' id='capacity' className=' h-8 w-56 rounded-md dark:bg-darkmode-components border dark:hover:bg-darkmode-hover'/>
                        <br />
                        <div className="flex justify-center items-center my-5">
                            <button className=' border border-gray-500 dark:border-white rounded-md h-8 w-24 mr-8 duration-200 dark:hover:bg-darkmode-components hover:bg-lightmode-component'>Submit</button>
                            <button className=' border rounded-md h-8 w-24 border-red-600 hover:bg-red-600 hover:text-lightmode duration-200' >cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddTableForm
