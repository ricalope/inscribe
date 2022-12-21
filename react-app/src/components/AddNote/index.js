import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNoteThunk } from '../../store/note';


function AddNote() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            body
        }
        await dispatch(addNoteThunk(payload))
        history.push('/notes')
    }

    return (
        <div className="add-main-container">
            <form onSubmit={onSubmit}>
                <div className="form-title">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-body">
                    <label>Notes</label>
                    <textarea
                        rows={10}
                        style={{resize:'none'}}
                        type="text"
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className="notes-button">
                    <button type="submit" className="nts-btn">
                        save note
                    </button>
                </div>
            </form>
        </div>
    )

}

export default AddNote;
