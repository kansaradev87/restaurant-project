import React, { useState } from 'react'
import Hamburger from 'hamburger-react'
import MenuBar from './MenuBar'
    function MenuButton() {
    const [isOpen,setOpen]=useState(false)
    const closeMenu=()=>{
        setOpen(false)
    }
    return (
        <div>
            <div className="relative flex items-center">
            {/* Hamburger Icon */}
                <div className="text-md">
                    <Hamburger toggled={isOpen} color="#b8b8b8" toggle={setOpen} />
                </div>
                {/* Dropdown Menu (Opens Below) added onclick close  */}
                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-lightmode dark:bg-darkmode shadow-lg rounded-lg">
                        <MenuBar onLinkClick={closeMenu} />
                    </div>
                )}
            </div>
        </div>
    )
    }

export default MenuButton
