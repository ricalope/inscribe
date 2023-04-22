import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteNoteThunk, getAllNotesThunk } from '../../store/note';
import { getOneNotebookThunk } from '../../store/notebook';
import { DarkModeContext } from '../../context/ThemeContext';


function DeleteNote({ noteId, setShowDelNote }) {

    const dispatch = useDispatch();
    const { darkMode } = useContext(DarkModeContext);
    const { notebookId } = useParams();

    const onSubmit = async () => {
        if (!notebookId) {
            await dispatch(deleteNoteThunk(noteId))
            await dispatch(getAllNotesThunk())
            setShowDelNote(false)
            return
        } else {
            await dispatch(deleteNoteThunk(noteId))
            await dispatch(getOneNotebookThunk(notebookId))
            setShowDelNote(false)
            return
        }

    }

    return (
        <div className="delete-note-main-container">
            <div className="delete-header">
                <h2>Confirm Delete Note?</h2>
            </div>
            <div className="delete-body">
                <h5>Please confirm you would like to permanently this note</h5>
            </div>
            <div className="delete-buttons">
                <div>
                    <button
                        className={darkMode ? 'nb-btn one dark' : 'nb-btn one light'}
                        onClick={() => setShowDelNote(false)}
                    >
                        Cancel
                    </button>
                </div>
                <div>
                    <button className="nb-btn two" onClick={onSubmit}>Confirm Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteNote;
