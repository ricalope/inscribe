import React, { createContext, useState, useReducer } from 'react';

export const DarkModeContext = createContext();

const initialState = { darkMode: false }

const darkModeReducer = (state, action) => {
    switch(action.type) {
        case 'LIGHTMODE':
            return { darkMode: false }
        case 'DARKMODE':
            return { darkMode: true }
        default:
            return state;
    }
}

export function DarkModeProvider({ children }) {

    const [state, dispatch] = useReducer(darkModeReducer, initialState)

    // const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') || false);
    // const toggleMode = () => {
    //     if (darkMode)
    // }

    return (
        <>
            <DarkModeContext.Provider value={{ state, dispatch }}>
                {children}
            </DarkModeContext.Provider>
        </>
    )
}
