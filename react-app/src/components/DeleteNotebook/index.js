import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteNotebookThunk, getAllNotebooksThunk } from '../../store/notebook';
import { DarkModeContext } from '../../context/ThemeContext';


function DeleteNotebook({ setShowDelete, notebookId }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const { darkMode } = useContext(DarkModeContext);

    console.log('deleteNotebook',notebookId)

    const onSubmit = async () => {
        await dispatch(deleteNotebookThunk(notebookId))
        await dispatch(getAllNotebooksThunk())
        history.push('/notebooks')
        // setShowDelete(false)
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
