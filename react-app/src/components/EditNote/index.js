import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editNoteThunk } from '../../store/note';


function EditNote() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { noteId } = useParams();

    const [ title, setTitle ] = useState('')
    const [ body, setBody ] = useState('')

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/notes/${noteId}`)
            const data = await res.json()
            setTitle(data.title)
            setBody(data.body)
        })()
    }, [noteId])

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            noteId,
            title,
            body
        }
        await dispatch(editNoteThunk(formData))
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
