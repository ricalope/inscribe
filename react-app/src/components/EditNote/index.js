import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteNoteModal from '../DeleteNote/DeleteNoteModal';
import { editNoteThunk, getAllNotesThunk } from '../../store/note';


function EditNote({ noteId, title, body, setTitle, setBody }) {
    const dispatch = useDispatch();

    const [ showDelNote, setShowDelNote ] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            noteId,
            title,
            body
        }
        await dispatch(editNoteThunk(formData))
        await dispatch(getAllNotesThunk())
    }

    return (
        <>
            <form onSubmit={onSubmit} id="form-data">
                <div className="edit-main-container">
                    <div className="edit-title-div">
                        <input
                            type="text"
                            name="title"
                            id="edit-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='edit-body-div'>
                        <textarea
                            rows={32}
                            style={{ resize: "none" }}
                            type="text"
                            name="body"
                            id="edit-body"
                            placeholder="Penny for your thoughts?..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <div className="edit-btns-div">
                        <div className="edit-del-btn">
                            <button id="del-btn" onClick={() => setShowDelNote(true)}>
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
