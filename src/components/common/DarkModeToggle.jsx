import { Switch } from '@mui/material'
import React, { useState, useEffect } from 'react'

function DarkModeToggle() {
    // Initializing with a initial value intially light mode
    const [darkMode, setDarkMode] = useState(false)
    
    // Toggle function that actually changes the state
    const changeMode = () => {
        setDarkMode(!darkMode) //toggles mode
    }

    // Effect to apply dark mode class to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark') //adds darkmode classes 
        } else {
            document.documentElement.classList.remove('dark') //removes darkmode class
        }
    }, [darkMode])
    
    return (
        <div className=' '>
            <Switch 
//switch imported from mui creates a toggle button 
                checked={darkMode} //if button checked enables darkmode
                onChange={changeMode} //toggles between mode onchange
            />
        </div>
    )
}

export default DarkModeToggle