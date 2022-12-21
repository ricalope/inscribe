import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editNoteThunk, getOneNoteThunk } from '../../store/note';


function EditNote() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { noteId } = useParams();

    const noteObj = useSelector(state => state.notes.oneNote)
    const note = Object.values(noteObj)

    const [ title, setTitle ] = useState(note[0]?.title || 'loading...')
    const [ body, setBody ] = useState(note[0]?.body || 'loading...')

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getOneNoteThunk(noteId))
    //         setTitle(note[0]?.title)
    //         setBody(note[0]?.body)
    //     })()
    // }, [ dispatch, note, noteId ])

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            noteId,
            title,
            body
        }
        const edited_note = await dispatch(editNoteThunk(formData))
        console.log(edited_note)
        history.push(`/notes/${noteId}`)
    }

    return (
        <div className="edit-main-container">
            <form onSubmit={onSubmit}>
                <div className="edit-title-div">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='edit-body-div'>
                    <label>Note</label>
                    <textarea
                        rows={10}
                        style={{resize: "none"}}
                        type="text"
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className="edit-button-div">
                    <button type="submit">
                        save note
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditNote;
