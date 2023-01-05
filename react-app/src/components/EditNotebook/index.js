import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DarkModeContext } from '../../context/ThemeContext';
import { updateNotebookThunk } from '../../store/notebook';


function EditNotebook({ setShowEdit }) {
    const dispatch = useDispatch();
    const { notebookId } = useParams();

    const [ title, setTitle ] = useState('');
    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/notebooks/${notebookId}`)
            const data = await res.json()
            setTitle(data.title)
        })()
    }, [ notebookId ])

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
        <form onSubmit={onSubmit}>
            <div className={darkMode ? 'edit-nb-main-container dark' : 'edit-nb-main-container light'}>
                <div className="edit-nb-header">
                    <h2>Rename notebook</h2>
                </div>
                <div className="label-input">
                    <div className="add-nb-label">
                        <label>Name</label>
                    </div>
                    <div className="edit-nb-input">
                        <input
                            type="text"
                            name="title"
                            id="cn-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className="edit-nb-button">
                    <button className="nb-btn two">
                        Continue
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditNotebook
