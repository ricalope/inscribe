import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotebookThunk } from '../../store/notebook';
import './AddNotebook.css';


function AddNotebook({ setShowNew }) {
    const dispatch = useDispatch();

    const [ title, setTitle ] = useState('');

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
                        <h3 id="add-h3">Create new notebook</h3>
                    </div>
                    <div className="add-nb-explainer">
                        <p>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</p>
                    </div>
                    <div className="label-input">
                        <div className="add-nb-label">
                            <label>Name</label>
                        </div>
                        <div className="add-nb-input">
                            <input
                                type="text"
                                name="title"
                                id="input-add"
                                placeholder="New Notebook"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="nb-btnsbox">
                        <div className="cancel-nb">
                            <button
                                className="nb-btn one"
                                onClick={() => setShowNew(false)}
                                >
                                Cancel
                            </button>
                        </div>
                        <div className="add-nb-button">
                            <button
                                className="nb-btn two"
                                type="submit"
                                >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddNotebook;
