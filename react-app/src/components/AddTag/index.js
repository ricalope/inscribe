import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addTagThunk } from '../../store/tag';
import { DarkModeContext } from '../../context/ThemeContext';


function AddTag({ setShowNew }) {

    const dispatch = useDispatch();
    const { darkMode } = useContext(DarkModeContext);

    const [ name, setName ] = useState('');
    const [ errors, setErrors ] = useState([]);
    const [ submitted, setSubmitted ] = useState(false);

    useEffect(() => {
        if (name.trim().length <= 0) {
            setErrors('Please enter a name for the tag. Name field cannot be empty.')
        }
        return () => setErrors([])
    }, [ name.length ])

    const onSubmit = async e => {
        e.preventDefault()
        setSubmitted(true)

        if (errors.length > 0) return;

        const formData = {
            name
        }
        await dispatch(addTagThunk(formData))
        setShowNew(false)
        return
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="add-tags-main-container">
                    <div className="add-tag-header">
                        <h3>Create new tag</h3>
                    </div>
                    <div className="add-tag-disclaimer">
                        {submitted && errors.length > 0 ? (
                            <p>{errors}</p>
                        ) : (
                            <p>Tags allow you to add keywords to your notes and tasks, making them easier to find and browse.</p>
                        )}
                    </div>
                    <div className="label-input">
                        <div className="add-nb-label">
                            <label>Name</label>
                        </div>
                        <div className="add-nb-input">
                            <input
                                type="text"
                                id="add-tag-input"
                                placeholder="Tag Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="nb-btnsbox">
                        <div className="cancel-nb">
                            <button
                                type="button"
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
        </>
    )
}

export default AddTag;
