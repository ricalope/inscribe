import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotesThunk } from '../../store/note';

function Notes() {

    const dispatch = useDispatch();
    const notesObj = useSelector(state => state.notes.allNotes)
    const notes = Object.values(notesObj)

    useEffect(() => {
        dispatch(getAllNotesThunk())
    }, [])

    return (
        <div className="notes-main-container">
            <h1>Hello from notes</h1>
            <div className="notes-inner-container">
                {notes.map((note, idx) => (
                    <div className="notes-card">
                        <div key={idx} className="notes-title">
                            {note.title}
                        </div>
                        <div className="notes-content">
                            {note.body}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}


export default Notes;
