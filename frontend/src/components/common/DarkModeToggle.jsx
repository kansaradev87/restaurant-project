import { Switch } from '@mui/material';
import React, { useState, useEffect } from 'react';

function DarkModeToggle() {
    // Check if dark mode preference exists in local storage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';

    // Initialize state with stored value or false if not found
    const [darkMode, setDarkMode] = useState(savedDarkMode);

    // Toggle function that actually changes the state
    const changeMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        // Store the current mode preference in local storage
        localStorage.setItem('darkMode', JSON.stringify(newMode));
    };

    // Effect to apply dark mode class to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className=''>
            <Switch
                checked={darkMode}
                onChange={changeMode}
            />
        </div>
    );
}

export default DarkModeToggle;
