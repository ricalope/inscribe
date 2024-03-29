import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteNoteModal from '../DeleteNote/DeleteNoteModal';
import { DarkModeContext } from '../../context/ThemeContext';
import { editNoteThunk, getAllNotesThunk } from '../../store/note';
import { getOneNotebookThunk } from '../../store/notebook';


function EditNote({ noteId, title, body, setTitle, setBody }) {
    const dispatch = useDispatch();

    const [ showDelNote, setShowDelNote ] = useState(false);
    const { darkMode } = useContext(DarkModeContext);
    const { notebookId } = useParams();

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!notebookId) {
            const formData = {
                noteId,
                title,
                body
            }
            await dispatch(editNoteThunk(formData))
            await dispatch(getAllNotesThunk())
            return
        } else {
            const formData = {
                notebookId,
                noteId,
                title,
                body
            }
            await dispatch(editNoteThunk(formData))
            await dispatch(getOneNotebookThunk(notebookId))
            return
        }
    }

    return (
        <>
            <form onSubmit={onSubmit} id="form-data">
                <div className={darkMode ? 'edit-main-container dark' : 'edit-main-container light'}>
                    <div className="edit-title-div">
                        <input
                            type="text"
                            name="title"
                            className={darkMode ? 'edit-title dark' : 'edit-title light'}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='edit-body-div'>
                        <textarea
                            style={{ resize: "none" }}
                            type="text"
                            name="body"
                            className={darkMode ? 'edit-body dark' : 'edit-body light'}
                            placeholder="Penny for your thoughts?..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <div className="edit-btns-div">
                        <div className="edit-del-btn">
                            <button type="button" id="del-btn" onClick={() => setShowDelNote(true)}>
                                Delete
                            </button>
                            {showDelNote && (
                                <DeleteNoteModal
                                    showDelNote={showDelNote}
                                    setShowDelNote={setShowDelNote}
                                    noteId={noteId}
                                />
                            )}
                        </div>
                        <div className="edit-button-div">
                            <button type="submit" id="edit-btn">
                                Save Note
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditNote;
