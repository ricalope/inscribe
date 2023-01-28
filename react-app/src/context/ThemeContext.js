import React, { createContext, useState } from 'react';

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {

    const localTheme = JSON.parse(localStorage.getItem('DARK_MODE'))
    const [ darkMode, setDarkMode ] = useState(localTheme);

    const toggleMode = () => {
        setDarkMode(darkMode ? false : true)
    }

    return (
        <>
            <DarkModeContext.Provider value={{ darkMode, toggleMode }}>
                {children}
            </DarkModeContext.Provider>
        </>
    )
}
