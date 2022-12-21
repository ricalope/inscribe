import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotesThunk } from '../../store/note';

function Notes() {

    const dispatch = useDispatch();
    const notesObj = useSelector(state => state.notes.allNotes)
    const notes = Object.values(notesObj)

    useEffect(() => {
        (async () => {
            await dispatch(getAllNotesThunk())
        })()
    }, [dispatch])

    return (
        <div className="notes-main-container">
            <h1>Hello from notes</h1>
            <div className="notes-inner-container">
                {notes.map((note, idx) => (
                    <div key={idx} className="notes-card">
                        <div className="notes-title">
                            <Link exact="true" to={`/notes/${note.id}`}>
                                {note.title}
                            </Link>
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
