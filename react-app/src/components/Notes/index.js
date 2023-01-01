import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotesThunk } from '../../store/note';
import EditNote from '../EditNote';
import NavBar from '../Navigation/NavBar';
import './Notes.css'

function Notes() {

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ noteId, setNoteId ] = useState(0)

    const dispatch = useDispatch();
    const notesObj = useSelector(state => state.notes.allNotes)
    const notes = Object.values(notesObj)

    useEffect(() => {
        (async () => {
            await dispatch(getAllNotesThunk())
        })()
        if (notes.length > 0) {
            setTitle(notes[ 0 ].title)
            setBody(notes[ 0 ].body)
            setNoteId(notes[ 0 ].id)
        }
    }, [ dispatch, notes.length ])

    const setFields = data => {
        setNoteId(data.id)
        setTitle(data.title)
        setBody(data.body)
    }

    return (
        <>
            <NavBar />
            <div className="outer-notes">
                <div className="notes-main-container">
                    <div id="header-note">
                        <div className="n-header">
                            <div id="n-logo">
                                <i className="fa-solid fa-file-lines" />
                                <h1 id="n-h1">NOTES</h1>
                            </div>
                        </div>
                        <div id="n-count">
                            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                        </div>
                    </div>
                    <div className="notes-inner-container">
                        <div className="column-notes">
                            {notes.map((note, idx) => (
                                <div key={idx}
                                    className="notes-card"
                                    onClick={() => setFields(note)}
                                >
                                    <div className="notes-title">
                                        {note.title}
                                    </div>
                                    <div className="notes-content">
                                        {note.body}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div >
                <div className="edit-column-notes">
                    <EditNote
                        noteId={noteId}
                        title={title}
                        body={body}
                        setTitle={setTitle}
                        setBody={setBody}
                    />
                </div>
            </div>
        </>
    )

}


export default Notes;
