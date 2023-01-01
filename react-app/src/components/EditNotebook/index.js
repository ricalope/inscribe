import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateNotebookThunk } from '../../store/notebook';


function EditNotebook({ setShowEdit }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { notebookId } = useParams();

    const [title, setTitle] = useState('')

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/notebooks/${notebookId}`)
            const data = await res.json()
            setTitle(data.title)
        })()
    }, [notebookId])

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            notebookId,
            title
        }
        await dispatch(updateNotebookThunk(formData))
        setShowEdit(false)
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
                    <button className="edit-nb-submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default EditNotebook
