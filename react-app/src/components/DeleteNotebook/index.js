import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteNotebookThunk } from '../../store/notebook';
import { DarkModeContext } from '../../context/ThemeContext';


function DeleteNotebook({ setShowDelete }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const { notebookId } = useParams();
    const { darkMode } = useContext(DarkModeContext);

    const onSubmit = async () => {
        await dispatch(deleteNotebookThunk(notebookId))
        history.push('/notebooks')
    }

    return (
        <div className="delete-note-main-container">
            <div className="delete-header">
                <h2>Delete notebook?</h2>
            </div>
            <div className="delete-body">
                <h5>Any notes in the notebook will be deleted as well. This cannot be undone.</h5>
            </div>
            <div className="delete-buttons">
                <button onClick={() => setShowDelete(false)} className={darkMode ? 'nb-btn one dark' : 'nb-btn one light'}>
                    Cancel
                </button>
                <button onClick={onSubmit} className="nb-btn two">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteNotebook;
