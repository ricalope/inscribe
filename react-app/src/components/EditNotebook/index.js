import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateNotebookThunk } from '../../store/notebook';


function EditNotebook() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { notebookId } = useParams();

    const notebookObj = useSelector(state => state.notebooks.oneNotebook);
    const notebook = Object.values(notebookObj)

    const [title, setTitle] = useState(notebook[0]?.title || 'loading...')

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            notebookId,
            title
        }
        await dispatch(updateNotebookThunk(formData))
        history.push(`/notebooks/${notebookId}`)
    }

    const onCancel = () => {
        history.push(`/notebooks/${notebookId}`)
    }

    return (
        <div className="edit-nb-main-container">
            <form onSubmit={onSubmit}>
                <div className="edit-nb-header">
                    <h2>Rename notebook</h2>
                </div>
                <div className="edit-nb-title-label">
                    <label>Name</label>
                </div>
                <div className="edit-nb-input">
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="edit-nb-button">
                    <button onClick={onCancel} className="edit-nb-cancel">Cancel</button>
                </div>
                <div className="edit-nb-button">
                    <button className="edit-nb-submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default EditNotebook
