import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOneNoteThunk } from '../../store/note';
import './OneNote.css'


function OneNote() {
    const dispatch = useDispatch();
    const { noteId } = useParams();

    const noteObj = useSelector(state => state.notes.oneNote)
    const note = Object.values(noteObj)

    useEffect(() => {
        (async () => {
            await dispatch(getOneNoteThunk(noteId))
        })()
    }, [ dispatch, noteId ])

    return (
        <div className="one-note-main-container">
            <div className="one-note-header">
                <h2>Hello from one note</h2>
            </div>
            <div className="one-note-detail">
                {note.map(n => (
                    <div key={n.id} className="one-note-card">
                        <div className="one-note-title">
                            {n.title}
                        </div>
                        <div className="one-note-body">
                            {n.body}
                        </div>
                        <div className="edit-one-note">
                            <Link exact="true" to={`/notes/${n.id}/edit`}>
                                Edit
                            </Link>
                        </div>
                        <div className="delete-one-note">
                            <Link exact="true" to={`/notes/${n.id}/delete`}>
                                Delete
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OneNote;
