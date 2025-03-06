import React, { useState } from 'react'
import Hamburger from 'hamburger-react'
import DarkModeToggle from './DarkModeToggle'
import MenuBar from './MenuBar'
    function MenuButton() {
    const [isOpen,setOpen]=useState(false)
    return (
        <div>
            <div className="relative flex items-center">
            {/* Hamburger Icon */}
                <div className="text-md">
                    <Hamburger toggled={isOpen} color="#b8b8b8" toggle={setOpen} />
                </div>
                {/* Dropdown Menu (Opens Below) */}
                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-lightmode dark:bg-darkmode shadow-lg rounded-lg">
                        <MenuBar />
                    </div>
                )}
            </div>
        </div>
    )
    }

export default MenuButton
