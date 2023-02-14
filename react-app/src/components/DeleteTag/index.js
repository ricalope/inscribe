import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTagThunk } from '../../store/tag';
import { getAllNotesThunk } from '../../store/note';
import { DarkModeContext } from '../../context/ThemeContext';


function DeleteTag({ tagId, setShowDel }) {

    const { darkMode } = useContext(DarkModeContext);
    const dispatch = useDispatch();

    const onSubmit = async () => {
        await dispatch(deleteTagThunk(tagId))
        await dispatch(getAllNotesThunk())
        setShowDel(false)
    }

    return (
        <div className="delete-note-main-container">
            <div className="delete-header">
                <h2>Confirm Delete Tag?</h2>
            </div>
            <div className="delete-body">
                <h5>Please confirm you would like to permanently this tag</h5>
            </div>
            <div className="delete-buttons">
                <div>
                    <button
                        className={darkMode ? 'nb-btn one dark' : 'nb-btn one light'}
                        onClick={() => setShowDel(false)}
                    >
                        Cancel
                    </button>
                </div>
                <div>
                    <button className="nb-btn two" onClick={onSubmit}>Confirm Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTag;
