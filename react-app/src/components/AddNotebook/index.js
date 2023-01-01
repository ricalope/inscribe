import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNotebookThunk } from '../../store/notebook';


function AddNotebook({ setShowNew }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            title
        }
        await dispatch(addNotebookThunk(formData))
        setShowNew(false)
    }

    return (
        <div className="add-nb-main-container">
            <form onSubmit={onSubmit}>
                <div className="add-nb-form-container">
                    <div className="add-nb-header">
                        <h3>Create new notebook</h3>
                    </div>
                    <div className="add-nb-explainer">
                        <p>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</p>
                    </div>
                    <div className="add-nb-label">
                        <label>Name</label>
                    </div>
                    <div className="add-nb-input">
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="add-nb-button">
                        <button type="submit">Create</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddNotebook;
