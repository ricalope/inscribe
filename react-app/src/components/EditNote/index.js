import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';
import { editNoteThunk, getAllNotesThunk } from '../../store/note';


function EditNote({ noteId, title, body, setTitle, setBody }) {
    const dispatch = useDispatch();
    // const history = useHistory();
    // const { noteId } = useParams();

    // const [ title, setTitle ] = useState('');
    // const [ body, setBody ] = useState('');

    // useEffect(() => {
    //     (async () => {
    //         // const res = await fetch(`/api/notes/${+noteId}`)
    //         // const data = await res.json()
    //         // setTitle(data.title)
    //         // setBody(data.body)
    //     })()
    // }, [dispatch])

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getAllNotesThunk())
    //     })();
    // }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            noteId,
            title,
            body
        }
        await dispatch(editNoteThunk(formData))
        await dispatch(getAllNotesThunk())
        // history.push(`/notes/${noteId}`)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
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
                            rows={10}
                            style={{ resize: "none" }}
                            type="text"
                            name="body"
                            id="edit-body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <div className="edit-button-div">
                        <button type="submit" id="edit-btn">
                            save note
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditNote;
