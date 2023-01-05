import React, { createContext, useState } from 'react';

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {

    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') || false);
    const toggleMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <>
            <DarkModeContext.Provider value={{ darkMode, toggleMode }}>
                {children}
            </DarkModeContext.Provider>
        </>
    )
}
