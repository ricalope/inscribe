import React, { createContext, useState } from 'react';

export const NoteContext = createContext();

export function NoteProvider({ children }) {

    const [ noteId, setNoteId ] = useState(0);

    const toggleId = id => {
        setNoteId(id)
    }

    return (
        <>
            <NoteContext.Provider value={{ noteId, toggleId }}>
                {children}
            </NoteContext.Provider>
        </>
    )
}
