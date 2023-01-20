import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskThunk } from '../../store/task';
// import { DarkModeContext } from '../../context/ThemeContext';


function AddTask({ setShowNew }) {

    const dispatch = useDispatch();

    const [ body, setBody ] = useState('');
    const [ taskDate, setTaskDate ] = useState('');

    // const { darkMode } = useContext(DarkModeContext);

    const formattedDate = date => {
        const removeT = date.replace('T', ' ')
        const removeZ = removeT.replace('.000Z', '')
        return removeZ
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        let formatDate = new Date(taskDate).toJSON()
        const formData = {
            body,
            taskDate: formattedDate(formatDate)
        }
        const data = await dispatch(addTaskThunk(formData))
        if (data) {
            return data.errors
        }
        setShowNew(false);
    }

    return (
        <div className="add-task-main-container">
            <form onSubmit={onSubmit}>
                <div className="add-task-header">
                    <h3>Add a Task</h3>
                </div>
                <div className="t-new-body">
                    <input
                        type="text"
                        className="t-add"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className="t-new-date">
                    <input
                        type="datetime-local"
                        className="t-date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                    />
                </div>
                <div className="t-new-buttons">
                    <button className="t-new-cancel" onClick={() => setShowNew(false)}>
                        Cancel
                    </button>
                    <button
                        className="t-new-submit"
                        type="submit"
                        disabled={body.trim().length > 0 ? false : true}>
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTask;
