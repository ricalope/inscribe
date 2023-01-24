import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNotebookThunk } from '../../store/notebook';
import { DarkModeContext } from '../../context/ThemeContext';
import './AddNotebook.css';


function AddNotebook({ setShowNew }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [ title, setTitle ] = useState('');
    const [ error, setError ] = useState('');

    const { darkMode } = useContext(DarkModeContext);

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            title
        }
        await dispatch(addNotebookThunk(formData))
        setShowNew(false)
        history.push('/notebooks')
        return
    }

    useEffect(() => {
        if (title.trim().length === 0 && title) {
            setError('Please enter a title for your notebook, field cannot be empty.')
        }
        return () => setError('');
    }, [ title ])

    return (
        <div className="add-nb-main-container">
            <form onSubmit={onSubmit}>
                <div className={darkMode ? 'add-nb-form-container dark' : 'add-nb-form-container light'}>
                    <div className="add-nb-header">
                        <h3 id="add-h3">Create new notebook</h3>
                    </div>
                    <div className="add-nb-explainer">
                        {error.length > 0 ? (
                            <p id="add-ptag">*{error}</p>
                        ) : (
                            <p>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</p>
                        )}
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
                                className={darkMode ? 'nb-btn one dark' : 'nb-btn one light'}
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
