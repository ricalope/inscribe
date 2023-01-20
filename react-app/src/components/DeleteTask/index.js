import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { DarkModeContext } from '../../context/ThemeContext';
import { deleteTaskThunk, getAllTasksThunk } from '../../store/task';


function DeleteTask({ taskId, setShowDelete }) {

    const dispatch = useDispatch();
    const { darkMode } = useContext(DarkModeContext)

    const onDelete = async () => {
        await dispatch(deleteTaskThunk(taskId))
        await dispatch(getAllTasksThunk())
        setShowDelete(false)
    }

    return (
        <div className="del-task-container">
            <div className="del-task-header">
                <h2>Confirm Delete Note?</h2>
            </div>
            <div className="del-task-body">
                <h5>Please confirm you would like to delete this note.</h5>
            </div>
            <div className="delete-buttons">
                <div>
                    <button
                        className={darkMode ? "nb-btn one dark" : "nb-btn one light"}
                        onClick={() => setShowDelete(false)}
                    >
                        Cancel
                    </button>
                </div>
                <div>
                    <button onClick={onDelete} className="nb-btn two">
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTask;
